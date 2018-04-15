import { RSAA } from 'redux-api-middleware';
import {withAuth} from '../reducers'
export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';
export const LOGGED_IN_USER_REQUEST = '@@auth/LOGGED_IN_USER_REQUEST';
export const LOGGED_IN_USER_RECEIVED = '@@auth/LOGGED_IN_USER_RECEIVED';
export const LOGGED_IN_USER_FAILURE = '@@auth/LOGGED_IN_USER_FAILURE';
export const LOGIN_TYPE_PATIENT = '@@auth/LOGIN_TYPE_PATIENT';
export const LOGIN_TYPE_CLINIC = '@@auth/LOGIN_TYPE_CLINIC';
export const LOGIN_TYPE_DOCTOR = '@@auth/LOGIN_TYPE_DOCTOR';
export const LOGGED_IN_PATIENT_REQUEST = '@@auth/LOGGED_IN_PATIENT_REQUEST'
export const LOGGED_IN_PATIENT_RECEIVED = '@@auth/LOGGED_IN_PATIENT_RECEIVED'
export const LOGGED_IN_PATIENT_FAILURE = '@@auth/LOGGED_IN_PATIENT_FAILURE'
export const LOGGED_IN_DOCTOR_REQUEST = '@@auth/LOGGED_IN_DOCTOR_REQUEST'
export const LOGGED_IN_DOCTOR_RECEIVED = '@@auth/LOGGED_IN_DOCTOR_RECEIVED'
export const LOGGED_IN_DOCTOR_FAILURE = '@@auth/LOGGED_IN_DOCTOR_FAILURE'
export const LOGGED_IN_CLINIC_REQUEST = '@@auth/LOGGED_IN_CLINIC_REQUEST'
export const LOGGED_IN_CLINIC_RECEIVED = '@@auth/LOGGED_IN_CLINIC_RECEIVED'
export const LOGGED_IN_CLINIC_FAILURE = '@@auth/LOGGED_IN_CLINIC_FAILURE'


export const login = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
})

export const loginPatient = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
})
export const loginClinic = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
})
export const loginDoctor = (username, password) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: '/api/auth/token/refresh/',
        method: 'POST',
        body: JSON.stringify({ refresh: token }),
        headers: { 'Content-Type': 'application/json' },
        types: [
            TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
})

export const getLoggedInUser = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/users/' + id + '/',
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [ 
            LOGGED_IN_USER_REQUEST, LOGGED_IN_USER_RECEIVED, LOGGED_IN_USER_FAILURE
        ]
    }
})
export const getLoggedInPatient = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/patients/?user=' + id,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [ 
            LOGGED_IN_PATIENT_REQUEST, LOGGED_IN_PATIENT_RECEIVED, LOGGED_IN_PATIENT_FAILURE
        ]
    }
})

export const getLoggedInDoctor = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/doctors/?user=' + id,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [ 
            LOGGED_IN_DOCTOR_REQUEST, LOGGED_IN_DOCTOR_RECEIVED, LOGGED_IN_DOCTOR_FAILURE
        ]
    }
})

export const getLoggedInClinic = (id) => ({
    [RSAA]: {
        endpoint: '/api/v1/clinics/?user=' + id,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [ 
            LOGGED_IN_CLINIC_REQUEST, LOGGED_IN_CLINIC_RECEIVED, LOGGED_IN_CLINIC_FAILURE
        ]
    }
})



