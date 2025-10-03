import './App.css'
import Todo from './components/Todo/Todo'
import { Flip, ToastContainer } from 'react-toastify'
function App() {
	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme='dark'
				transition={Flip}
			/>
			<Todo />
		</>
	)
}

export default App
