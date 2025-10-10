import { create } from 'zustand'
import { generateId } from '../../utils/GenId'
import { persist } from 'zustand/middleware'
export type Task = {
	id: string
	title: string
	createdAt: Date
	completed: boolean
	completedAt?: Date | null
	deadlineDate?: string | null
	deadlineTime?: string | null
}

export type TTodoList = {
	tasks: Task[]
	addTodo: (
		title: string,
		deadlineDate?: string | null,
		deadlineTime?: string | null
	) => void
	removeTodo: (id: string) => void
	toggleTodo: (id: string) => void
}

export const useToDoStore = create<TTodoList>()(
	persist(
		(set, get) => ({
			tasks: [],
			addTodo: (
				title: string,
				deadlineDate?: string | null,
				deadlineTime?: string | null
			) => {
				const { tasks } = get()
				const formattedTitle =
					title.trim().charAt(0).toUpperCase() + title.trim().slice(1)

				const newTask: Task = {
					id: generateId(),
					title: formattedTitle,
					createdAt: new Date(),
					completed: false,
					completedAt: null,
					deadlineDate: deadlineDate || null,
					deadlineTime: deadlineTime || null,
				}
				set({
					tasks: [newTask, ...tasks],
				})
			},
			removeTodo: id => {
				const { tasks } = get()
				set({ tasks: tasks.filter(task => task.id !== id) })
			},
			toggleTodo: id => {
				const { tasks } = get()
				set({
					tasks: tasks.map(task =>
						task.id === id
							? {
									...task,
									completed: !task.completed,
									completedAt: !task.completed ? new Date() : null,
							  }
							: task
					),
				})
			},
		}),
		{ name: 'tasks-storage' }
	)
)
