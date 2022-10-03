import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  isGuest: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const toggleGuest = () => {
    setValues({ ...values, isGuest: !values.isGuest });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember, isGuest } = values;

    if (isGuest) {
      const currentUser = {
        name: "Guest",
        email: "guest@example.com",
        password: process.env.GUEST_PASSWORD,
      };
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Proceeding as Guest...",
      });
    } else {
      if (!email || !password || (!isMember && !name)) {
        displayAlert();
        return;
      }
      const currentUser = { name, email, password };

      if (isMember) {
        setupUser({
          currentUser,
          endPoint: "login",
          alertText: "Login Successful! Redirecting...",
        });
      } else {
        setupUser({
          currentUser,
          endPoint: "register",
          alertText: "Register Successful! Redirecting...",
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* Name Input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email Input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* Password Input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
          <span>
            or
            <button
              onClick={toggleGuest}
              className="guest-btn"
              disabled={isLoading}>
              Continue as Guest
            </button>
          </span>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    width: 300px;
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  span {
    display: block;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn,
  .guest-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
