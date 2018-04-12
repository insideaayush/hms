import * as doctors from '../actions/doctors'

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
        case doctors.GET_ALL_DOCTORS_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export const allDoctors = (state) => state.doctors
export const isLoadingDoctorsList = (state) => state.loading