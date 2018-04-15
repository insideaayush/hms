import React from 'react';
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button"
import Paper from "material-ui/Paper"
const AvailableDoctorsList = (props) => {
    console.log(props.available_doctors)
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Paper>
                    <List>
                        {props.available_doctors.map(value => (
                            <ListItem
                                key={value}
                                role={undefined}
                                dense
                                button
                            >
                                <ListItemText primary={value} />
                                <ListItemSecondaryAction>
                                    <Button mini color="secondary" onClick={() => props.setUnavailable(value)}>
                                        Set Unavailable
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>                
            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>
    )
}

export default AvailableDoctorsList