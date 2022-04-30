import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import React from 'react'
import { Box, styled } from '@mui/system'
import EditRoadIcon from '@mui/icons-material/EditRoad';
import Button from '@mui/material/Button';


const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))


const BookTable = (props) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(25)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleDelete = (event) => {
        props.handleDeleteBook(event.target.id)

    }

    const handleEdit = (event) => {
        console.log(event.target.id)
        props.handleEditBook(event.target.id)

    }

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>Title</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.books
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((book, index) => (
                            <TableRow key={index}>
                                {/* <TableCell align="left">
                                    {book.id}
                                </TableCell> */}
                                <TableCell align="left">
                                    <text style={{ fontSize: '16px' }}>{book.title}</text>
                                </TableCell>
                                <TableCell align="left">
                                    <img src={book.image} style={{ height: "80px", width: "80px" }} alt="book" />
                                </TableCell>
                                <TableCell>
                                    <text style={{ fontSize: '16px' }}>{book.amount}</text>
                                </TableCell>
                                <TableCell align="left">
                                    <IconButton onClick={handleEdit}>
                                        <EditRoadIcon id={book.id} color="primary" />
                                    </IconButton>
                                    <IconButton  onClick={handleDelete}>
                                        <Icon id={book.id} color="error">close</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.books.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}

export default BookTable
