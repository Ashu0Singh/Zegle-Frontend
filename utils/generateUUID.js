import biri from "biri";

export const generateUUID = async (window) => {
    const localStorageUuid = window.localStorage.getItem("uuid");
    if (localStorageUuid) {
        return localStorageUuid;
    }
    const uuid = await biri();
    window.localStorage.setItem("uuid", uuid);
    return uuid;
};
