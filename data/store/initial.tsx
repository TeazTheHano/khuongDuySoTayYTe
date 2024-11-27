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
    profile: UserFormat[];
    selectedProfile: null | UserFormat;
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
        email: '',
        address: '',
        vaccineShots: []
    },
    profile: [],
    selectedProfile: null
};