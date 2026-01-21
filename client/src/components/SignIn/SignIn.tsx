import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSignInUser } from '../../Services/apiService';
import Loading from '../Loading/Loading';
import InfoModal from '../Modals/InfoModal';
import { useAuth } from '../../context/AuthContext';
import { ISignInBody, ISignUpBody } from '../../interfaces/IUserRequest';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<ISignInBody>({
    username: '',
    password: ''
  });
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [errorModalText, setErrorModalText] = useState({
    title: "ERROR",
    message: ""
  });
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  //use ISignUpBody to expects to potentially talk about email in the change handler, as the in the Form component the email field may be present, as it handles both sign-in and sign-up forms
  const createChangeHandler = (field: keyof ISignUpBody) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await fetchSignInUser(formData);
      const { token, user } = data;

      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/home");
    } catch (error: any) {
      console.error(error);
      setErrorModalText({
        title: "ERROR",
        message: error.response?.data?.message || error.message || "Something went wrong."      });
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