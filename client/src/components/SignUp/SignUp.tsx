import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import { fetchSignUpUser } from "../../Services/apiService";
import { FormErrors, validateFormData } from "../../Services/utils";
import Loading from "../Loading/Loading";
import InfoModal from "../Modals/InfoModal";
import { ISignUpBody } from "../../../../server/src/controllers/interfaces/IUserRequest";


const SignUp: React.FC = () => {
const [formData, setFormData] = useState<ISignUpBody>({
    email: '',
    username: '',
    password: ''
  });
  const [formDataErrors, setFormDataErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorModalText, setErrorModalText] = useState({
    title: "ERROR",
    message: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataErrors = validateFormData(formData);
    if (Object.keys(formDataErrors).length !== 0) {
      setFormDataErrors(formDataErrors);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchSignUpUser(formData);
      console.log(data.message);
      navigate('/signin')
    } catch (error: any) {
      console.error('Error signing up:', error);
      setErrorModalText({
        title: "ERROR",
        message: error.response?.data?.message || error.message || "Something went wrong." });
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const createChangeHandler = (field: keyof ISignUpBody) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) return <Loading />

  return (
    <>
      <div className="form">
        <h2>Sign Up</h2>
        <Form
          handleSubmit={handleSubmit}
          formData={formData}
          onChangeHandler={createChangeHandler}
          onCancel={handleCancel}
          errors={formDataErrors}
        />
        <p className="form-link">
          Already have an account?{" "}
          <button className="button" onClick={() => navigate("/signin")}>Sign In</button>
        </p>
      </div>
      {hasError && (
        <InfoModal
          onClose={() => setHasError(false)}
          modalText={errorModalText}
        />
      )}
    </>
  );
};

export default SignUp;