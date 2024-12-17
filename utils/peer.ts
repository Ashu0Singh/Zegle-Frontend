const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:5349",
                "stun:stun1.l.google.com:5349",
            ],
        },
        {
            urls: "turn:global.relay.metered.ca:80",
            username: "c0364de538285be0533e9d03",
            credential: "23OtGgEmVOAMt0R5",
        },
        {
            urls: "turn:global.relay.metered.ca:443",
            username: "c0364de538285be0533e9d03",
            credential: "23OtGgEmVOAMt0R5",
        },
    ],
};

let peerConnection = null;

export const getPeerConnection = async (
    localVideoRef,
    remoteVideoRef,
    socket,
    roomID,
) => {
    if (peerConnection === null) {
        peerConnection = new RTCPeerConnection(servers);
        const stream = localVideoRef.current.srcObject;

        stream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, stream);
        });

        peerConnection.ontrack = (event) => {
            console.log("Remote track received:", event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0]; // Entire stream, not just tracks
            }
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(
                    "Sending ICE candidates to server:",
                    event.candidate,
                );
                socket.emit("ice_candidates", {
                    candidates: event.candidate,
                    roomID: roomID,
                });
            }
        };
    }

    return peerConnection;
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
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    return { answer, peerConnection };
};

export const addAnswer = async (answer) => {
    await peerConnection.setRemoteDescription(answer);
};
