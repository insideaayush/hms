import * as doctors from '../actions/doctors'
import * as auth from '../actions/auth'

const initialState = {
    doctors: [],
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case doctors.GET_ALL_DOCTORS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case doctors.GET_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                loading: false,
                doctors: action.payload
            }
        case doctors.SET_UNAVAILABLE_SUCCESS:
        case doctors.SET_DEFAULT_CLINIC_SUCCESS:
            state.doctors.map((doctor) => {
                if(doctor.id === action.payload.id){
                    doctor.available_at = action.payload.available_at
                }
                return doctor
            })
            return {
                ...state,
                doctors: [...state.doctors],
                doctor: action.payload
            }
        case auth.LOGGED_IN_DOCTOR_RECEIVED:
            return {
                ...state,
                doctor: { ...action.payload[0] }
            }
        default:
            return state
    }
}

export const allDoctors = (state) => state.doctors
export const isLoadingDoctorsList = (state) => state.loading
export const getLoggedInDoctor = (state) => state.doctor
