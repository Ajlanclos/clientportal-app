import { DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION} from '../Types';

export const setDisabledBalanceOnAdd = () => {
    // Get settings from localStorage
    const settings = JSON.parse(localStorage.getItem('settings'));

    // Toggle value here
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

    // Set back to localStorage
    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    }
}

export const setDisabledBalanceOnEdit = () => {

    const settings = JSON.parse(localStorage.getItem('settings'));

    settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    }
}

export const setAllowRegistration = () => {

    const settings = JSON.parse(localStorage.getItem('settings'));

    settings.allowRegistration = !settings.allowRegistration;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: ALLOW_REGISTRATION,
        payload: settings.allowRegistration
    }
}