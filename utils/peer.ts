import { Socket } from "socket.io-client";

const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:5349",
                "stun:stun1.l.google.com:5349",
            ],
        },
    ],
};

let peerConnection = null;

export const getPeerConnection = async (
    localVideoRef: React.RefObject<HTMLVideoElement>,
    remoteVideoRef: React.RefObject<HTMLVideoElement>,
    socket: Socket,
    roomID: string | null,
) => {
    if (peerConnection === null) {
        peerConnection = new RTCPeerConnection(servers);
        const stream = localVideoRef?.current?.srcObject as MediaStream;

        stream?.getTracks().forEach((track: MediaStreamTrack) => {
            peerConnection.addTrack(track, stream);
        });

        peerConnection.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice_candidates", {
                    candidates: event.candidate,
                    roomID: roomID,
                });
            }
        };
    }

    return peerConnection;
};

export const closePeerConnection = (
    remoteVideoRef: React.RefObject<HTMLVideoElement>,
) => {
    peerConnection?.close();
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    peerConnection = null;
};

export const getPeerConnectionOffer = async (
    localVideoRef,
    remoteVideoRef,
    socket,
    roomID,
) => {
    await getPeerConnection(localVideoRef, remoteVideoRef, socket, roomID);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return { offer, peerConnection };
};

export const getPeerConnectionAnswer = async (
    localVideoRef,
    remoteVideoRef,
    socket,
    roomID,
    offer,
) => {
    await getPeerConnection(localVideoRef, remoteVideoRef, socket, roomID);

    const [videoSender] = peerConnection
        .getSenders()
        .filter((s) => s?.track?.kind === "video");
    if (videoSender.RTCRtpParameters) {
        videoSender?.setParameters({
            encodings: [{ maxBitrate: 3000000 }],
        });
    }

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return { answer, peerConnection };
};

export const addAnswer = async (answer) => {
    await peerConnection.setRemoteDescription(answer);
};
