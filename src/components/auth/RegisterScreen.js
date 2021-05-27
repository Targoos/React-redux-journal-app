import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startRegisterNameEmailPassword } from "../../actions/authAction";
import { removeError, setError } from "../../actions/uiAction";
import { isFormValid } from "../../helpers";
import { useForm } from "../../hooks/userForm";

export const RegisterScreen = () => {
  const [registerForm, setField, reset] = useForm({
    name: "Tulio",
    email: "tulio@tulio.com",
    password: "123456",
    password2: "123456",
  });

  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  console.log(msgError);

  const { name, email, password, password2 } = registerForm;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid(registerForm).errorStatus)
      return dispatch(setError(isFormValid(registerForm).errorMessage));
    dispatch(removeError());
    dispatch(startRegisterNameEmailPassword(name, email, password));
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={({ target: { value } }) => setField("name", value)}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={({ target: { value } }) => setField("email", value)}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={({ target: { value } }) => setField("password", value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={({ target: { value } }) => setField("password2", value)}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
