import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../reducers'
import PatientView from './patientView/PatientView'
import ClinicView from './clinicView/ClinicView'
import DoctorView from './doctorView/DoctorView'
import { getLoggedInPatient, getLoggedInClinic, getLoggedInDoctor} from '../actions/auth'

class Home extends React.Component{
    render(){
        var get_user = this.props.user
        let home = null
        if(get_user){
            if(get_user.is_patient){
                this.props.getLoggedInPatient(this.props.user.id)
                home = <PatientView/>
            }
            else if(get_user.is_doctor){
                this.props.getLoggedInDoctor(this.props.user.id)
                home = <DoctorView/>
            }
            else if(get_user.is_clinic){
                this.props.getLoggedInClinic(this.props.user.id)
                home = <ClinicView/>
            }

        }
        return (
            <div>
                {home}
            </div>
        )      
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
    getLoggedInPatient: (id) => {
        dispatch(getLoggedInPatient(id))
    },
    getLoggedInDoctor: (id) => {
        dispatch(getLoggedInDoctor(id))
    },
    getLoggedInClinic: (id) => {
        dispatch(getLoggedInClinic(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)