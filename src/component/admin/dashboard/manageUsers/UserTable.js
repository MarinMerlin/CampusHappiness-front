import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Card } from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const UserTable = ({page, handleChangePage, userArray, rowsPerPage, handleChangeRowsPerPage}) => {
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, userArray.length - page * rowsPerPage);
    return (
    <Card style={{width: '96vw', margin: 'auto', marginTop: '3vh'}} >
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Pseudo</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {userArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => {
                    return (
                    <TableRow key={user.id} hover={true}>
                        <TableCell component="th" scope="row">
                            {user.firstName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {user.lastName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {user.email}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {user.pseudo}
                        </TableCell>
                    </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={userArray.length}
                  page={page}
                  rowsPerPage= {rowsPerPage}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage = {handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
        </Table>
    </Card>
  )
}

export default UserTable