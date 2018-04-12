import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../reducers'
import PatientView from './patientView/PatientView'
import ClinicView from './clinicView/ClinicView'
import DoctorView from './doctorView/DoctorView'

class Home extends React.Component{
    render(){
        var get_user = this.props.user
        if(get_user){
            if(get_user.is_patient){
                return <PatientView/>
            }
            else if(get_user.is_doctor){
                return <DoctorView/>
            }
            else if(get_user.is_clinic){
                return <ClinicView/>
            }

        }
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