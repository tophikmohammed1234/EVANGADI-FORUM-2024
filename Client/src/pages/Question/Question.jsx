import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axiosConfig";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import classes from "./Question.module.css";
import "bootstrap/dist/css/bootstrap.css";
import LayOut from "../../Component/LayOut/LayOut";

const Question = () => {
  const titleDom = useRef(null);
  const detailDom = useRef(null);

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const titleValue = titleDom.current.value;
    const detailsValue = detailDom.current.value;

    let hasError = false;

    if (!titleValue) {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (!detailsValue) {
      setDetailsError(true);
      hasError = true;
    } else {
      setDetailsError(false);
    }

    if (hasError) {
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Configuration for authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosInstance.post(
        "/questions/question",
        {
          title: titleValue,
          description: detailsValue,
        },
        config
      );

      setIsLoading(false);

      const successMessage = data.msg;

      const successElement = document.getElementById("success-message");
      successElement.textContent = successMessage;

      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.msg || error.message;

      const errorElement = document.getElementById("error-message");
      errorElement.textContent = errorMessage;
    }
  }

  return (
    <LayOut>
      <section className={`${classes.outer_container} container`}>
        <div className={`${classes.first_container} container`}>
          <div className={`container mx-sm-0 m-md-3 mx-lg-5`}>
            <div>
              <h2>Steps to write a good Question.</h2>
              <div className={classes.line}></div>
            </div>
            <div className={`${classes.steps_container} mx-4`}>
              <div>
                <p>
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                  Summarize your problems in a one-line title.
                </p>
              </div>

              <div>
                <p>
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                  Describe your problem in more detail.
                </p>
              </div>

              <div>
                <p>
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                  Describe what you tried and what you expected to happen.
                </p>
              </div>

              <div>
                <p>
                  <span>
                    <ArrowCircleRightIcon />
                  </span>
                  Review your question and post it here.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${classes.form_container} mt-5 container`}>
          <h2 className={`text-center`}>Post Your Question</h2>

          <p id="success-message" className={`text-center text-success`}></p>
          <p id="error-message" className={`text-center text-danger`}></p>

          <form onSubmit={handleSubmit}>
            <div className={`my-3 mx-auto text-center`}>
              <label htmlFor="title" className={`w-75 `}>
                <textarea
                  type="text"
                  ref={titleDom}
                  name="title"
                  placeholder="Question title"
                  className={`${
                    titleError ? classes.error : ""
                  } w-100 pt-2 px-3`}
                />
              </label>
              {titleError && <p className={`text-danger`}>Title is required</p>}
            </div>

            <div className={`my-3 mx-auto text-center`}>
              <label htmlFor="title" className={`w-75`}>
                <textarea
                  type="text"
                  ref={detailDom}
                  name="description"
                  placeholder="Question detail ..."
                  rows={5}
                  className={`${
                    detailsError ? classes.error : ""
                  } w-100 py-2 px-3`}
                />
              </label>
              {detailsError && (
                <p className={`text-danger`}>Detail is required</p>
              )}
            </div>

            <div className={`w-75 mx-auto`}>
              <button className={`py-2 px-4`} type="submit">
                {isLoading ? <div>Questions posting..</div> : "Post Question"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </LayOut>
  );
};

export default Question;
