import styles from './Todo.module.css'
import '../../assets/fonts/fonts.css'
import AddTodoIcon from '../../assets/icons/icon-add-todo.svg'
import ReturnTodoIcon from '../../assets/icons/icon-return-todo.svg'
import DeleteTodoIcon from '../../assets/icons/icon-delete-todo.svg'
import DoneTodoIcon from '../../assets/icons/icon-done-todo.svg'
import DeadlineIcon from '../../assets/icons/icon-deadline.svg'
import DateAddTodoIcon from '../../assets/icons/icon-date-add-todo.svg'
import DateAddTodoIconDone from '../../assets/icons/icon-date-add-todo-done.svg'
import { useToDoStore } from '../../data/stores/useToDoStore'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../Modal/Modal'
import type { TModal } from '../Modal/TypeModal'
import { toastConfig } from '../../utils/config/toast'
import { formatDateNoTime, formatDateText } from '../../utils/config/formatDate'

const Todo = () => {
	const modalRef = useRef<TModal>(null)
	const { tasks, addTodo, removeTodo, toggleTodo } = useToDoStore()

	const [inputValue, setInputValue] = useState('')
	const [inputDateValue, setInputDateValue] = useState('')
	const [inputTimeValue, setInputTimeValue] = useState('')

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

	const sortedTasks = tasks.sort((a, b) => {
		if (a.completed === b.completed) {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		}
		return a.completed ? 1 : -1
	})

	return (
		<>
			<div className={styles['todo']}>
				<div className={styles['todo__header']}>
					<h1 className={styles['todo__title']}>ToDo</h1>
					<h2 className={styles['todo__subtitle']}>list</h2>
				</div>

				<section className={styles['todo__section']}>
					<div className={styles['todo__form']}>
						<div className={styles['todo__input-group']}>
							<input
								className={styles['todo__input']}
								type='text'
								placeholder='Add todo'
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								onKeyDown={handleEnterPress}
							/>
							<button
								onClick={handleAddTodo}
								className={styles['todo__add-button']}
							>
								<img
									className={styles['todo__add-icon']}
									src={AddTodoIcon}
									alt='Добавить задачу'
								/>
							</button>
						</div>

						<div className={styles['todo__date-group']}>
							<label htmlFor='date' className={styles['todo__label']}>
								Выполнить до:
							</label>
							<input
								className={styles['todo__date-input']}
								type='date'
								name='date'
								value={inputDateValue}
								id='date'
								onChange={e => setInputDateValue(e.target.value)}
							/>
							<input
								className={styles['todo__date-input']}
								type='time'
								value={inputTimeValue}
								onChange={e => setInputTimeValue(e.target.value)}
							/>
						</div>
					</div>

					<div className={styles['todo__content']}>
						{tasks.length === 0 ? (
							<div className={styles['todo__empty']}>
								<span className={styles['todo__empty-text']}>Нет задач</span>
							</div>
						) : (
							<ul className={styles['todo__list']}>
								{sortedTasks.map(item => (
									<li
										className={`${styles['todo__item']} ${
											styles[
												`todo__item--${item.completed ? 'completed' : 'active'}`
											]
										}`}
										key={item.id}
									>
										<button
											className={`${styles['todo__action-button']} ${styles['todo__action-button--done']}`}
											onClick={() => toggleTodo(item.id)}
										>
											<img
												className={styles['todo__action-icon']}
												src={item.completed ? ReturnTodoIcon : DoneTodoIcon}
												alt={
													item.completed ? 'Вернуть задачу' : 'Выполнить задачу'
												}
											/>
										</button>

										<div className={styles['todo__item-content']}>
											<button
												onClick={() =>
													modalRef.current?.openModal(
														item.title,
														item.completedAt || null,
														item.createdAt,
														item.deadlineDate || null,
														item.deadlineTime || null
													)
												}
												aria-label='Открыть задачу'
												className={styles['todo__content-button']}
											>
												<h3
													className={`${styles['todo__item-title']} ${
														item.completed
															? styles['todo__item-title--completed']
															: ''
													}`}
												>
													{item.title}
												</h3>

												{item.deadlineDate && (
													<p
														className={`${styles['todo__deadline']} ${
															item.completed
																? styles['todo__deadline--hidden']
																: ''
														}`}
													>
														<img
															src={DeadlineIcon}
															className={styles['todo__deadline-icon']}
															alt='Дедлайн'
														/>
														Выполнить до: {''}
														<span className={styles['todo__deadline-date']}>
															{formatDateNoTime(item.deadlineDate)}
															{item.deadlineTime && ` | ${item.deadlineTime}`}
														</span>
													</p>
												)}

												<p className={styles['todo__date-info']}>
													{item.completed ? (
														<>
															<img
																src={DateAddTodoIconDone}
																className={styles['todo__date-icon']}
																alt='Выполнено'
															/>
															<span
																className={styles['todo__date-text--completed']}
															>
																Выполнено: {formatDateText(item.completedAt)}
															</span>
														</>
													) : (
														<>
															<img
																src={DateAddTodoIcon}
																className={styles['todo__date-icon']}
																alt='Добавлено'
															/>
															<span>
																Дата добавления:{' '}
																{formatDateText(item.createdAt)}
															</span>
														</>
													)}
												</p>
											</button>
										</div>

										<button
											className={`${styles['todo__action-button']} ${styles['todo__action-button--delete']}`}
											onClick={() => handleDeleteTodo(item.id)}
										>
											<img
												className={styles['todo__action-icon']}
												src={DeleteTodoIcon}
												alt='Удалить задачу'
											/>
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</section>
			</div>
			<Modal ref={modalRef} />
		</>
	)
}

export default Todo
