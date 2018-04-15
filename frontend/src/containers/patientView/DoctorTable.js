import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

// Actions and Reducers import 
import {getDoctorsList} from '../../actions/doctors'
import {allDoctors, isLoadingDoctorsList} from '../../reducers'

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

const BookCell = (props) => {
    return (
        <TableCell>
            <Button mini aria-label="Book">
                <AddIcon /> Book
            </Button>
        </TableCell>
    )
}

const Cell = (props) => {
    if (props.column.name === 'book') {
        return <BookCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

const Row = (props) => {
    return (
        <TableRow onClick={() => props.book(props.row)} key={props.tableRow.key} row={props.row} children={props.children} />
    )
}


class DoctorTable extends React.Component {
    constructor(props){
        super(props)
        this.loadRowsFromProps = this.loadRowsFromProps.bind(this)
        this.state = {
            columns: [
                { name: 'doctor_id', title: 'DOCTOR_ID' },
                { name: 'name', title: 'NAME' },
                { name: 'specialization', title: 'SPECIALIZATION' },
                { name: 'description', title: 'DESCRIPTION' },
                { name: 'in_at', title: 'AVAILABLE AT' },
                { name: 'book', title: 'ACTION' },
            ],
            integratedSortingColumnExtensions: [
                { columnName: 'doctor_id', compare: comparePrices },
            ],
            pageSizes: [10, 15, 20, 0],
        }
    }

    componentDidMount(){
        this.props.getDoctorsList()
    }

    loadRowsFromProps(){
        if (this.props.doctors) {
            const rows = this.props.doctors.map((doctor) => {
                return {
                    doctor_id: doctor.id,
                    name: doctor.user,
                    specialization: doctor.specialization,
                    description: doctor.description,
                    in_at: (doctor.available_at) ? doctor.available_at.user : "N/A",
                    available_at: doctor.available_at,
                    all_clinics: doctor.all_clinics,
                }
            })
            return rows
        }
        return []
    }

    render() {
        const { classes } = this.props
        const { columns, pageSizes, integratedSortingColumnExtensions } = this.state
        const rows = this.loadRowsFromProps()

        return (
            <div className={classes.paper}>
                <Grid rows={rows} columns={columns}>
                    <FilteringState defaultFilters={[]} />
                    <SortingState
                        defaultSorting={[{ columnName: 'doctor_id', direction: 'asc' }]}
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
                    <Table cellComponent={(props) => <Cell {...props} />} rowComponent={(props) => <Row book={this.props.addToBookCheckout} {...props} />} />
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
                {this.props.loading && <CircularProgress className="loader" />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    doctors: allDoctors(state),
    loading: isLoadingDoctorsList(state),
})

const mapDispatchToProps = (dispatch) => ({
    getDoctorsList: () => {
        dispatch(getDoctorsList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DoctorTable))