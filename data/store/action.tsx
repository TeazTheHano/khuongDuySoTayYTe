//FIXME: NEED CHANGE IN NEW PJ: Add action types and action creators here

import { StorageItem, UserFormat } from "../interfaceFormat";

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

export const SET_LOCATION = `SET_LOCATION`;
export const currentSetLocation = (location: StorageItem['location']) => {
    return {
        type: SET_LOCATION,
        payload: location
    }
}

export const SET_CURRETN_WEATHER = `SET_CURRETN_WEATHER`;
export const currentSetCurrentWeather = (currentWeather: any) => {
    return {
        type: SET_CURRETN_WEATHER,
        payload: currentWeather
    }
}