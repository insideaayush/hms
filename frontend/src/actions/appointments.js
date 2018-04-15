import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'

export const GET_ALL_APPOINTMENTS_REQUEST = '@@appointments/GET_ALL_APPOINTMENTS_REQUEST';
export const GET_ALL_APPOINTMENTS_SUCCESS = '@@appointments/GET_ALL_APPOINTMENTS_SUCCESS';
export const GET_ALL_APPOINTMENTS_FAILURE = '@@appointments/GET_ALL_APPOINTMENTS_FAILURE';
export const ADD_APPOINTMENT_REQUEST = '@@appointments/ADD_APPOINTMENT_REQUEST';
export const ADD_APPOINTMENT_SUCCESS = '@@appointments/ADD_APPOINTMENT_SUCCESS';
export const ADD_APPOINTMENT_FAILURE = '@@appointments/ADD_APPOINTMENT_FAILURE';
export const HANDLE_MESSAGE_CLOSE = '@@appointments/HANDLE_MESSAGE_CLOSE';
export const PATCH_APPOINTMENT_REQUEST = '@@appointments/PATCH_APPOINTMENT_REQUEST'
export const PATCH_APPOINTMENT_SUCCESS = '@@appointments/PATCH_APPOINTMENT_SUCCESS'
export const PATCH_APPOINTMENT_FAILURE = '@@appointments/PATCH_APPOINTMENT_FAILURE'


export const getAppointmentsList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/appointments/',
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_APPOINTMENTS_REQUEST, GET_ALL_APPOINTMENTS_SUCCESS, GET_ALL_APPOINTMENTS_FAILURE
        ]
    }
})

export const getAppointmentsFilterByPatient = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/appointments/?book_by=' + id,
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_APPOINTMENTS_REQUEST, GET_ALL_APPOINTMENTS_SUCCESS, GET_ALL_APPOINTMENTS_FAILURE
        ]
    }
})
export const getAppointmentsFilterByDoctor = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/appointments/?doctor=' + id,
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_APPOINTMENTS_REQUEST, GET_ALL_APPOINTMENTS_SUCCESS, GET_ALL_APPOINTMENTS_FAILURE
        ]
    }
})
export const getAppointmentsFilterByClinic = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/appointments/?clinic=' + id,
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_APPOINTMENTS_REQUEST, GET_ALL_APPOINTMENTS_SUCCESS, GET_ALL_APPOINTMENTS_FAILURE
        ]
    }
})

export const addAppointment = (data) => ({
    [RSAA]: {
        endpoint: '/api/v1/appointments/',
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            ADD_APPOINTMENT_REQUEST, ADD_APPOINTMENT_SUCCESS, ADD_APPOINTMENT_FAILURE
        ]
    }
})

export const handleMessageClose = () => {
    return {
        type: HANDLE_MESSAGE_CLOSE
    }
}

export const patchAppointment = (id, data) => ({
    [RSAA]: {
        endpoint: '/api/v1/appointments/' + id + '/',
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            PATCH_APPOINTMENT_REQUEST, PATCH_APPOINTMENT_SUCCESS, PATCH_APPOINTMENT_FAILURE
        ]
    }
})