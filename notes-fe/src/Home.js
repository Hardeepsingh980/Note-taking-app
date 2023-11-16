import React, {useState, useEffect} from 'react'
import MyNavbar from './components/Navbar'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NoteCard from './components/NoteCard';
import AddNoteModal from './components/AddNote';
import { getAllNotes } from './apihelper';

function Home() {

    const [notes, setNotes] = useState([]);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedNote, setselectedNote] = useState();

    const [refresh, setRefresh] = useState(false);

    useEffect( () => {
        getNotesFromAPI();
    }, [refresh]);

    const getNotesFromAPI = async () => {
        var _notes = await getAllNotes();
        setNotes(_notes);
    }

    const makeRefresh = () => {
        setRefresh(!refresh);
    }
    

    return (
        <>
            <MyNavbar setAddModalOpen={setAddModalOpen} />

            <Container style={
                {
                    marginTop: 50,
                }
            }>
                <Row>
                    {
                        notes.map(note => {
                            return <Col style={{
                                padding: 10
                            }}><NoteCard id={note.id} title={note.title} content={note.content} onedit={
                                () => {
                                    setselectedNote(note);
                                    setAddModalOpen(true);
                                }
                                
                            } refresh={makeRefresh} /></Col>
                        })
                    }
                </Row>
            </Container>

            <AddNoteModal show={addModalOpen} handleClose={() => {
                setAddModalOpen(false);
            }} note={selectedNote} />
        </>

    )
}

export default Home