import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../reducers'

class Home extends React.Component{
    render(){
        console.log(this.props)
        return null      
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)