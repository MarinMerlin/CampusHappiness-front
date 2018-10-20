import React from 'react'
import { Card, Select, MenuItem, Grid, Typography, Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
const SelectedUsers = ({ 
    changeUserGroup, 
    changeGroupSelection, 
    selectedGroup, 
    groupList,
    openSnackBar,
    closeMessage }) => {

    return (
      <div>
        <Card style={{width: '96vw', margin: 'auto', marginTop: '3vh', marginBottom: '3vh'}} >
            <Typography align="center" variant="h3" style={{margin: 20}}>Add selected users to a group</Typography>
            <Grid container justify="center">
                <Grid item>
                    <Select
                        value={selectedGroup.id}
                        onChange={changeGroupSelection}
                        style={{marginLeft: '5vw', margin: 20}}
                    >
                        {groupList.map(group=>(
                            <MenuItem key={group.id} value={group.id} >{group.name}</MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" onClick={changeUserGroup}>Add users</Button>
                </Grid>
            </Grid>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={openSnackBar}
            onClose={closeMessage}
            autoHideDuration={4500}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="sucess">Users added to group</span>}
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
      </div>
    )

}

export default SelectedUsers
