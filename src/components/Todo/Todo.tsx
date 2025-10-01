import styles from './Todo.module.css'
import AddTodoIcon from '..//..//assets/icons/icon-add-todo.png'
import { useToDoStore } from '../../data/stores/useToDoStore'
import { useState } from 'react'
const Todo = () => {
	const { tasks, addTodo, removeTodo } = useToDoStore()
	const [inputValue, setInputValue] = useState('')
	const handleAddTodo = () => {
		if (inputValue.trim()) {
			addTodo(inputValue)
			setInputValue('')
		}
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
						/>
						<button onClick={handleAddTodo} className={styles['todo-button']}>
							<img
								className={styles['todo-button-icon']}
								src={AddTodoIcon}
								alt='Иконка добавления задачи'
							/>
						</button>
					</div>
					<div className={styles['todolist']}>
						<ul>
							{tasks.map(item => (
								<li key={item.id}>
									<h3>{item.title}</h3>
									<p>{item.createdAt}</p>
									<button onClick={() => removeTodo(item.id)}>del</button>
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
