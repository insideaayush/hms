import React from 'react'
import { connect } from 'react-redux'

class DoctorView extends React.Component {
    render() {
        return <div>"Hello Doctor"</div>
    }
}

const mapStateToProps = (state) => ({
    user: null
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorView)