//FIXME: NEED CHANGE IN NEW PJ: Add action types and action creators here
// export default function setReducer(state = initialState, action: Action): ExampleInitInter {
//     switch (action.type) {
//         case Example: {
//             return {
//                 ...state,
//                 example: action.payload
//             };
//         }
//         default:
//             return state;
//     }
// }

import * as FormatData from "../interfaceFormat";
import {
    initialState, CurrentCache, Action,
} from "./initial";

import * as TYPE from "./action";

export default function setReducer(state = initialState, action: Action): CurrentCache {
    switch (action.type) {
        case TYPE.SET_USER: {
            return {
                ...state,
                user: action.payload as FormatData.UserFormat
            };
        }
        case TYPE.SET_LOCATION: {
            return {
                ...state,
                location: action.payload as unknown as FormatData.StorageItem['location']
            };
        }
        case TYPE.SET_CURRETN_WEATHER: {
            return {
                ...state,
                currentWeather: action.payload
            };
        }
        default:
            return state;
    }
}