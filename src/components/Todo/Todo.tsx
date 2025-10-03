import styles from './Todo.module.css'
import AddTodoIcon from '..//..//assets/icons/icon-add-todo.png'
import DeleteTodoIcon from '..//..//assets/icons/icon-delete-todo.png'
import { useToDoStore } from '../../data/stores/useToDoStore'
import { useState } from 'react'
import { Flip, toast } from 'react-toastify'

const Todo = () => {
	const { tasks, addTodo, removeTodo } = useToDoStore()
	const [inputValue, setInputValue] = useState('')
	const handleAddTodo = () => {
		if (inputValue.trim()) {
			addTodo(inputValue)
			setInputValue('')
			toast.success('Добавлено', {
				position: 'top-right',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: 'dark',
				transition: Flip,
			})
		}
	}
	const handleDeleteTodo = (id: string) => {
		removeTodo(id)
		toast.info('Удалено', {
			position: 'top-right',
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Flip,
		})
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
								<li className={styles['todo__item']} key={item.id}>
									<h3 className={styles['todo__item-title']}>{item.title}</h3>
									<p className={styles['todo__item-word']}>
										{formatDate(item.createdAt)}
									</p>
									<button
										className={styles['todo__item-btn-delete']}
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
