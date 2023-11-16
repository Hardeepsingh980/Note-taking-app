import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteNote } from '../apihelper';

function NoteCard({id, title, content, onedit, refresh}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
        <Button variant="primary" onClick={onedit}>Edit Note</Button>
        <Button variant="danger" onClick={async () => {
            await deleteNote(id);
            refresh();
        }}>Delete Note</Button>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;