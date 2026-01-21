import "./Modal.css"
import React from "react"
import { useEffect, useRef } from "react"

interface DeleteModalProps {
    openModal: boolean;
    closeModal: () => void;
    onDelete: () => Promise<void> | void; // Can be sync or async
}

const DeleteModal: React.FC<DeleteModalProps> = ({ openModal, closeModal, onDelete }) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        
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