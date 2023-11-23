import { createContext, ReactNode, useContext, useState } from "react";
import ITasks from "../types/ITasks";
import { Api } from "../services/api";

export function useTasks() {
	const contextoTasks = useContext(TasksContext);
	return contextoTasks;
}

interface TaskProviderProps {
	children: ReactNode;
}

export interface TasksContext {
	pegaTasks: () => void;
	todosOsTasks: ITasks[];
	setTodosOsTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
}

const TasksContext = createContext({} as TasksContext);
TasksContext.displayName = "Tasks Context";

export function TasksProvider({ children }: TaskProviderProps) {
	const [todosOsTasks, setTodosOsTasks] = useState<ITasks[]>([]);

	async function pegaTasks() {
		return new Promise(() => {
			Api.get<ITasks[]>("/tasks")
				.then((resposta: any) => {
					setTodosOsTasks(resposta.data.data);
				})
				.catch((error: any) => {
					console.log(error);
				});
		});
	}

	return (
		<TasksContext.Provider
			value={{
				pegaTasks,
				todosOsTasks,
				setTodosOsTasks
			}}
		>
			{children}
		</TasksContext.Provider>
	);
}