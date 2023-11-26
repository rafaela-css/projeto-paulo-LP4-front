import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from "react-hook-form";
import sweetalert from "sweetalert"
import { CreateTaskForm, TaskFormValidationsSchema } from './formValidationsSchema';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import ITasks from '../../types/ITasks';
import { Container } from './styles';

export default function FormTask() {
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    resolver: yupResolver(TaskFormValidationsSchema) as any,
    defaultValues: {},
  });

  const createTask = async (values: CreateTaskForm) => {
    try {
      const { status } = await axios.post(
        'http://localhost:8000/api/tasks',
        {
          title: values.title,
          description: values.description,
          completed: values.completed
        }
      );


      if (status === 201) {
        sweetalert("A tarefa foi adicionada com sucesso.")
        navigate(`/home`);
      }
    } catch (error) {
      throw error;
    }
  };

  const updateTask = async (values: any) => {
    try {
      const { status } = await axios.put(
        `http://localhost:8000/api/tasks/${id}`,
        {
          title: values.title,
          description: values.description,
          completed: values.completed
        }
      );

      if (status == 200) {
        sweetalert("A tarefa foi atualizada com sucesso.")
        navigate(`/home`);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmitTask: SubmitHandler<CreateTaskForm> = async (values) => {
    console.log(updateMode)
    const normalizedValues = {
      ...values
    };

    try {
      if (updateMode) {
        await updateTask(normalizedValues);
        return;
      } else {
        createTask(normalizedValues);
        return;
      }
    } catch (error) {
      sweetalert(`Tarefa não ${updateMode ? 'atualizada' : 'cadastrada'}`);
      console.error(error);
    }
  };

  const getPageById = async () => {
    try {
      if (id) {
        const { data } = await axios.get<ITasks>(`http://localhost:8000/api/tasks/${id}`);

        if (data) {
          console.log(data.data.title)
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("completed", data.completed);
        }

        setUpdateMode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (id) {
      setUpdateMode(true);
      (async () => {
        await getPageById();
      })();
    }
  }, [id]);


  return (
    <>
      <Container>
        <h3>{updateMode ? 'Atualizar' : 'Cadastrar'} Tarefa</h3>
        <Form onSubmit={handleSubmit(handleSubmitTask)}  autoComplete="off">
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título da tarefa"
                required
                id="title"
                {...register("title")}
              />
              <div className="mt-2 text-danger">
                {errors.title?.message ?? ""}
              </div>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                id="description"
                type="text"
                placeholder="Digite a descrição da tarefa"
                required
                {...register("description")}
              />
              <div className="mt-2 text-danger">
                {errors.description?.message ?? ""}
              </div>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Completa"
                id="completed"
                {...register("completed")}
              />
              <div className="mt-2 text-danger">
                {errors.completed?.message ?? ""}
              </div>
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            {updateMode ? 'Atualizar' : 'Cadastrar'} Tarefa
          </Button>
        </Form>
      </Container>
    </>
  );
}


