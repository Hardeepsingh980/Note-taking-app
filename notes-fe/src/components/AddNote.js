import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { createNote, updateNote } from '../apihelper';



function AddNoteModal({ show, handleClose, note }) {

    const [validated, setValidated] = useState(false);

    const [title, settitle] = useState();
    const [content, setcontent] = useState();

    

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {

            if (note === undefined) {
                await createNote({
                    title: title,
                    content: content,
                })

            } else {
                await updateNote(note.id, {
                    title: title,
                    content: content
                })
            }


            handleClose();
        }
        setValidated(true);
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            note == undefined ? "Add Note" : "Edit Note"
                        }</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Label htmlFor="inputTitle">Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputTitle"
                        defaultValue={note != undefined ? note.title : ''}
                        onChange={
                            (event) => {
                                settitle(event.target.value);
                            }
                        }
                        required
                    />



                    <Form.Label htmlFor="inputTitle">Content</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputTitle"
                        defaultValue={note != undefined ? note.content : ''}
                        as="textarea" rows={3}
                        onChange={(event) => {
                            setcontent(event.target.value)
                        }}
                        required
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddNoteModal