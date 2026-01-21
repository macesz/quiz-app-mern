import "./Modal.css"
import React from "react"

export interface ModalContent {
    title: string;
    message: string;
}

interface InfoModalProps {
    onClose: () => void;
    modalText: ModalContent;
}

const InfoModal: React.FC<InfoModalProps> = ( { onClose, modalText}) => {

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{modalText.title}</h2>
                <p>{modalText.message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default InfoModal;