import { create } from 'zustand'
import { generateId } from '../GenId'
import { persist } from 'zustand/middleware'
type Task = {
	id: string
	title: string
	createdAt: Date
}

type TTodoList = {
	tasks: Task[]
	addTodo: (title: string) => void
	removeTodo: (id: string) => void
}

export const useToDoStore = create<TTodoList>()(
	persist(
		(set, get) => ({
			tasks: [],
			addTodo: title => {
				const { tasks } = get()
				const formattedTitle =
					title.trim().charAt(0).toUpperCase() +
					title.trim().slice(1).toLowerCase()

				const newTask = {
					id: generateId(),
					title: formattedTitle,
					createdAt: new Date(),
				}
				set({
					tasks: [newTask].concat(tasks),
				})
			},
			removeTodo: id => {
				const { tasks } = get()
				set({ tasks: tasks.filter(task => task.id !== id) })
			},
		}),
		{ name: 'tasks-storage' }
	)
)
