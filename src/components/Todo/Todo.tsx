import styles from './Todo.module.css'
import AddTodoIcon from '..//..//assets/icons/icon-add-todo.png'
import DeleteTodoIcon from '..//..//assets/icons/icon-delete-todo.svg'
import DoneTodoIcon from '..//..//assets/icons/icon-done-todo.svg'
import { useToDoStore } from '../../data/stores/useToDoStore'
import { useState } from 'react'
import { Flip, toast, type ToastTransition } from 'react-toastify'

const Todo = () => {
	const { tasks, addTodo, removeTodo, toggleTodo } = useToDoStore()
	const [inputValue, setInputValue] = useState('')
	type TToast = {
		autoClose: number
		hideProgressBar: boolean
		closeOnClick: boolean
		pauseOnHover: boolean
		draggable: boolean
		progress: undefined
		theme: string
		transition: ToastTransition
	}
	const toastConfig: TToast = {
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: 'dark',
		transition: Flip,
	}
	const handleAddTodo = () => {
		if (inputValue.trim()) {
			addTodo(inputValue)
			setInputValue('')
			toast.success('Добавлено', toastConfig)
		}
	}
	const handleDeleteTodo = (id: string) => {
		removeTodo(id)
		toast.info('Удалено', toastConfig)
	}
	const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAddTodo()
		}
	}
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}
	return (
		<>
			<div className={styles['container']}>
				<h1 className={styles['container-title']}>Todo</h1>
				<h2 className={styles['container-subtitle']}>list</h2>
				<section className={styles['section-todolist']}>
					<div className={styles['todolist-add-todo']}>
						<input
							className={styles['todo-input']}
							type='text'
							placeholder='Add todo'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							onKeyDown={handleEnterPress}
						/>
						<button onClick={handleAddTodo} className={styles['todo-button']}>
							<img
								className={styles['todo-button-icon']}
								src={AddTodoIcon}
								alt='Иконка добавления задачи'
							/>
						</button>
					</div>
					<div className={styles['todo']}>
						<ul className={styles['todo__list']}>
							{tasks.map(item => (
								<li
									className={`${styles['todo__item']} ${
										styles[item.completed ? 'completed' : 'uncompleted']
									}`}
									key={item.id}
								>
									<button
										className={`${styles['item__btn']} ${
											styles[
												item.completed
													? 'btn__done-completed'
													: 'todo__item-btn-done'
											]
										}`}
										onClick={() => toggleTodo(item.id)}
									>
										<img
											className={styles['btn__done-icon']}
											src={DoneTodoIcon}
											alt='Иконка выполненной задачи'
										/>
									</button>
									<div className={styles['todo__item-word-container']}>
										<h3
											className={`${styles['word__container-title']} ${
												styles[item.completed ? 'title-completed' : '']
											}`}
										>
											{item.title}
										</h3>
										<p className={styles['word__container-date']}>
											{item.completed
												? `Выполнено ${
														item.completedAt ? formatDate(item.completedAt) : ''
												  }`
												: `Дата добавления: ${formatDate(item.createdAt)}`}
										</p>
									</div>
									<button
										className={`${styles['item__btn']} ${styles['todo__item-btn-delete']}`}
										onClick={() => handleDeleteTodo(item.id)}
									>
										<img
											className={styles['btn__delete-icon']}
											src={DeleteTodoIcon}
											alt=''
										/>
									</button>
								</li>
							))}
						</ul>
					</div>
				</section>
			</div>
		</>
	)
}
export default Todo
