import React from 'react'
import { connect } from 'react-redux'

class ClinicView extends React.Component {
    render() {
        return <div>"Hello Clinic"</div>
    }
}

const mapStateToProps = (state) => ({
    user: null
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(ClinicView)