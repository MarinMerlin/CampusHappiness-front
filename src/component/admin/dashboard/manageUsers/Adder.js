import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CSVReader from 'react-csv-reader'
import {Card} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const inputStyle = {
    margin: '2vh',
    width: '22vw'
}

const Adder = ({
    uploadUserList,
    onKeyPress,
    adminCheckBox,
    singlePost,
    csvPost,
    checkBoxState,
    firstName,
    lastName,
    email,
    openSnackBar,
    closeMessage
}) => {

    function handleFile(data){
        uploadUserList(data)
    }

    function uploadError(){
        console.log("error")
    }

    return (
        <Card style={{width: '96vw', margin: 'auto', marginTop: '3vh'}} >
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
                name="firstName"
                label="firstName"
                value={firstName}
                margin="normal"
                variant="outlined"
                onChange={onKeyPress}
                style={inputStyle}
                />
                <TextField
                id="ln"
                name="lastName"
                label="lastName"
                value={lastName}
                margin="normal"
                variant="outlined"
                onChange={onKeyPress}
                style={inputStyle}
                />
                <TextField
                id="email"
                name="email"
                label="email"
                value={email}
                margin="normal"
                variant="outlined"
                onChange={onKeyPress}
                style={inputStyle}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                        checked={checkBoxState}
                        value="checkedB"
                        color="primary"
                        onClick={adminCheckBox}
                        />
                    }
                    label="Admin status"
                />
                <Button variant="contained" color="primary" onClick={singlePost} size='large' >
                    Add User
                </Button>
            </Grid>
            <Grid
                container 
                direction='row' 
                justify= 'center'
                alignItems= 'center'
                style={{
                    padding: '3vh'
                }}
            >
                <CSVReader
                    cssClass="csv-input"
                    label="Select CSV with users "
                    onFileLoaded={handleFile}
                    onError={uploadError}
                    inputId="ObiWan"
                />
                <Button variant="contained" onClick={csvPost} size='small' >
                    add user via csv
                </Button>
            </Grid>

            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={openSnackBar}
            onClose={this.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="sucess">Users Added</span>}
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

export default Adder

