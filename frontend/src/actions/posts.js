import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
export const GET_ALL_POSTS_REQUEST = '@@posts/GET_ALL_POSTS_REQUEST';
export const GET_ALL_POSTS_SUCCESS = '@@posts/GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILURE = '@@posts/GET_ALL_POSTS_FAILURE';


export const getPostList = () => ({
    [RSAA]: {
        endpoint: '/api/v1/posts/?fields=url,id,title,description,slug,background_image,created_on',
        method: 'GET',
        // body: JSON.stringify({ message: message }),
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_ALL_POSTS_REQUEST, GET_ALL_POSTS_SUCCESS, GET_ALL_POSTS_FAILURE
        ]
    }
})

