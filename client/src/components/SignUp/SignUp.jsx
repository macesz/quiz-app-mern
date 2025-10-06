import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form";
import { fetchSignUpUser } from "../../apis";
import { validateFormData } from "../../utils";
import Loading from "../Loading/Loading.jsx";
import InfoModal from "../Modals/InfoModal.jsx";


const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [formDataErrors, setFormDataErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorModalText, setErrorModalText] = useState({
    title: "ERROR",
    message: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorModalText({
        title: "ERROR",
        message: error.message || "Something went wrong. Please try again."
      });
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const createChangeHandler = (field) => (e) => {
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