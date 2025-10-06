import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSignInUser } from '../../apis.js';
import Loading from '../Loading/Loading.jsx';
import InfoModal from '../Modals/InfoModal.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [hasError, setHasError] = useState(false);
  const [errorModalText, setErrorModalText] = useState({
    title: "ERROR",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const createChangeHandler = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await fetchSignInUser(formData);
      const { token, user } = data;

      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setErrorModalText({
        title: "ERROR",
        message: error.message || "Something went wrong. Please try again."
      });
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={createChangeHandler("username")}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={createChangeHandler("password")}
            required
          />

          <button className="button" type="submit">Sign In</button>

          <p>
            Do not have an account?{" "}
            <button className="button" onClick={() => navigate("/signup")}>Sign up</button>
          </p>
        </form>
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

export default SignIn;