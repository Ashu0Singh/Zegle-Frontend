import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const generateUUID = async (window) => {
    const localStorageUuid = window.localStorage.getItem("uuid");
    if (localStorageUuid) {
        return localStorageUuid;
    }

    const fpPromise = FingerprintJS.load();

    const uuid = await fpPromise
        .then((fp) => fp.get())
        .then((result) => result.visitorId);
    window.localStorage.setItem("uuid", uuid);
    return uuid;
};

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};
