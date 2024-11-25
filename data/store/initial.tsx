//FIXME: NEED CHANGE IN NEW PJ: Add action types and action creators here
// export interface ExampleInitInter {
//     example: string;
// }
// export interface Action {
//     type: string;
//     payload?: any;
// }
// export const initialState: ExampleInit = {
//     example: 'example'
// };

import { StorageItem, UserFormat } from "../interfaceFormat";

export interface CurrentCache {
    user: UserFormat;
    location: StorageItem['location'];
    currentWeather: any
}

export interface Action {
    type: string;
    payload?: any;
}

export const initialState: CurrentCache = {
    user: {
        synced: false,
        name: '',
        age: 0,
        loginMethod: '',
        email: '',
        dataCollect: false,
        data: {
            interest: [],
            favorite: [],
            job: '',
        }
    },
    location: {
        lat: 0,
        lng: 0
    },
    currentWeather: {}
};