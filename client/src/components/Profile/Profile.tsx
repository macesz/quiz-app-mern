import React, { useState } from "react";
import "./Profile.css"
import Form from "../Form.js";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal.js";
import { deleteUserProfile, fetchAndUpdateUser } from "../../Services/apiService";
import { FormErrors, validateFormData } from "../../Services/utils";
import Loading from "../Loading/Loading";
import InfoModal from "../Modals/InfoModal"
import { useAuth } from "../../context/AuthContext";
import { ISignUpBody, IUpdateUserBody } from "../../interfaces/IUserRequest";

const Profile: React.FC = () => {
  const { user, updateUser, removeUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin");
    return null;
  }


  const [formData, setFormData] = useState<ISignUpBody>({
    username: user.username,
    password: "",
    email: user.email,
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorModalText, setErrorModalText] = useState({
    title: "ERROR",
    message: ""
  });


  const createChangeHandler = (field: keyof ISignUpBody) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataErrors = validateFormData(formData);
    if (Object.keys(formDataErrors).length !== 0) {
      setErrors(formDataErrors);
      return;
    }

    try {
      setLoading(true);
      await handleUpdateUserAction();
    } catch (error: any) {
      console.error(error);
      setErrorModalText({
        title: "ERROR",
        message: error.response?.data?.message || error.message || "Something went wrong."      });
      setHasError(true);
      if (error.status === 401) {
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  

  const handleUpdateUserAction = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found, please sign in.");

    // Prepare update body based on our interface
    const updateData: IUpdateUserBody = { 
        username: formData.username, 
        email: formData.email 
    };
    
    if (formData.password) {
      updateData.password = formData.password;
    }

    // Call the Axios service
    const response = await fetchAndUpdateUser(token, updateData);
    const { refreshedToken, user: updatedUser } = response;

    localStorage.setItem("token", refreshedToken);
    updateUser(updatedUser);
    setEditMode(false);
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found.");

      setLoading(true);

      const data = await deleteUserProfile(token);
      setDeleteMessage(data.message);
      removeUser();
      localStorage.removeItem('token');
      navigate('/');
    } catch (error: any) {
      console.error("Failed to delete profile", error);
      setErrorModalText({
        title: "ERROR",
        message: error.response?.data?.message || "Something went wrong. Please try again."
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
