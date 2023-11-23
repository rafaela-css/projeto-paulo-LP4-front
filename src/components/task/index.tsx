import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState } from 'react';
import { TaskProps } from './taskValidationObject';
import { TaskItem } from './styles';
import { Link, useNavigate } from 'react-router-dom';
 
function Task({ task }: TaskProps) {
  const [taskId, setTaskId] = useState();
  const navigate = useNavigate();

  const deleteUrl = async () => {
    try {
      const { status } = await axios.delete(
        `http://localhost:8000/api/tasks/${task.id}`
      );
 
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = (taskId: string) => {
    navigate(`/task/${task?.id}`);
    
  };
 
  return (
    <Link to={`/task/${task.id}`}>					
    <TaskItem>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>
          <span>Título: </span>
          {task.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <span>Código da Tarefa: </span>
          {task.id}
          </Card.Subtitle>
        <Card.Text>
          <span>Descrição: </span>
          {task.description}
        </Card.Text>
        <Card.Text>
          <span>Status: </span>
          {task.completed ? 'Completa' : 'Incompleta'}
        </Card.Text>
        <Card.Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setTaskId(task.id);
            deleteUrl();
          }}>Apagar</Card.Link>
        <Card.Link href="#"
         onClick={(event) => {
          event.preventDefault();
          handleEdit(task.id);
        }}
        >Editar</Card.Link>
      </Card.Body>
    </Card>
    </TaskItem>
		</Link>
  );
}
 
export default Task;