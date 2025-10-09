import ReactModal from 'react-modal'
import modalStyles from './Modal.module.css'
import type { TModal } from './TypeModal'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import closeModalBtn from '..//..//assets/icons/icon-close-modal.svg'
import { formatDateText, formatDate } from '../../utils/config/formatDate'
const Modal = forwardRef<TModal>((_, ref) => {
	const [isClosing, setIsClosing] = useState(false)
	const [isOpening, setIsOpening] = useState(false)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalDate, setModalDate] = useState<Date | null>(null)
	const [modalDeadline, setModalDeadline] = useState<string | null>('')
	const [modalTextData, setModalTextData] = useState('')
	const [modalTextDeadline, setModalTextDeadline] = useState('')

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
		setModalDeadline('')
		setModalDate(null)
	}
	{
		/* Открытие модального окна */
	}
	const openModal = (
		title?: string,
		completedAt?: Date | null,
		createdAt?: Date | null,
		deadlineDate?: string | null,
		deadlineTime?: string | null
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
		if (deadlineDate) {
			let deadlineString = deadlineDate
			if (deadlineTime) {
				deadlineString = `${deadlineDate} ${deadlineTime}`
			}
			setModalDeadline(deadlineString)
			setModalTextDeadline('Выполнить до:')
		} else {
			setModalDeadline(null)
			setModalTextDeadline('')
		}

		document.body.style.overflow = 'hidden'
		setModalIsOpen(true)
		setIsClosing(false)
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
					{modalDeadline && (
						<p
							className={modalStyles['container-date']}
						>{`${modalTextDeadline} ${formatDate(modalDeadline)}`}</p>
					)}
					{modalDate && (
						<p
							className={modalStyles['container-date']}
						>{`${modalTextData}  ${formatDateText(modalDate)}`}</p>
					)}
				</div>
			</ReactModal>
		</>
	)
})
export default Modal
