import { create } from 'zustand'
import { generateId } from '../GenId'
type Task = {
	id: string
	title: string
	createdAt: number
}

type TTodoList = {
	tasks: Task[]
	addTodo: (title: string) => void
	removeTodo: (id: string) => void
}

export const useToDoStore = create<TTodoList>((set, get) => ({
	tasks: [],
	addTodo: title => {
		const { tasks } = get()
		const newTask = {
			id: generateId(),
			title,
			createdAt: Date.now(),
		}
		set({
			tasks: [newTask].concat(tasks),
		})
	},
	removeTodo: id => {
		const { tasks } = get()
		set({ tasks: tasks.filter(task => task.id !== id) })
	},
}))
