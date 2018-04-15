import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

// Actions and Reducers import 
import { setAppointmentStatus, getAppointmentsList, getAppointmentsFilterByPatient, getAppointmentsFilterByClinic, getAppointmentsFilterByDoctor } from '../actions/appointments'
import { allAppointments, isRetrievingAppointmentsList, getUser, getPatient, getDoctor, getClinic } from '../reducers'
import {getStatus} from '../constants'
// Components
import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    PagingState,
    IntegratedPaging,
    GroupingState,
    IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
    Grid, Table, TableHeaderRow, TableFilterRow, PagingPanel, GroupingPanel, TableGroupRow,
    DragDropProvider, Toolbar, TableColumnReordering, TableColumnVisibility, ColumnChooser
} from '@devexpress/dx-react-grid-material-ui'
import { TableRow, TableCell } from 'material-ui/Table'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ChangeApptStatusDialog from  '../components/ChangeApptStatusDialog'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit
    }
})

const comparePrices = (a, b) => {
    const _a = parseFloat(a)
    const _b = parseFloat(b)
    if (_a === _b) {
        return 0
    }
    return (_a < _b) ? -1 : 1
}

const getParsedDateTime = (d) => {
    return (new Date(Date.parse(d))).toString()
}

class AppointmentsTable extends React.Component {
    constructor(props) {
        super(props)
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
        this.ConfirmCell = this.ConfirmCell.bind(this)
        this.SetStatusCell = this.SetStatusCell.bind(this)
        this.Cell = this.Cell.bind(this)
        this.Row = this.Row.bind(this)
        this.handleConfirmAppointment = this.handleConfirmAppointment.bind(this)
        this.handleSetStatus = this.handleSetStatus.bind(this)
        this.handleStatusDialogChange = this.handleStatusDialogChange.bind(this)
        this.handleStatusDialogClickOpen = this.handleStatusDialogClickOpen.bind(this)
        this.handleStatusDialogClose = this.handleStatusDialogClose.bind(this)
        this.handleSetStatusOkPress = this.handleSetStatusOkPress.bind(this)
        this.state = {
            columnsPatient: [
                { name: 'booking_id', title: 'BOOKING ID' },
                { name: 'booked_on', title: 'BOOKED ON' },
                { name: 'doctor', title: 'DOCTOR' },
                { name: 'clinic', title: 'CLINIC' },
                { name: 'status', title: 'STATUS' },
                { name: 'preferred_time', title: 'PREFERRED TIME' },
                { name: 'appointment_time', title: 'APPOINTMENT TIME' },
            ],
            columnsClinic: [
                { name: 'booking_id', title: 'BOOKING ID' },
                { name: 'booked_on', title: 'BOOKED ON' },                
                { name: 'book_by', title: 'BOOK BY' },
                { name: 'doctor', title: 'DOCTOR' },
                { name: 'status', title: 'STATUS' },
                { name: 'preferred_time', title: 'PREFERRED TIME' },
                { name: 'appointment_time', title: 'APPOINTMENT TIME' },
                { name: 'set_apointment', title: 'ACTION' },
            ],
            columnsDoctor: [
                { name: 'booking_id', title: 'BOOKING ID' },
                { name: 'booked_on', title: 'BOOKED ON' },                
                { name: 'book_by', title: 'BOOK BY' },
                { name: 'clinic', title: 'CLINIC' },
                { name: 'status', title: 'STATUS' },
                { name: 'preferred_time', title: 'PREFERRED TIME' },
                { name: 'appointment_time', title: 'APPOINTMENT TIME' },
                { name: 'set_status', title: 'ACTION' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'booking_id', compare: comparePrices },
            ],
            pageSizes: [10, 15, 20, 0],
            openStatusDialog: false,
            appointmentStatus: "",
            appointmentId: null,
        }
    }

    handleStatusDialogChange = name => event => {
        this.setState({ [name]: (event.target.value) });
    };

    handleStatusDialogClickOpen = (id) => {
        this.setState({ appointmentId: id, openStatusDialog: true });
    };

    handleStatusDialogClose = () => {
        this.setState({ appointmentId: null, openStatusDialog: false });
    };

    componentDidMount() {
        if(this.props.user.is_patient){
            this.props.getAppointmentsFilterByPatient(this.props.patient.id)
        }
        else if(this.props.user.is_doctor){
            this.props.getAppointmentsFilterByDoctor(this.props.doctor.id)
        }
        else if(this.props.user.is_clinic){
            this.props.getAppointmentsFilterByClinic(this.props.clinic.id)
        }
        else{
            this.props.getAppointmentsList()
        }
    }

    loadRowsFromProps() {
        if (this.props.appointments) {
            const rows = this.props.appointments.map((appointment) => {
                return {
                    id: appointment.id,
                    booking_id: appointment.booking_id,
                    book_by: appointment.book_by,
                    doctor: appointment.doctor,
                    clinic: appointment.location,
                    status: getStatus(appointment.status),
                    booked_on: getParsedDateTime(appointment.created_on),
                    preferred_time: (appointment.preferred_time) ? getParsedDateTime(appointment.preferred_time) : "NOT SET",
                    appointment_time: (appointment.appointment_time) ? getParsedDateTime(appointment.appointment_time): "NOT SET",
                }
            })
            return rows
        }
        return []
    }

    ConfirmCell = (props) => {
        return (
            <TableCell>
                <Button onClick={this.handleConfirmAppointment} mini aria-label="set_apointment">
                    <AddIcon /> CONFIRM
            </Button>
            </TableCell>
        )
    }

    SetStatusCell = (props) => {
        return (
            <TableCell>
                <Button onClick={() => this.handleSetStatus(props.row.id)} mini aria-label="set_apointment">
                    <AddIcon /> SET STATUS
                </Button>
            </TableCell>
        )
    }

    Cell = (props) => {
        if (props.column.name === 'set_apointment') {
            return <this.ConfirmCell {...props} />;
        }
        if (props.column.name === 'set_status') {
            return <this.SetStatusCell {...props} />;
        }
        return <Table.Cell {...props} />;
    };

    Row = (props) => {
        return (
            <TableRow key={props.tableRow.key} row={props.row} children={props.children} />
        )
    }

    handleSetStatus(id){
        this.handleStatusDialogClickOpen(id)
    }

    handleSetStatusOkPress(){
        this.props.setAppointmentStatus(this.state.appointmentId, this.state.appointmentStatus)
        this.setState({
            openStatusDialog: false,
            appointmentId: null,
            appointmentStatus: ""
        })
    }

    handleConfirmAppointment(){
        console.log("confirm")
    }

    render() {
        const { classes } = this.props
        const { columnsPatient, columnsDoctor, columnsClinic, pageSizes, integratedSortingColumnExtensions } = this.state
        const rows = this.loadRowsFromProps()
        let columns= null
        if(this.props.user.is_patient){
            columns = columnsPatient
        }
        else if (this.props.user.is_doctor){
            columns = columnsDoctor
        }
        else if (this.props.user.is_clinic){
            columns = columnsClinic
        }
        else {
            columns = null
        }
        return (
            <div className={classes.paper}>
                <Grid rows={rows} columns={columns}>
                    <FilteringState defaultFilters={[]} />
                    <SortingState
                        defaultSorting={[{ columnName: 'booked_on', direction: 'desc' }]}
                    />
                    <GroupingState defaultGrouping={[]} />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={10}
                    />
                    <IntegratedGrouping />
                    <IntegratedFiltering />
                    <IntegratedSorting columnExtensions={integratedSortingColumnExtensions} />
                    <IntegratedPaging />
                    <DragDropProvider />
                    <Table />
                    <Table cellComponent={(props) => <this.Cell {...props} />} rowComponent={(props) => <this.Row {...props} />} />
                    <TableColumnReordering />
                    <TableHeaderRow showSortingControls />
                    <TableFilterRow />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <TableGroupRow />
                    <TableColumnVisibility />
                    <Toolbar />
                    <GroupingPanel showSortingControls />
                    <ColumnChooser />
                </Grid>
                <ChangeApptStatusDialog
                    open={this.state.openStatusDialog}
                    status={this.state.appointmentStatus}
                    clinic={this.props.user.is_clinic}
                    handleClickOpen={this.handleStatusDialogClickOpen}
                    handleClose={this.handleStatusDialogClose}
                    handleChange={this.handleStatusDialogChange}
                    handleOkPress={this.handleSetStatusOkPress}
                />
                {this.props.loading && <CircularProgress className="loader" />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    appointments: allAppointments(state),
    loading: isRetrievingAppointmentsList(state),
    user: getUser(state),
    patient: getPatient(state),
    clinic: getClinic(state),
    doctor: getDoctor(state),
})

const mapDispatchToProps = (dispatch) => ({
    getAppointmentsList: () => {
        dispatch(getAppointmentsList())
    },
    getAppointmentsFilterByPatient: (id) => {
        dispatch(getAppointmentsFilterByPatient(id))
    },
    getAppointmentsFilterByClinic: (id) => {
        dispatch(getAppointmentsFilterByClinic(id))
    },
    getAppointmentsFilterByDoctor: (id) => {
        dispatch(getAppointmentsFilterByDoctor(id))
    },
    setAppointmentStatus: (id, status) => {
        dispatch(setAppointmentStatus(id, status))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppointmentsTable))