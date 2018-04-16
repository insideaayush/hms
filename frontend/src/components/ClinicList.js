import React from 'react';
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button"
import Paper from "material-ui/Paper"
const ClinicList = (props) => {
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                Pick a clinic or <Button onClick={() => props.setDefaultClinic(null)} >Set to None </Button>
                <Paper>
                    <List>
                        {props.all_clinics.map(value => (
                            <ListItem
                                key={value.id}
                                role={undefined}
                                dense
                                button
                            >
                                <ListItemText primary={value.name} />
                                <ListItemSecondaryAction>
                                    <Button mini color="secondary" onClick={() => props.setDefaultClinic(value.id)}>
                                        Set Default
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

export default ClinicList