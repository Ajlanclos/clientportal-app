import { NOTIFY_USER } from '../Types';

export const notifyUser = (message, messageType) => {
    return {
        type: NOTIFY_USER,
        message,
        messageType
    };
};