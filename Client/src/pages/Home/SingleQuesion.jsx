import React from "react";
import classes from "./Home.module.css";

import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function HomeCard({ question }) {
  const { title, username, tag, questionid } = question;
  return (
    <>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/questions/${questionid}`}
      >
        <hr />
        <div className={classes.question_outer_wrapper}>
          <div className={classes.question__list}>
            <div className={classes.question__list__flex}>
              <div className={classes.user}>
                <svg
                  className={classes.avatar}
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 -40 448 712"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
              </div>
              <div className={classes.question}>
                <p>{title} </p>
              </div>
            </div>
            <div>
              <FaChevronRight
                size="40"
                transition="all 0.5s ease 0s"
                style={{ fontWeight: "900" }}
              />
            </div>
          </div>
          <h4>{username}</h4>
          <p>{title} </p>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "30px",
            }}
          >
            asked on : {tag}
          </p>
        </div>
      </Link>
    </>
  );
}

export default HomeCard;
