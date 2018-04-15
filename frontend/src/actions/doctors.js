import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';
export const GET_ALL_DOCTORS_REQUEST = '@@doctors/GET_ALL_DOCTORS_REQUEST';
export const GET_ALL_DOCTORS_SUCCESS = '@@doctors/GET_ALL_DOCTORS_SUCCESS';
export const GET_ALL_DOCTORS_FAILURE = '@@doctors/GET_ALL_DOCTORS_FAILURE';
export const SET_DEFAULT_CLINIC_REQUEST = '@@doctors/SET_DEFAULT_CLINIC_REQUEST';
export const SET_DEFAULT_CLINIC_SUCCESS = '@@doctors/SET_DEFAULT_CLINIC_SUCCESS';
export const SET_DEFAULT_CLINIC_FAILURE = '@@doctors/SET_DEFAULT_CLINIC_FAILURE';

export const getDoctorsList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/doctors/',
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_DOCTORS_REQUEST, GET_ALL_DOCTORS_SUCCESS, GET_ALL_DOCTORS_FAILURE
        ]
    }
})

export const setDefaultClinic = (doctor_id, clinic_id) => ({
    [RSAA]: {
        endpoint: '/api/v1/doctors/' + doctor_id + "/",
        method: 'PATCH',
        body: JSON.stringify({ available_at: (clinic_id) ?  clinic_id : null}),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            SET_DEFAULT_CLINIC_REQUEST, SET_DEFAULT_CLINIC_SUCCESS, SET_DEFAULT_CLINIC_FAILURE
        ]
    }
})

