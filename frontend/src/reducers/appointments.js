import * as appointments from '../actions/appointments'
import * as doctors from '../actions/doctors'


const initialState = {
    appointments: [],
    isRetrievingAppointmentsList: false,
    snackbarOpen: false,
    snackbarMessage: "",
    loader: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case appointments.GET_ALL_APPOINTMENTS_REQUEST:
            return {
                ...state,
                isRetrievingAppointmentsList: true
            }
        case appointments.GET_ALL_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                isRetrievingAppointmentsList: false,
                appointments: action.payload
            }
        case appointments.GET_ALL_APPOINTMENTS_FAILURE:
            return {
                ...state,
                isRetrievingAppointmentsList: false
            }
        case appointments.ADD_APPOINTMENT_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case appointments.ADD_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: [action.payload, ...state.appointments],
                snackbarOpen: true,
                snackbarMessage: "Appointment booked successfully",
                loader: false,
            }
        case appointments.ADD_APPOINTMENT_FAILURE:
            return {
                ...state,
                snackbarOpen: true,
                snackbarMessage: "Appointment booking failed, Try again later",
                loader: false,
            }
        case appointments.HANDLE_MESSAGE_CLOSE:
            return {
                ...state,
                snackbarMessage: "",
                snackbarOpen: false,
            }
        case doctors.SET_DEFAULT_CLINIC_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case doctors.SET_DEFAULT_CLINIC_SUCCESS:
            return {
                ...state,
                snackbarMessage: "Default Clinic changed successfully",
                snackbarOpen: true, 
                loader: false,
            }
        case doctors.SET_DEFAULT_CLINIC_FAILURE:
            return {
                ...state,
                snackbarMessage: "Default Clinic change failed, Try Again",
                snackbarOpen: true,
                loader: false,
            }
        case doctors.SET_UNAVAILABLE_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case doctors.SET_UNAVAILABLE_SUCCESS:
            return {
                ...state,
                snackbarMessage: "Doctor's availability changed successfully",
                snackbarOpen: true, 
                loader: false,
            }
        case doctors.SET_UNAVAILABLE_FAILURE:
            return {
                ...state,
                snackbarMessage: "Doctor's availability change failed, Try Again",
                snackbarOpen: true,
                loader: false,
            }
        case appointments.PATCH_APPOINTMENT_REQUEST:
            return {
                ...state,
                loader: true
            }
        case appointments.PATCH_APPOINTMENT_SUCCESS:
            state.appointments.map((appointment) => {
                if (appointment.id === action.payload.id) {
                    appointment.status = action.payload.status
                    appointment.appointment_time = action.payload.appointment_time
                }
                return appointment
            })
            return {
                ...state,
                loader: false,
                snackbarMessage: "Appointment Status changed successfully",
                snackbarOpen: true,
                appointments: [...state.appointments] 
            }
        case appointments.PATCH_APPOINTMENT_FAILURE:
            return {
                ...state,
                loader: false,
                snackbarMessage: "Appointment Status change failed, Try Again",
                snackbarOpen: true,
            }
        default:
            return state
    }
}

export const allAppointments = (state) => state.appointments
export const isRetrievingAppointmentsList = (state) => state.isRetrievingAppointmentsList
export const snackbarOpen = (state) => state.snackbarOpen
export const snackbarMessage = (state) => state.snackbarMessage
export const loader = (state) => state.loader