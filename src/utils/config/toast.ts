import { Flip, type ToastTransition } from 'react-toastify'
export type TToast = {
	autoClose: number
	hideProgressBar: boolean
	closeOnClick: boolean
	pauseOnHover: boolean
	draggable: boolean
	progress: undefined
	theme: string
	transition: ToastTransition
}
export const toastConfig: TToast = {
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: false,
	draggable: true,
	progress: undefined,
	theme: 'dark',
	transition: Flip,
}
