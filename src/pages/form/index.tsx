  import { useEffect, useState } from 'react';
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  import { SubmitHandler, useForm } from "react-hook-form";
  import sweetalert from "sweetalert"
  import { CreateTaskForm, TaskFormValidationsSchema } from './formValidationsSchema';
  import axios from 'axios';
  import { useNavigate, useParams } from 'react-router-dom';
  import { yupResolver } from "@hookform/resolvers/yup";

  export default function FormTask() {
      const [Titulo, setTitulo] = useState("");
    const [Descricao, setDescricao] = useState("");
    const [Completa, setCompleta] = useState(false);
      const [isFormValid, setIsFormValid] = useState(false); 
      const [updateMode, setUpdateMode] = useState(false); 
      const navigate = useNavigate();
      const { id } = useParams();

      const {
          handleSubmit,
        } = useForm<CreateTaskForm>({
          resolver: yupResolver(TaskFormValidationsSchema) as any,
          defaultValues: {},
        });


      const checkFormValidity = () => {
          if (Titulo && Descricao && Completa) {
              setIsFormValid(true);
          } else {
              setIsFormValid(false);
          }
      };

      const createTask = async (values: CreateTaskForm) => {
          try {
            const { status, data } = await axios.post(
              '/tasks',
              {
                task: {
                  title: values.title,
                  description: values.description,
                  completed: !!values.completed,
                }
              }
            );
        console.log(data)
            if (status === 201) {
              sweetalert("A tarefa foi adicionada com sucesso.")
              
              
              navigate(`/home`);
            }
          } catch (error) {
            throw error;
          }
        };

        const updateTask = async (values: CreateTaskForm) => {
          try {
            const { status, data } = await axios.put(
              `http://localhost:8000/api/tasks/${id}`,
              {
                  task: {
                      title: values.title,
                      description: values.description,
                      completed: !!values.completed,
                    }
              }
            );
      
            if (status === 201 || status === 200) {
                sweetalert("A tarefa foi atualizada com sucesso.")
      
              navigate(`/home`);
            }
          } catch (error) {
            throw error;
          }
        };

      const handleOnSubmit: SubmitHandler<CreateTaskForm> = async (
          values
        ) => {    
          try {
            if (updateMode) {
              await updateTask(values);
            } else {
              await createTask(values);
            }
          } catch (error) {
            sweetalert(`Tarefa não ${updateMode ? 'atualizada' : 'cadastrada'}`);
          }
      
        };

      useEffect(() => {
          checkFormValidity();
      }, [Titulo, Descricao, Completa, checkFormValidity]);

    return (
      <>
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control 
              type="text" 
              placeholder="Digite o título da tarefa" 
              required
              onChange={(evento) =>
                  setTitulo(evento.target.value)
              }/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control 
              type="text" 
              placeholder="Digite a descrição da tarefa" 
              required
              onChange={(evento) =>
                  setDescricao(evento.target.value)
              }/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check 
              type="checkbox" 
              label="Completa" 
              required
              onChange={(evento) =>
                  setCompleta(evento.target.checked)
              }/>
        </Form.Group>
        <Button variant="primary" type="submit">
          {updateMode ? 'Cadastrar' : 'Atualizar'} Tarefa 
        </Button>
      </Form>
      </>
    );
  }


