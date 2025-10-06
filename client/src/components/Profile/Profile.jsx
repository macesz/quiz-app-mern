import { useState } from "react";
import "./Profile.css"
import Form from "../Form";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal.jsx";
import { deleteUserProfile, fetchAndUpdateUser } from "../../apis.js";
import { validateFormData } from "../../utils.js";
import Loading from "../Loading/Loading.jsx";
import InfoModal from "../Modals/InfoModal.jsx"
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const { user, updateUser, removeUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user.username,
    password: "",
    email: user.email,
  });
  const [editMode, setEditMode] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorModalText, setErrorModalText] = useState({
    title: "ERROR",
    message: ""
  });

  const navigate = useNavigate();

  const createChangeHandler = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const formDataErrors = validateFormData(formData);
    if (Object.keys(formDataErrors).length !== 0) {
      setErrors(formDataErrors);
      return;
    }

    try {
      setLoading(true);
      await handleUpdateUser();
    } catch (error) {
      console.error(error);
      setErrorModalText({
        title: "ERROR",
        message: error.message || "Something went wrong. Please try again."
      });
      setHasError(true);
      if (error.status === 401) {
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    const headers = setHeaders();

    const updateData = { username: formData.username, email: formData.email };
    if (formData.password) {
      updateData.password = formData.password;
    }

    const response = await fetchAndUpdateUser(headers, updateData);
    const { refreshedToken, user } = response;

    localStorage.setItem("token", refreshedToken);
    updateUser(user);
    setEditMode(false);
  }

  const setHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please sign in.");
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    return headers;
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      const headers = setHeaders();
      const data = await deleteUserProfile(headers);
      setDeleteMessage(data.message);
      removeUser(null);
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error("Failed to delete profile", error);
      setErrorModalText({
        title: "ERROR",
        message: error.message || "Something went wrong. Please try again."
      });
      setHasError(true);
      if (error.status === 401) {
        navigate("/signin");
      }
    } finally {
      setLoading(false)
    }
  };

  if (loading) return <Loading />

  return (
    <>
      <div className="form">
        <h2>Your profile:</h2>
        {deleteMessage ? (
          <p>{deleteMessage}</p>
        ) : editMode ? (
          <Form handleSubmit={handleSaveEdit}
            formData={formData}
            onChangeHandler={createChangeHandler}
            onCancel={() => navigate("/home")}
            errors={errors}
          />
        ) : (
          <div>
            <h3>Username: {formData.username}</h3>
            <h3>Email: {formData.email}</h3>
            <button className="button" onClick={() => setEditMode(true)}>Edit</button>
            <button className="button" onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
            <button className="button" onClick={() => navigate("/home")}>Back</button>
          </div>
        )}
      </div>
      {hasError && (
        <InfoModal
          onClose={() => setHasError(false)}
          modalText={errorModalText}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          openModal={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
export default Profile;
