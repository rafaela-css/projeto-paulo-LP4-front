import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState } from 'react';

function Task() {
  const [taskId, setTaskId] = useState();

  const deleteUrl = async () => {
    try {
      const { status } = await axios.delete(
        // `https://backoffice-backend-qsu7zylbsa-rj.a.run.app/site/redirects/${urlId}`
        ``
      );

      if (status === 200) {
        // getUrls();
        // setDeleteConfirmationModal(false);
        // setTaskId();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link 
          href="#"
          onClick={(event) => {
            event.preventDefault();
            // setTaskId(task.id);
            // setDeleteConfirmationModal(true);
          }}>Apagar</Card.Link>
        <Card.Link href="#">Editar</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Task;