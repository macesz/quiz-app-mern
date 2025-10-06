import "./Modal.css"
import { useEffect, useRef } from "react"

const DeleteModal = ({ openModal, closeModal, onDelete }) => {
    const ref = useRef();

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal])


    const handleDelete = () => {
        onDelete();
        closeModal()
    }

    return (
        <div className="modal-backdrop">
        <dialog className="modal-content"
            ref={ref}
            onCancel={() => closeModal()}>
            <h3>Are you sure you want to delete this user?</h3>

            <button onClick={() => closeModal()}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>

        </dialog>
        </div>
    )

}

export default DeleteModal;