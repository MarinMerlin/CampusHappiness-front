import React from 'react'
import { Card, Select, MenuItem, Grid, Button, Snackbar, IconButton } from '@material-ui/core';
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
        <Card style={{width: '96vw', margin: 'auto', marginBottom: '5vh'}} >
        <h2 style={{textAlign: 'center', fontFamily: 'Roboto', fontWeight:100, fontSize:'3em', color: '#2c3e50', marginBottom:0}}>Change User Group</h2>
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
