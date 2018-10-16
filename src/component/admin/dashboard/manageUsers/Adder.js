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
        <Grid
            container
            direction= 'column'
            justify= 'center'
            alignItems= 'center'
            style={{
                width: '100vw',
                backgroundColor: 'red'
            }}
        >
            <Card
                style={{
                    marginTop:'5vh',
                    padding: '2vh',
                    width: '100vh',
                    backgroundColor: 'blue'
                }}
            >
                <Grid 
                    container 
                    direction='row' 
                    justify= 'center'
                    alignItems= 'center'
                >
                    <TextField
                    id="fn"
                    name="firstName"
                    label="firstName"
                    value={firstName}
                    margin="normal"
                    variant="outlined"
                    onChange={onKeyPress}
                    />
                    <TextField
                    id="ln"
                    name="lastName"
                    label="lastName"
                    value={lastName}
                    margin="normal"
                    variant="outlined"
                    onChange={onKeyPress}
                    />
                    <TextField
                    id="email"
                    name="email"
                    label="email"
                    value={email}
                    margin="normal"
                    variant="outlined"
                    onChange={onKeyPress}
                    />
                </Grid>
                <Grid
                    container 
                    direction='row' 
                    justify= 'center'
                    alignItems= 'center'
                >
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
                    <Button variant="contained" color="primary" onClick={singlePost} >
                        Add User
                    </Button>
                </Grid>
            </Card>
            <Card
                style={{
                    marginTop:'5vh',
                    padding: '2vh',
                    width: '100vh'
                }}
            >
                <Grid
                    container
                    direction='row' 
                    justify= 'center'
                    alignItems= 'center'
                >
                    <CSVReader
                        cssClass="csv-input"
                        label="Select CSV with users "
                        onFileLoaded={handleFile}
                        onError={uploadError}
                        inputId="ObiWan"
                    />
                    <Button variant="contained" onClick={csvPost}>
                        Add User via CSV
                    </Button>
                </Grid>
            </Card>
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
        </Grid>
    )
}

export default Adder

