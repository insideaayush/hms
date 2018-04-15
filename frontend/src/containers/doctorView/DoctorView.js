import React from 'react'
import { connect } from 'react-redux'
import {getDoctor} from '../../reducers'

class DoctorView extends React.Component {
    render() {
        console.log(this.props)
        return <div>"Hello Doctor"</div>
    }
}

const mapStateToProps = (state) => ({
    doctors: getDoctor(state)
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorView)