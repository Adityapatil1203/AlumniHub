import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const ActivateEmail = () => {
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [role, setRole] = useState(""); // State for role
  const navigate = useNavigate();
  const { isOpen, message, icon, title, showNotification, handleClose } =
    useContext(AuthContext);

  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword || !role) {
      setLoading(false);
      await showNotification(
        "All fields are required, including role.",
        "warning",
        "Warning"
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setLoading(false);
      await showNotification("Passwords do not match.", "warning", "Warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/activate-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }), // Include role in the request body
      });

      if (response.ok) {
        setLoading(false);
        await showNotification(
          "Activation email sent successfully! Please check your inbox.",
          "success",
          "Success"
        );
        navigate("/login");
      } else {
        setLoading(false);
        const errorData = await response.json();
        await showNotification(
          `Error: ${errorData.detail || "Failed to send activation email."}`,
          "error",
          "Error"
        );
      }
    } catch (error) {
      setLoading(false);
      await showNotification(
        "Network error. Please try again later.",
        "error",
        "Error"
      );
      console.error("Error:", error);
    }
  };

  const handleRadioChange = (e) => {
    setRole(e.target.value); // Update role state based on selected radio button
  };

  return (
    <div>
      <LoadingSpinner isLoading={Loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="/" className="h1" style={{ fontSize: "2em" }}>
                <b>Alumni</b>Hub
              </a>
            </div>
            <div className="card-body">
              <p className="login-box-msg" style={{ fontSize: "1.2em" }}>
                Please enter your details below to{" "}
                <b>activate your account!!</b>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                    required // Make it required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" /> {/* Username Icon */}
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    required // Make it required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required // Make it required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" /> {/* Password Icon */}
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                    required // Make it required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />{" "}
                      {/* Confirm Password Icon */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div
                      className="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label
                        className="btn bg-olive"
                        style={{ fontSize: "0.9em" }}
                      >
                        <input
                          type="radio"
                          name="role"
                          value="Student"
                          checked={role === "Student"}
                          onChange={handleRadioChange} // Update role on change
                          required // Ensure role selection is required
                        />{" "}
                        <span className="fas fa-graduation-cap mr-1" />
                        Student
                      </label>
                      <label
                        className="btn bg-olive "
                        style={{ fontSize: "0.9em" }}
                      >
                        <input
                          type="radio"
                          name="role"
                          value="Alumni"
                          checked={role === "Alumni"}
                          onChange={handleRadioChange} // Update role on change
                          required // Ensure role selection is required
                        />{" "}
                        <span className="fas fa-users mr-1" /> Alumni
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      style={{ fontSize: "0.9em" }}
                    >
                      Activate
                    </button>
                  </div>
                </div>
              </form>
              <hr
                style={{
                  border: "1px solid #d2d6df",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <div className="row">
                <div className="col-4">
                  <Link to="/" style={{ color: "#007bff" }}>
                    <i className="fas fa-home"></i> Home
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/register" style={{ color: "#007bff" }}>
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </div>
                <div className="col-3">
                  <Link to="/login" style={{ color: "#007bff" }}>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateEmail;