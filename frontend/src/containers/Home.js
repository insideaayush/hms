import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../reducers'

const Home = (props) => {

    console.log(props.user)
    return (
        <div>
            Hello
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)