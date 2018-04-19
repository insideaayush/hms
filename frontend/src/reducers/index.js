import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth'
import posts, * as fromPosts from './posts'
import doctors, * as fromDoctors from './doctors'
import appointments, * as fromAppointments from './appointments'

export default combineReducers({
    auth: auth,
    posts: posts,
    doctors: doctors,
    appointments: appointments,
    router: routerReducer,
})

// Auth Helper Functions
export const isAuthenticated =
    state => fromAuth.isAuthenticated(state.auth)
export const accessToken =
    state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired =
    state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken =
    state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired =
    state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors =
    state => fromAuth.errors(state.auth)
export const getUser = 
    state => fromAuth.getUser(state.auth)
export const getPatient = 
    state => fromAuth.getPatient(state.auth)
export const getDoctor = 
    state => fromAuth.getDoctor(state.auth)
export const getClinic = 
    state => fromAuth.getClinic(state.auth)
export const getUserId =
    state => fromAuth.getUserId(state.auth)
export const authMessage =
    state => fromAuth.authMessage(state.auth)
export const openAuthDialog =
    state => fromAuth.openAuthDialog(state.auth)

export const appLoader = 
    state => fromAppointments.loader(state.appointments)

// Posts Helper Function
export const getPostList = 
    state => fromPosts.allPosts(state.posts)

export const isRetrievingPostList = 
    state => fromPosts.isRetrievingPostList(state.posts)


// Doctors Helper Function
export const allDoctors = 
    state => fromDoctors.allDoctors(state.doctors)

export const isLoadingDoctorsList = 
    state => fromDoctors.isLoadingDoctorsList(state.doctors)

export const getLoggedInDoctor = 
    state => fromDoctors.getLoggedInDoctor(state.doctors)

// Doctors Helper Function
export const allAppointments = 
    state => fromAppointments.allAppointments(state.appointments)

export const isRetrievingAppointmentsList = 
    state => fromAppointments.isRetrievingAppointmentsList(state.appointments)

export const snackbarOpen = 
    state => fromAppointments.snackbarOpen(state.appointments)

export const snackbarMessage = 
    state => fromAppointments.snackbarMessage(state.appointments)

export function withAuth(headers = {}) {
    return (state) => ({
        ...headers,
        'Authorization': `Bearer ${accessToken(state)}`
    })
}
