import styles from './Todo.module.css'
import '..//..//assets/fonts/fonts.css'
import AddTodoIcon from '..//..//assets/icons/icon-add-todo.svg'
import DeleteTodoIcon from '..//..//assets/icons/icon-delete-todo.svg'
import DoneTodoIcon from '..//..//assets/icons/icon-done-todo.svg'
import { useToDoStore } from '../../data/stores/useToDoStore'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../Modal/Modal'
import type { TModal } from '../Modal/TypeModal'
import { toastConfig } from '../../utils/config/toast'
import { formatDate, formatDateNoTime } from '../../utils/config/formatDate'

const Todo = () => {
	/* Рефы */
	const modalRef = useRef<TModal>(null)

	/* Store */
	const { tasks, addTodo, removeTodo, toggleTodo } = useToDoStore()

	/* Состояния */
	const [inputValue, setInputValue] = useState('')
	const [inputDateValue, setInputDateValue] = useState('')
	const [inputTimeValue, setInputTimeValue] = useState('')

	/* Функции Todo */
	const handleAddTodo = () => {
		if (inputValue.trim()) {
			addTodo(inputValue, inputDateValue, inputTimeValue)
			setInputDateValue('')
			setInputTimeValue('')
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

	/* Сортировка задач */
	const sortTasks = tasks.sort((a, b) => {
		if (a.completed === b.completed) {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		}
		return a.completed ? 1 : -1
	})

	/* Контент */
	return (
		<>
			<div className={styles['container']}>
				<h1 className={styles['container-title']}>ToDo</h1>
				<h2 className={styles['container-subtitle']}>list</h2>
				<section className={styles['section-todolist']}>
					<div className={styles['todolist-add-todo']}>
						<div className={styles['add__todo-input-btn']}>
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
						<div className={styles['add__todo_date-container']}>
							<label htmlFor='date'>Выполнить до:</label>
							<input
								className={styles['todo-input-date']}
								type='date'
								name='date'
								value={inputDateValue}
								id='date'
								onChange={e => setInputDateValue(e.target.value)}
							/>
							<input
								className={styles['todo-input-date']}
								type='time'
								value={inputTimeValue}
								onChange={e => setInputTimeValue(e.target.value)}
							/>
						</div>
					</div>
					<div className={styles['todo']}>
						<ul className={styles['todo__list']}>
							{sortTasks.map(item => (
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
										<button
											onClick={() =>
												modalRef.current?.openModal(
													item.title,
													item.completedAt || null,
													item.createdAt
												)
											}
											aria-label='Открыть задачу'
											className={styles['word__container-btn-modal']}
										>
											<h3
												title='Посмотреть полностью'
												className={`${styles['word__container-title']} ${
													styles[item.completed ? 'title-completed' : '']
												}`}
											>
												{item.title}
											</h3>
											{item.deadlineDate && (
												<p
													className={`${styles['word-container-deadline']} ${
														styles[item.completed ? 'deadline-done' : '']
													}`}
												>
													Выполнить до: {''}
													<span className={styles['container__deadline-word']}>
														{formatDateNoTime(item.deadlineDate)}
														{item.deadlineTime && ` в ${item.deadlineTime}`}
													</span>
												</p>
											)}
											<p className={styles['word__container-date']}>
												{item.completed
													? `Выполнено ${
															item.completedAt
																? formatDate(item.completedAt)
																: ''
													  }`
													: `Дата добавления: ${formatDate(item.createdAt)}`}
											</p>
										</button>
									</div>
									<button
										className={`${styles['item__btn']} ${styles['todo__item-btn-delete']}`}
										onClick={() => handleDeleteTodo(item.id)}
									>
										<img
											className={styles['btn__delete-icon']}
											src={DeleteTodoIcon}
											alt='Иконка удаления задачи'
										/>
									</button>
								</li>
							))}
						</ul>
					</div>
				</section>
			</div>
			<Modal ref={modalRef} />
		</>
	)
}
export default Todo
