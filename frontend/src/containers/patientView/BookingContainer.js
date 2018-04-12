import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

// Actions and Reducers import 


// Components
import BookDoctorDialog from '../../components/BookDoctorDialog'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit
    },
    container: {
        position: "relative",
    }
})

class BookingContainer extends React.Component {
    constructor(props) {
        super(props)
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            activeStep: 0,
        }
    }

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    render() {
        return (
            <div>
                <BookDoctorDialog
                    open={this.props.open}
                    handleClickOpen={this.props.handleClickOpen}
                    handleClose={this.props.handleClose}
                    activeStep={this.state.activeStep}
                    handleNext={this.handleNext}
                    handleBack={this.handleBack}
                    handleReset={this.handleReset}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: null
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookingContainer))
