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
        case TYPE.SAVE_PROFILE: {
            return {
                ...state,
                profile: state.profile.some((p) => p.email === (action.payload as FormatData.UserFormat).email)
                    ? state.profile.map((p) =>
                        p.email === (action.payload as FormatData.UserFormat).email ? (action.payload as FormatData.UserFormat) : p
                    )
                    : [...state.profile, action.payload as FormatData.UserFormat]
            };
        }
        case TYPE.REMOVE_PROFILE: {
            return {
                ...state,
                profile: state.profile.filter((p) => p.email !== action.payload)
            };
        }
        case TYPE.ADD_VACCINE_SHOT: {
            return {
                ...state,
                user: {
                    ...state.user,
                    vaccineShots: state.user.vaccineShots.map((v) => {
                        if (v.name === action.payload.name) {
                            return {
                                ...v,
                                detail: [...v.detail, { time: action.payload.time, place: action.payload.place }]
                            };
                        }
                        return v;
                    })
                }
            };
        }
        case TYPE.REMOVE_VACCINE_SHOT: {
            return {
                ...state,
                user: {
                    ...state.user,
                    vaccineShots: state.user.vaccineShots.filter((v) => v.name !== action.payload)
                }
            };
        }
        case TYPE.SAVE_NEW_VACCINE_SHOT: {
            return {
                ...state,
                user: {
                    ...state.user,
                    vaccineShots: state.user.vaccineShots.some((v) => v.name === (action.payload as FormatData.VaccineShot).name)
                        ? state.user.vaccineShots.map((v) =>
                            v.name === (action.payload as FormatData.VaccineShot).name
                                ? {
                                    ...v,
                                    detail: [...v.detail, (action.payload as FormatData.VaccineShot).detail[0]]
                                }
                                : v
                        )
                        : [...state.user.vaccineShots, action.payload]
                }
            };
        }
        default:
            return state;
    }
}