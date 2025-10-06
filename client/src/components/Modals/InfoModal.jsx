import "./Modal.css"

const InfoModal = ( { onClose, modalText}) => {

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