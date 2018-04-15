import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'
import * as doctors from '../actions/doctors'

const initialState = {
    access: undefined,
    refresh: undefined,
    user: undefined,
    type: undefined,
    errors: {},
    clinic: undefined,
    doctor: undefined,
    patient: undefined,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case auth.LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    id: jwtDecode(action.payload.access).user_id
                },
                access: {
                    token: action.payload.access,
                    ...jwtDecode(action.payload.access)
                },
                refresh: {
                    token: action.payload.refresh,
                    ...jwtDecode(action.payload.refresh)
                    },
                errors: {}
            }
            
        case auth.TOKEN_RECEIVED:
            return {
                ...state,
                access: {
                    token: action.payload.access,
                    ...jwtDecode(action.payload.access)
                }
            }
        case auth.LOGIN_FAILURE:
        case auth.TOKEN_FAILURE:
            return {
                ...state,
                access: undefined,
                refresh: undefined,
                errors:
                    action.payload.response ||
                    { 'non_field_errors': action.payload.statusText },
            }
        case '@@auth/HANDLE_LOGOUT':
            return {
                ...state,
                access: undefined,
                refresh: undefined,
            }
        case auth.LOGGED_IN_USER_RECEIVED:
            return {
                ...state,
                user: {...action.payload}
            }
        
        case auth.LOGGED_IN_PATIENT_RECEIVED:
            return {
                ...state,
                patient: {...action.payload[0]}
            }
        case doctors.SET_UNAVAILABLE_SUCCESS:
            let updated_clinic = { ...state.clinic, available_doctors: state.clinic.available_doctors.filter((id) => id !== action.payload.id)}
            return {
                ...state,
                clinic: {...updated_clinic}
            }
        case auth.LOGGED_IN_CLINIC_RECEIVED:
            return {
                ...state,
                clinic: {...action.payload[0]}
            }
        
        case auth.LOGGED_IN_DOCTOR_RECEIVED:
            return {
                ...state,
                doctor: {...action.payload[0]}
            }
        
        default:
            return state
    }
}

export function accessToken(state) {
    if (state.access) {
        return state.access.token
    }
}

export function refreshToken(state) {
    if (state.refresh) {
        return state.refresh.token
    }
}

export function isAccessTokenExpired(state) {
    if (state.access && state.access.exp) {
        return 1000 * state.access.exp - (new Date()).getTime() < 5000
    }
    return true
}

export function isRefreshTokenExpired(state) {
    if (state.refresh && state.refresh.exp) {
        return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
    }
    return true
}

export function isAuthenticated(state) {
    return !isRefreshTokenExpired(state)
}

export function errors(state) {
    return state.errors
}

export function getUser(state) {
    return state.user
}
export function getPatient(state) {
    return state.patient
}
export function getClinic(state) {
    return state.clinic
}
export function getDoctor(state) {
    return state.doctor
}

export function getUserId(state) {
    return state.access.user_id
}

