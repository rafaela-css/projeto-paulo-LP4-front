import * as yup from "yup";

export type CreateTaskForm = {
  title: string;
  description: string;
  completed: boolean;
};

export const TaskFormValidationsSchema = yup.object({
  completed: yup.boolean(),
  title: yup.string().required("Este campo é obrigatório."),
  description: yup.string().required("Este campo é obrigatório."),
});
