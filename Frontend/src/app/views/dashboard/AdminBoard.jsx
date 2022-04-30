import React, { Fragment, useState, useEffect } from 'react'

import { styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import BookTable from './shared/BookTable'
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import CreateBookDialog from './shared/CreateBookDialog'
import EditBookDialog from './shared/EditBookDialog'


const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AdminBoard = () => {
    const [books, setBooks] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [editopen, setEditOpen] = React.useState(false);
    const [editBook, setEditBook] = React.useState({
        title: '',
        image: '',
        amount: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    }
    const handleEditOpen = () => {
        setEditOpen(true);
    }

    const handleEditClick = (book_id) => {
        console.log(book_id)
        console.log(books.find(book => String(book.id) === String(book_id)))
        setEditBook(books.find(book => String(book.id) === String(book_id)))
        handleEditOpen()
    }
    
    const create_new_book = async (book_data)=> {
        await fetch("http://localhost:8000/book/", {
            method: "POST",
            crossDomain: true,
            mode: 'cors',
            body: JSON.stringify(book_data),
            headers: {
                'Content-Type': 'application/json'// 有一定可能需要明确一下 Content Type
            },
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log('获取的结果', json);
            console.log("Created book successfully");
            setOpen(false);
            // Reload the books
            fecthAllBooks();

        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    const handleCreate = (book_data) => {
        console.log("Create A New Book")
        console.log(book_data)
        create_new_book(book_data);
    };

      
    const fecthAllBooks = async () => {
        const book_data = await fetch("http://localhost:8000/book", {
            method: "GET",
            crossDomain: true,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'// 有一定可能需要明确一下 Content Type
            },
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log('获取的结果', json);
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        })
        console.log(book_data)
        setBooks(book_data);
    }


    useEffect(() => {
        fecthAllBooks();
    }, []);

    const deleteBook = async (id) => {
        console.log("Delete A Book")
        console.log(id)

        await fetch(`http://localhost:8000/book/edit/${id}`, {
            method: "DELETE",
            crossDomain: true,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'// 有一定可能需要明确一下 Content Type
            },
        })
        fecthAllBooks()

    }

    const handleEditBook = async (new_book_data) => {
        console.log("Edit A Book")
        // console.log(new_book_data)
        await fetch(`http://localhost:8000/book/edit/${new_book_data.id}`, {
            method: "PUT",
            crossDomain: true,
            mode: 'cors',
            body: JSON.stringify(new_book_data),
            headers: {
                'Content-Type': 'application/json'// 有一定可能需要明确一下 Content Type
            },
        })
        fecthAllBooks()
        handleEditClose()
    }   

    
    return (
        <Fragment>
            <Container className="analytics">
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Dashboard', path: '/' },
                            { name: 'Dashboard' },
                        ]}
                    />
                </div>
                <SimpleCard title="Book Table">
                <Button variant="outlined" startIcon={
                    <Icon fontSize="small">add_circle</Icon>
                } style={{position: 'absolute', right:"50px", top:"105px"}} onClick={handleClickOpen}>
                    Add Book
                </Button>
                    <BookTable books={books} handleDeleteBook={deleteBook} handleEditBook={handleEditClick} />
                </SimpleCard>

                <CreateBookDialog open={open} handleClose={handleClose} handleCreate={handleCreate}/>

                <EditBookDialog open={editopen} data={editBook} handleClose={handleEditClose} handleEdit={handleEditBook}/>
            </Container>
        </Fragment>
    )
}









export default AdminBoard
