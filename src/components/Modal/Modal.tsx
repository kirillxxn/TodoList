import ReactModal from 'react-modal'
import modalStyles from './Modal.module.css'
import type { TModal } from './TypeModal'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import closeModalBtn from '../../assets/icons/icon-close-modal.svg'
import DeadlineIcon from '../../assets/icons/icon-deadline.svg'
import DateAddTodoIcon from '../../assets/icons/icon-date-add-todo.svg'
import DateAddTodoIconDone from '../../assets/icons/icon-date-add-todo-done.svg'
import { formatDateNoTime, formatDateText } from '../../utils/config/formatDate'
import welcomeCache from '../../assets/icons/icon-cache.svg'
import welcomeData from '../../assets/icons/icon-data.svg'
import welcomeExport from '../../assets/icons/icon-export.svg'
import welcomeSync from '../../assets/icons/icon-synchronization.svg'
import welcomeLocal from '../../assets/icons/icon-local.svg'
const Modal = forwardRef<TModal>((_, ref) => {
	const [welcomeModal, setWelcomeModal] = useState<boolean>(true)
	const [isClosing, setIsClosing] = useState<boolean>(false)
	const [isOpening, setIsOpening] = useState<boolean>(false)
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
	const [modalTitle, setModalTitle] = useState<string>('')
	const [modalCompletedAt, setModalCompletedAt] = useState<Date | null>(null)
	const [modalCreatedAt, setModalCreatedAt] = useState<Date | null>(null)
	const [modalDeadlineDate, setModalDeadlineDate] = useState<string | null>('')
	const [modalDeadlineTime, setModalDeadlineTime] = useState<string | null>('')
	const [isCompleted, setIsCompleted] = useState<boolean>(false)

	useEffect(() => {
		if (modalIsOpen) {
			const timeout = setTimeout(() => setIsOpening(true), 10)
			return () => clearTimeout(timeout)
		} else {
			setIsOpening(false)
		}
	}, [modalIsOpen])

	useEffect(() => {
		const hasSeenWarning = localStorage.getItem('hasSeenTodoWarning')
		if (!hasSeenWarning) {
			const timer = setTimeout(() => {
				openWelcomeModal()
				localStorage.setItem('hasSeenTodoWarning', 'true')
			}, 100)
			return () => clearTimeout(timer)
		}
	}, [])

	const closeModal = () => {
		document.body.style.overflow = ''
		setIsOpening(false)
		setIsClosing(true)
		setTimeout(() => {
			setModalIsOpen(false)
			setIsClosing(false)
			setWelcomeModal(false)
		}, 300)
		setModalTitle('')
		setModalDeadlineDate('')
		setModalDeadlineTime('')
		setModalCompletedAt(null)
		setModalCreatedAt(null)
		setIsCompleted(false)
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
			setModalCompletedAt(completedAt)
			setIsCompleted(true)
		}
		if (createdAt) {
			setModalCreatedAt(createdAt)
		}
		if (deadlineDate) {
			setModalDeadlineDate(deadlineDate)
			setModalDeadlineTime(deadlineTime || null)
		}

		document.body.style.overflow = 'hidden'
		setModalIsOpen(true)
		setIsClosing(false)
	}
	const openWelcomeModal = () => {
		setModalTitle('')
		setModalDeadlineDate('')
		setModalDeadlineTime('')
		setModalCompletedAt(null)
		setModalCreatedAt(null)
		setIsCompleted(false)
		setWelcomeModal(true)
		setModalTitle('Важная информация')
		setModalCreatedAt(null)
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
					${modalStyles['modal__overlay']} 
					${isOpening ? modalStyles['modal__overlay--active'] : ''}
					${isClosing ? modalStyles['modal__overlay--closing'] : ''}
				`}
				className={`
					${modalStyles['modal__content']} 
					${
						isCompleted
							? modalStyles['modal__content--completed']
							: modalStyles['modal__content--active']
					}
					${isOpening ? modalStyles['modal__content--opening'] : ''}
					${isClosing ? modalStyles['modal__content--closing'] : ''}
				`}
				closeTimeoutMS={300}
				ariaHideApp={true}
				contentLabel={`Задача: ${modalTitle}`}
			>
				<button
					className={modalStyles['modal__close-button']}
					onClick={closeModal}
				>
					<img
						className={modalStyles['modal__close-icon']}
						src={closeModalBtn}
						alt='Закрыть окно'
					/>
				</button>

				<div className={modalStyles['modal__container']}>
					<h2
						className={`
						${modalStyles['modal__title']}
						${isCompleted ? modalStyles['modal__title--completed'] : ''}
					`}
					>
						{modalTitle}
					</h2>

					<div className={modalStyles['modal__info']}>
						{modalDeadlineDate && (
							<div
								className={`
								${modalStyles['modal__deadline']}
								${isCompleted ? modalStyles['modal__deadline--hidden'] : ''}
							`}
							>
								<img
									src={DeadlineIcon}
									className={modalStyles['modal__deadline-icon']}
									alt='Дедлайн'
								/>
								<span className={modalStyles['modal__deadline-text']}>
									Выполнить до:{' '}
									<span className={modalStyles['modal__deadline-date']}>
										{formatDateNoTime(modalDeadlineDate)}
										{modalDeadlineTime && ` | ${modalDeadlineTime}`}
									</span>
								</span>
							</div>
						)}

						<div className={modalStyles['modal__date-info']}>
							{isCompleted && modalCompletedAt ? (
								<>
									<img
										src={DateAddTodoIconDone}
										className={modalStyles['modal__date-icon']}
										alt='Выполнено'
									/>
									<span className={modalStyles['modal__date-text--completed']}>
										Выполнено: {formatDateText(modalCompletedAt)}
									</span>
								</>
							) : modalCreatedAt ? (
								<>
									<img
										src={DateAddTodoIcon}
										className={modalStyles['modal__date-icon']}
										alt='Добавлено'
									/>
									<span>Дата добавления: {formatDateText(modalCreatedAt)}</span>
								</>
							) : null}
						</div>
					</div>
				</div>

				{welcomeModal && (
					<div className={modalStyles['welcome__modal-container']}>
						<ul className={modalStyles['welcome__list']}>
							<li className={modalStyles['welcome__item']}>
								<img
									className={modalStyles['welcome__icon']}
									src={welcomeLocal}
									alt='Иконка локального хранилища'
								/>
								Это локальное ToDo-приложение
							</li>
							<li className={modalStyles['welcome__item']}>
								<img
									className={modalStyles['welcome__icon']}
									src={welcomeData}
									alt='Иконка данных'
								/>
								Данные хранятся только в этом браузере
							</li>
							<li className={modalStyles['welcome__item']}>
								<img
									className={modalStyles['welcome__icon']}
									src={welcomeSync}
									alt='Иконка синхронизации'
								/>
								Не синхронизируются между устройствами
							</li>
							<li className={modalStyles['welcome__item']}>
								<img
									className={modalStyles['welcome__icon']}
									src={welcomeCache}
									alt='Иконка очистки истории браузера'
								/>
								Очистятся при удалении истории браузера
							</li>
							<li className={modalStyles['welcome__item']}>
								<img
									className={modalStyles['welcome__icon']}
									src={welcomeExport}
									alt='Иконка экспорта данных'
								/>
								Для постоянного хранения рекомендуем экспортировать задачи
							</li>
						</ul>
						<button
							onClick={closeModal}
							className={modalStyles['welcome__btn']}
						>
							<span className={modalStyles['welcome__btn-text']}>
								Я понял(а) спасибо
							</span>
						</button>
					</div>
				)}
			</ReactModal>
		</>
	)
})

export default Modal
