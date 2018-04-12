import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_DOCTORS_REQUEST = '@@doctors/GET_ALL_DOCTORS_REQUEST';
export const GET_ALL_DOCTORS_SUCCESS = '@@doctors/GET_ALL_DOCTORS_SUCCESS';
export const GET_ALL_DOCTORS_FAILURE = '@@doctors/GET_ALL_DOCTORS_FAILURE';


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

