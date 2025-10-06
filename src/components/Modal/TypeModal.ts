export type TModal = {
	closeModal: () => void
	openModal: (
		title?: string,
		completedAt?: Date | null,
		createdAt?: Date | null
	) => void
	isClosing: boolean
	isOpening: boolean
	modalIsOpen: boolean
}
