import styles from './Todo.module.css'
import AddTodoIcon from '..//..//assets/icons/icon-add-todo.png'
const Todo = () => {
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
						/>
						<button className={styles['todo-button']}>
							<img
								className={styles['todo-button-icon']}
								src={AddTodoIcon}
								alt='Иконка добавления задачи'
							/>
						</button>
					</div>
					<div className={styles['todolist']}>
						<ul>
							<li></li>
						</ul>
					</div>
				</section>
			</div>
		</>
	)
}
export default Todo
