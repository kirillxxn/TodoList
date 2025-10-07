import ReactModal from 'react-modal'
import modalStyles from './Modal.module.css'
import type { TModal } from './TypeModal'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import closeModalBtn from '..//..//assets/icons/icon-close-modal.svg'
import { formatDateText } from '../../utils/config/formatDate'
const Modal = forwardRef<TModal>((_, ref) => {
	const [isClosing, setIsClosing] = useState(false)
	const [isOpening, setIsOpening] = useState(false)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalDate, setModalDate] = useState<Date | null>(null)
	const [modalTextData, setModalTextData] = useState('')

	useEffect(() => {
		if (modalIsOpen) {
			const timeout = setTimeout(() => setIsOpening(true), 10)
			return () => clearTimeout(timeout)
		} else {
			setIsOpening(false)
		}
	}, [modalIsOpen])
	{
		/* Закрытие модального окна */
	}
	const closeModal = () => {
		document.body.style.overflow = ''
		setIsOpening(false)
		setIsClosing(true)
		setTimeout(() => {
			setModalIsOpen(false)
			setIsClosing(false)
		}, 300)
		setModalTitle('')
		setModalDate(null)
	}
	{
		/* Открытие модального окна */
	}
	const openModal = (
		title?: string,
		completedAt?: Date | null,
		createdAt?: Date | null
	) => {
		if (title) setModalTitle(title)
		if (completedAt) {
			setModalDate(completedAt)
			setModalTextData('Дата выполнения:')
		} else if (createdAt) {
			setModalDate(createdAt)
			setModalTextData('Дата добавления:')
		} else {
			setModalDate(null)
		}
		document.body.style.overflow = 'hidden'
		setModalIsOpen(true)
		setIsClosing(false)
	}
	{
		/* Передача методов внешнему компоненту */
	}
	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
		isClosing,
		isOpening,
		modalIsOpen,
	}))
	return (
		<>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				shouldCloseOnOverlayClick={true}
				shouldCloseOnEsc={true}
				overlayClassName={`
${modalStyles.modal__overlay} 
${isOpening ? modalStyles['modal__overlay--active'] : ''}
${isClosing ? modalStyles['modal__overlay--closing'] : ''}
`}
				className={`
${modalStyles.modal__content} 
${isOpening ? modalStyles['modal__content--active'] : ''}
${isClosing ? modalStyles['modal__content--closing'] : ''}
`}
				closeTimeoutMS={300}
				ariaHideApp={true}
				contentLabel={`Задача: ${modalTitle}`}
			>
				<button
					className={modalStyles['modal__btn-close']}
					onClick={() => closeModal()}
				>
					<img
						className={modalStyles['btn__close-icon']}
						src={closeModalBtn}
						alt='Иконка закрытия окна'
					/>
				</button>
				<div className={modalStyles['modal__container']}>
					<h2 className={modalStyles['container-title']}>{modalTitle}</h2>
					{modalDate && (
						<p
							className={modalStyles['container-date']}
						>{`${modalTextData} ${formatDateText(modalDate)}`}</p>
					)}
				</div>
			</ReactModal>
		</>
	)
})
export default Modal
