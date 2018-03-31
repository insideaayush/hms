import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth'
import posts, * as fromPosts from './posts'

export default combineReducers({
    auth: auth,
    posts: posts,
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
export const getUserId =
    state => fromAuth.getUserId(state.auth)

// Posts Helper Function

export const getPostList = 
    state => fromPosts.allPosts(state.posts)

export const isRetrievingPostList = 
    state => fromPosts.isRetrievingPostList(state.posts)

export function withAuth(headers = {}) {
    return (state) => ({
        ...headers,
        'Authorization': `Bearer ${accessToken(state)}`
    })
}
