import React, { useState } from "react";
import axios from "../../Axios/axiosConfig";
import styles from "./ForgotPassword.module.css";
import LayOut from "../../Component/LayOut/LayOut";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await axios.post("/users/forgot-password", { email });
      setMessage(data.message);
    } catch (error) {
      setMessage(error?.response?.data?.msg || "Failed to send reset email");
    }
  };

  return (
    <LayOut>
      <section className={styles.allSection}>
        <div className={styles.entirePageHolder}>
          <div className={styles.entirePagePad}>
            <div className={styles.forgotPasswordContainer}>
              <div className={styles.forgotPasswordHeading}>
                <h3 className={styles.forgotPasswordTitle}>
                  Forgot Your Password?
                </h3>
                <p>
                  Enter your email address below and we'll send you a link to
                  reset your password.
                </p>
              </div>
              <form
                className={styles.forgotPasswordForm}
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  className={`${styles.formInput} ${
                    formErrors.email ? styles.error : ""
                  }`}
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={formErrors.email ? "true" : "false"}
                />
                {formErrors.email && (
                  <span className={styles.errorMessage}>
                    {formErrors.email}
                  </span>
                )}
                <div className={styles.centered}>
                  <button className={styles.resetBtn} type="submit">
                    Send Reset Link
                  </button>
                </div>
                {message && <div className={styles.message}>{message}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default ForgotPassword;
