import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { email, password } = loginData;
  const passwordLength = loginData.password.length > 6;
  const navigate = useNavigate();
  const storage = {
    email: loginData.email,
  };

  const handleChange = (
    { target }: React.ChangeEvent<
    HTMLInputElement>,
  ) => {
    const { name, value } = target;
    setLoginData({ ...loginData, [name]: value });
  };

  const emailValidation = (emailData: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(emailData);
  };

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        navigate('/meals');
        localStorage.setItem('user', JSON.stringify(storage));
      } }
      className="form-container"
    >
      <div className="container-form">
        <img src="/logo.png" alt="logo" />
        <img src="/backgroundLogin.png" alt="fruits" />
        <Form.Label htmlFor="email">
          <Form.Control
            name="email"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ handleChange }
            placeholder="Email"
          />
        </Form.Label>

        <Form.Label htmlFor="password">
          <Form.Control
            name="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ handleChange }
            placeholder="Password"
          />
        </Form.Label>

        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !((passwordLength && emailValidation(loginData.email))) }
          className="btn-enter"
        >
          Enter
        </button>
      </div>
    </form>
  );
}

export default Login;
