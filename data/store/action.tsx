//FIXME: NEED CHANGE IN NEW PJ: Add action types and action creators here

import { StorageItem, UserFormat, VaccineShot } from "../interfaceFormat";

// export const EXAMPLE = `EXAMPLE`;
// export const examplefnc = (item: any) => {
//     return {
//         type: EXAMPLE,
//         payload: item
//     }
// }

export const SET_USER = `SET_USER`;
export const currentSetUser = (user: UserFormat) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const SAVE_PROFILE = `SAVE_PROFILE`;
export const CURRENTsaveProfile = (profile: UserFormat | UserFormat[]) => {
    return {
        type: SAVE_PROFILE,
        payload: profile
    }
}

export const ADD_TO_PROFILE = `ADD_TO_PROFILE`;
export const CURRENTaddToProfile = (profile: UserFormat) => {
    return {
        type: ADD_TO_PROFILE,
        payload: profile
    }
}

export const REMOVE_PROFILE = `REMOVE_PROFILE`;
export const CURRENTremoveProfile = (profileName: string) => {
    return {
        type: REMOVE_PROFILE,
        payload: profileName
    }
}

export const SAVE_NEW_VACCINE_SHOT = `SAVE_NEW_VACCINE_SHOT`;
export const CURRENTsaveNewVaccineShot = (vaccineShot: VaccineShot) => {
    return {
        type: SAVE_NEW_VACCINE_SHOT,
        payload: vaccineShot
    }
}

export const REMOVE_VACCINE_SHOT = `REMOVE_VACCINE_SHOT`;
export const CURRENTremoveVaccineShot = (vaccineShot: VaccineShot) => {
    return {
        type: REMOVE_VACCINE_SHOT,
        payload: vaccineShot
    }
}

export const ADD_VACCINE_SHOT = `ADD_VACCINE_SHOT`;
export const CURRENTaddVaccineShot = (vaccineName: string, time: Date, place: string) => {
    return {
        type: ADD_VACCINE_SHOT,
        payload: { vaccineName, time, place }
    }
}

export const SET_SELECTED_PROFILE = `SET_SELECTED_PROFILE`;
export const CURRENTsetSelectedProfile = (profile: UserFormat | null) => {
    return {
        type: SET_SELECTED_PROFILE,
        payload: profile
    }
}