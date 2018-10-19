import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Card,Typography} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const inputStyle = {
    margin: '2vh',
    width: '22vw'
}

const GroupAdder = ({
    groupPost,
    onKeyPress,
    name,
    openSnackBar,
    closeMessage
}) => {

    return (
        <Card style={{width: '96vw', margin: 'auto', marginTop: '3vh'}} >
            <Typography align="center" variant="h3" style={{margin: 20}}>Add group</Typography>
            <Grid 
                container 
                direction='row' 
                justify= 'center'
                alignItems= 'center'
                style={{
                    padding: '3vh'
                }}
            >
                <TextField
                id="fn"
                name="name"
                label="name"
                value={name}
                margin="normal"
                variant="outlined"
                onChange={onKeyPress}
                style={inputStyle}
                />
                <Button variant="contained" color="primary" onClick={groupPost} size='large' >
                    Add Group
                </Button>
            </Grid>

            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={openSnackBar}
            onClose={closeMessage}
            autoHideDuration={4500}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="sucess">Group Added</span>}
            action={[
            <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={closeMessage}
            >
            <CloseIcon />
            </IconButton>,
            ]}
            />
        </Card>
    )
}

export default GroupAdder

