import * as posts from '../actions/posts'

const initialState = {
    posts: [],
    isRetrievingPostList: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case posts.GET_ALL_POSTS_REQUEST:
            return {
                ...state,
                isRetrievingPostList: true
            }
        case posts.GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                isRetrievingPostList: false,
                posts: action.payload
            }
        case posts.GET_ALL_POSTS_FAILURE:
            return {
                ...state,
                isRetrievingPostList: false
            }
        default:
            return state
    }
}

export const allPosts = (state) => state.posts
export const isRetrievingPostList = (state) => state.isRetrievingPostList