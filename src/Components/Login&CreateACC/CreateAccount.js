import "./Log&Create.css";
import { useState } from "react";
import { validateEmail } from "./utils";
import jologo from "../../Assets/images/mylogo.png"

const PasswordErrorMessage = ({ message }) => {
  return <p className="FieldError">Password {message}</p>;
};

function CreateAccount() {
  const [message, setMessage] = useState("is strong");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  // const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    return (
      validPassword() &&
      firstName &&
      validateEmail(email) &&
      !/\d/.test(firstName) &&
      !/\d/.test(lastName) //&&
      // role !== "role"
    );
  };
  const validPassword = () => {
    if (
      password.value.length >= 8 &&
      /[A-Z]/.test(password.value) &&
      /[a-z]/.test(password.value) &&
      /\d/.test(password.value)
    ) {
      // setMessage(() => "is strong");
      return true;
    } else {
      // setMessage(
      //   () =>
      //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      // );
      return false;
    }
  };
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    // setRole("role");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created!");
    clearForm();
  };

  return (
    <div className="Main-wrapper">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <img className="my-logo"  src={jologo} alt="mylogo"/>
          <h2 className="Sign-up-header">Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First name"
            />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={password.value}
              type="password"
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value });
                validPassword()
                  ? setMessage("Strong Password")
                  : setMessage(
                      " must be at least 8 characters long & contain at least 1 uppercase letter, 1 lowercase letter, and 1 number."
                    );
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true });
              }}
              placeholder="Password"
            />
            {password.isTouched && !validPassword() ? (
              <PasswordErrorMessage message={message} />
            ) : null}
          </div>
          {/* <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div> */}
          <button className="CreateAcc-btn" type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateAccount;
