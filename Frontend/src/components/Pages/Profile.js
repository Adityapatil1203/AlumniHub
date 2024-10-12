/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext ,useState , useEffect } from "react";
import axios from 'axios'
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
import "./profile.css"
const AlumniProfileContent = () => {
  
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);
  const [user, setUser] = useState(null);
  const id = localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : null
  
  useEffect(() => {
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    
    axios
      .get(`http://127.0.0.1:8000/getalumni/${ id || userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });
      localStorage.getItem("id") && localStorage.removeItem("id") 
  }, [userData?.user_id]);

  console.log("user ", user);
  function capitalizeFirstLetter(str) {
    if (!str) return ""; // Handle empty or undefined strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div>
        {/* Content Header (Page header) */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 " style={{ fontSize: "0.9em" }}>
                {/* Profile Image */}
                <div className="card card-primary card-outline position-relative">
                  {/* Ribbon */}
                  <div className="ribbon-wrapper ribbon-lg">
                    <div className="ribbon bg-primary">
                      {user
                        ? user.is_alumni
                          ? "Alumni"
                          : user.is_student
                          ? "Student"
                          : "Admin"
                        : "User"}
                    </div>
                  </div>

                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={
                          user?.alumni_profile?.profile_picture_url ||
                          "../../dist/img/user4-128x128.jpg"
                        }
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center ">
                      {user ? user.full_name || user.username : "User"}
                    </h3>
                    <hr
                      style={{
                        border: "1px solid #888888",
                        marginBottom: "0.5em",
                        marginTop: "0.5em",
                      }}
                    />
                    <p className="text-muted text-center font ">
                      {user?.alumni_profile?.Heading || "N/A"}
                    </p>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}

                {/* About Me Box */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About Me</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <strong>
                      <i className="fas fa-info-circle mr-1" /> About
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.About || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-briefcase mr-1" /> Work
                    </strong>
                    <p className="text-muted workfont aboutfont">
                      <span className="tag tag-success">
                        {user?.Work || "N/A"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-graduation-cap mr-1" /> Education
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.alumni_profile?.Education || "N/A"}, <br></br>
                      Graduation Year: {user?.graduation_year || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-code-branch mr-1 " /> Branch
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.Branch || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-map-marker-alt mr-1" /> Location
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.alumni_profile?.current_city || "N/A"},
                      {user?.alumni_profile?.current_country || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-building mr-1" /> Current Company
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.alumni_profile?.current_company_name || "N/A"}
                        <br></br>
                        Role: {user?.alumni_profile?.job_title || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-building mr-1" /> Previous Companies
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.alumni_profile?.previous_companies ||
                        "No Notes Available"}
                    </p>
                    <strong>
                      <i className="fas fa-briefcase mr-1" /> Years of
                      Experience
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.alumni_profile?.years_of_experience || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-laptop-code mr-1" /> Skills
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.skills || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-industry mr-1" /> Industry
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.alumni_profile?.industry || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-trophy mr-1" /> Achievements
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-success">
                        {user?.alumni_profile?.achievements ||
                          "No Achievements"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-calendar-alt mr-1" /> Year Joined
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.Year_Joined || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-calendar-alt mr-1" /> Graduation Year
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.graduation_year || "N/A"}
                    </p>
                  </div>
                </div>
                {/* /.card */}
              </div>

              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item ">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Posts
                        </a>
                      </li>
                      <li className="nav-item ">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>
                      <li className="nav-item ">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user1-128x128.jpg"
                              alt="user image"
                            />
                            <span className="username">
                              <a href="#">Jonathan Burke Jr.</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Shared publicly - 7:30 PM today
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p className="postfont">
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post clearfix">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user7-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Sarah Ross</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Sent you a message - 3 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <form className="form-horizontal">
                            <div className="input-group input-group-sm mb-0">
                              <input
                                className="form-control form-control-sm"
                                placeholder="Response"
                              />
                              <div className="input-group-append">
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user6-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Adam Jones</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Posted 5 photos - 5 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <img
                                className="img-fluid"
                                src="../../dist/img/photo1.png"
                                alt="Photo"
                              />
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo2.png"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo3.jpg"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo4.jpg"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo1.png"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                              </div>
                              {/* /.row */}
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.row */}
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="timeline">
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          {/* timeline time label */}
                          {/* timeline time label */}
                          <div className="time-label">
                            <span className="bg-danger">Contact Details</span>
                          </div>
                          {/* / Contact-label */}
                          {/* Contact Details Item */}
                          <div>
                            <i className="fas fa-address-book bg-primary" />
                            <div className="timeline-item">
                              <div className="timeline-body">
                                <strong>Email:</strong>
                                <p className="text-muted font">
                                  {user?.email || "N/A"}
                                </p>

                                <strong>Mobile:</strong>
                                <p className="text-muted font">
                                  {user?.mobile || "N/A"}
                                </p>

                                <strong>LinkedIn:</strong>
                                <p className="text-muted font">
                                  {user?.linkedin ? (
                                    <a
                                      href={user?.linkedin || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.linkedin ? user.linkedin : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>GitHub:</strong>
                                <p className="text-muted font">
                                  {user?.Github ? (
                                    <a
                                      href={user?.Github || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.Github ? user.Github : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>Instagram:</strong>
                                <p className="text-muted font">
                                  {user?.instagram ? (
                                    <a
                                      href={user?.instagram || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.instagram ? user.instagram : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
                                <hr
                                  style={{
                                    border: "1px solid #888888",
                                    marginBottom: "0.5em",
                                    marginTop: "0.5em",
                                  }}
                                />
                                <strong>Preferred Contact:</strong>
                                <p className="text-muted font">
                                  {user?.alumni_profile.preferred_contact_method
                                    ? capitalizeFirstLetter(
                                        user.alumni_profile
                                          .preferred_contact_method
                                      )
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="time-label">
                            <span className="bg-danger">
                              Portfolio & Resume
                            </span>
                          </div>
                          <div>
                            <i className="fas fa-address-book bg-primary" />
                            <div className="timeline-item">
                              <div className="timeline-body">
                                <strong>Portfolio:</strong>
                                <p className="text-muted font">
                                  {user?.portfolio_link ? (
                                    <a
                                      href={user?.portfolio_link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.portfolio_link
                                        ? user.portfolio_link
                                        : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>Resume:</strong>
                                <p className="text-muted font">
                                  {user?.resume_link ? (
                                    <a
                                      href={user?.resume_link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.resume_link
                                        ? user.resume_link
                                        : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Experience
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="inputExperience"
                                placeholder="Experience"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the{" "}
                                  <a href="#">terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>

          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

const StudentProfileContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);
  const id = localStorage.getItem("id")
    ? JSON.parse(localStorage.getItem("id"))
    : null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch alumni data when the component mounts
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    axios
      .get(`http://127.0.0.1:8000/students/${id || userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });
  }, [userData?.user_id]);

  console.log("user ", user);

  return (
    <>
      <div>
        {/* Content Header (Page header) */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3" style={{ fontSize: "0.9em" }}>
                {/* Profile Image */}
                <div className="card card-primary card-outline position-relative">
                  {/* Ribbon */}
                  <div className="ribbon-wrapper ribbon-lg">
                    <div className="ribbon bg-primary">
                      {user
                        ? user.is_alumni
                          ? "Alumni"
                          : user.is_student
                          ? "Student"
                          : "College"
                        : "User"}
                    </div>
                  </div>

                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={"../../dist/img/user4-128x128.jpg"}
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {user ? user.full_name || user.username : "User"}
                    </h3>
                    <hr
                      style={{
                        border: "1px solid #888888",
                        marginBottom: "0.5em",
                        marginTop: "0.5em",
                      }}
                    />
                    <p className="text-muted text-center font">
                      {user?.student_profile?.Heading || "N/A"}
                    </p>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}

                {/* About Me Box */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About Me</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <strong>
                      <i className="fas fa-info-circle mr-1" /> About
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger aboutfont ">
                        {user?.About || "N/A"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-briefcase mr-1" /> Work
                    </strong>
                    <p className="text-muted workfont aboutfont">
                      <span className="tag tag-success">
                        {user?.Work || "N/A"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-laptop-code mr-1" /> Skills
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.skills || "N/A"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-code-branch mr-1" /> Branch
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.Branch || "N/A"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-graduation-cap mr-1" /> Education
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.student_profile?.Education || "N/A"}, <br></br>
                      Graduation Year: {user?.graduation_year || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-building mr-1" /> Department
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.student_profile?.department || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-calendar-alt mr-1" /> Year Joined
                    </strong>

                    <p className="text-muted aboutfont">
                      {user?.Year_Joined || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-calendar-alt mr-1" /> Current Year of
                      Study
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.student_profile?.current_year_of_study || "N/A"}
                    </p>

                    {/* <strong>
                        <i className="fas fa-link mr-1" /> LinkedIn
                      </strong>
                      <p className="text-muted">
                        <a href={user?.linkedin || "#"}>{user?.linkedin || "N/A"}</a>
                      </p>
                      

                      <strong>
                        <i className="fas fa-code-branch mr-1" /> Github
                      </strong>
                      <p className="text-muted">
                        <a href={user?.Github || "#"}>{user?.Github || "N/A"}</a>
                      </p>
                      

                      <strong>
                        <i className="fas fa-camera mr-1" /> Instagram
                      </strong>
                      <p className="text-muted">
                        <a href={user?.instagram || "#"}>{user?.instagram || "N/A"}</a>
                      </p> */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>

              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      {/* <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Posts
                        </a>
                      </li> */}
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#contacts"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="#edit" data-toggle="tab">
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="contacts">
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          {/* timeline time label */}
                          <div className="time-label">
                            <span className="bg-danger">Contact Details</span>
                          </div>
                          {/* / Contact-label */}
                          {/* Contact Details Item */}
                          <div>
                            <i className="fas fa-address-book bg-primary" />
                            <div className="timeline-item">
                              <div className="timeline-body">
                                <strong>Email:</strong>
                                <p className="text-muted font">
                                  {user?.email || "N/A"}
                                </p>

                                <strong>Mobile:</strong>
                                <p className="text-muted font">
                                  {user?.mobile || "N/A"}
                                </p>

                                <strong>LinkedIn:</strong>
                                <p className="text-muted font">
                                  {user?.linkedin ? (
                                    <a
                                      href={user?.linkedin || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.linkedin ? user.linkedin : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>GitHub:</strong>
                                <p className="text-muted font">
                                  {user?.Github ? (
                                    <a
                                      href={user?.Github || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.Github ? user.Github : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>Instagram:</strong>
                                <p className="text-muted font">
                                  {user?.instagram ? (
                                    <a
                                      href={user?.instagram || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.instagram ? user.instagram : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="time-label">
                            <span className="bg-danger">
                              Portfolio & Resume
                            </span>
                          </div>
                          <div>
                            <i className="fas fa-address-book bg-primary" />
                            <div className="timeline-item">
                              <div className="timeline-body">
                                <strong>Portfolio:</strong>
                                <p className="text-muted font">
                                  {user?.portfolio_link ? (
                                    <a
                                      href={user?.portfolio_link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.portfolio_link
                                        ? user.portfolio_link
                                        : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>Resume:</strong>
                                <p className="text-muted font">
                                  {user?.resume_link ? (
                                    <a
                                      href={user?.resume_link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.resume_link
                                        ? user.resume_link
                                        : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* END Contact Details Item */}
                        </div>
                      </div>
                      {/* /.tab-pane */}

                      {/* /.tab-pane */}
                      <div className="tab-pane" id="edit">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Experience
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="inputExperience"
                                placeholder="Experience"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the{" "}
                                  <a href="#">terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>

          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

const SuperUserProfileContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);
  const id = localStorage.getItem("id")
    ? JSON.parse(localStorage.getItem("id"))
    : null;


    Modal.setAppElement('#root');

  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [modalContent, setModalContent] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Function to open the modal with content (image or document)
  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };


  
  useEffect(() => {
    // Fetch alumni data when the component mounts
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    axios
      .get(`http://127.0.0.1:8000/hods/${id || userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });

     
  }, [userData?.user_id]);

  useEffect(() => {
    const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
    axios
      .get(`http://127.0.0.1:8000/hodposts/author/${userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        // console.log("ress "+JSON.stringify(response.data))
      })
      .catch((error) => {
        console.error('Error fetching the posts:', error);
      });
  }, [userData?.user_id]);

  console.log("user ", user);
  // console.log("postsss "+ posts);

  // username , full_name ,email, About,Year_joined,Branch , mobile , linkdin,instagram
  // , github, designation
  return (
    <>
      <div>
        {/* Content Header (Page header) */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3" style={{ fontSize: "0.9em" }}>
                {/* Profile Image */}
                <div className="card card-primary card-outline position-relative">
                  {/* Ribbon */}
                  <div className="ribbon-wrapper ribbon-lg">
                    <div className="ribbon bg-primary">
                      {user
                        ? user.is_alumni
                          ? "Alumni"
                          : user.is_student
                          ? "Student"
                          : "Admin"
                        : "User"}
                    </div>
                  </div>

                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={
                          user?.hod_profile?.profile_picture_url ||
                          "../../dist/img/user4-128x128.jpg"
                        }
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {user ? user?.full_name || user?.username : "User"}
                    </h3>
                    <hr
                      style={{
                        border: "1px solid #888888",
                        marginBottom: "0.5em",
                        marginTop: "0.5em",
                      }}
                    />
                    <p className="text-muted text-center font">
                      {user?.hod_profile?.designation || "N/A"}
                    </p>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}

                {/* About Me Box */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About Me</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <strong>
                      <i className="fas fa-university mr-1 " /> Department
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.Branch || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-info-circle mr-1" /> About
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.About || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-laptop-code mr-1" /> Year Joined
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.Year_Joined || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    {/* <strong>
                      <i className="fas fa-building mr-1" /> Designation
                    </strong>
                    <p className="text-muted">
                      {user?.hod_profile?.designation || "N/A"}
                    </p> */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>

              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Posts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        {/* Post */}
                        <div>
                          {posts.length > 0 &&
                            posts.map((post) => (
                              <div key={post?.id} className="post">
                                <div className="user-block">
                                  <img
                                    className="img-circle img-bordered-sm"
                                    src="../../dist/img/user1-128x128.jpg"
                                    alt="user image"
                                  />
                                  <span className="username">
                                    <a href="#">{post?.author_name}</a>
                                    <a
                                      href="#"
                                      className="float-right btn-tool"
                                    >
                                      <i className="fas fa-times" />
                                    </a>
                                  </span>
                                  <span className="description">
                                    Shared publicly -{" "}
                                    {new Date(
                                      post?.created_at
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                {/* /.user-block */}
                                <p>{post?.content}</p>

                                {/* Button to show image in modal */}
                                {post?.image_url && (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      openModal({
                                        type: "image",
                                        url: post.image_url,
                                      })
                                    }
                                  >
                                    View Image
                                  </button>
                                )}

                                {/* Button to show document in modal */}
                                {post?.DocUrl && (
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                      openModal({
                                        type: "document",
                                        url: post.DocUrl,
                                      })
                                    }
                                  >
                                    View Document
                                  </button>
                                )}
                              </div>
                            ))}

                          {/* Modal component */}
                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Content Modal"
                            className="modal"
                            overlayClassName="modal-overlay"
                          >
                            <button
                              onClick={closeModal}
                              className="modal-close-btn"
                            >
                              Close
                            </button>

                            {/* Display image or document based on modalContent */}
                            {modalContent?.type === "image" ? (
                              <div>
                                <img
                                  src={modalContent.url}
                                  alt="Post image"
                                  style={{ maxWidth: "100%" }}
                                />
                              </div>
                            ) : modalContent?.type === "document" ? (
                              <div>
                                <iframe
                                  src={modalContent.url}
                                  style={{ width: "100%", height: "500px" }}
                                  title="Document"
                                />
                              </div>
                            ) : null}
                          </Modal>
                        </div>

                        {/* /.post */}
                        {/* Post */}
                        <div className="post clearfix">
                          {/* <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user7-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Sarah Ross</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Sent you a message - 3 days ago
                            </span>
                          </div> */}
                          {/* /.user-block */}
                          {/* <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p> */}
                          {/* <form className="form-horizontal">
                            <div className="input-group input-group-sm mb-0">
                              <input
                                className="form-control form-control-sm"
                                placeholder="Response"
                              />
                              <div className="input-group-append">
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </form> */}
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post">
                          {/* <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user6-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Adam Jones</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Posted 5 photos - 5 days ago
                            </span>
                          </div> */}
                          {/* /.user-block */}
                          <div className="row mb-3">
                            {/* <div className="col-sm-6">
                              <img
                                className="img-fluid"
                                src="../../dist/img/photo1.png"
                                alt="Photo"
                              />
                            </div>  */}
                            {/* /.col */}
                            <div className="col-sm-6">
                              <div className="row">
                                {/* <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo2.png"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo3.jpg"
                                    alt="Photo"
                                  />
                                </div> */}

                                {/* <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo4.jpg"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo1.png"
                                    alt="Photo"
                                  />
                                </div> */}
                                {/* /.col */}
                              </div>
                              {/* /.row */}
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.row */}
                          {/* <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          /> */}
                        </div>
                        {/* /.post */}
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="timeline">
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          {/* timeline time label */}
                          {/* timeline time label */}
                          <div className="time-label">
                            <span className="bg-danger">Contact Details</span>
                          </div>
                          {/* / Contact-label */}
                          {/* Contact Details Item */}
                          <div>
                            <i className="fas fa-address-book bg-primary" />
                            <div className="timeline-item">
                              <div className="timeline-body">
                                <strong>Email:</strong>
                                <p className="text-muted font">
                                  {user?.email || "N/A"}
                                </p>

                                <strong>Mobile:</strong>
                                <p className="text-muted font">
                                  {" "}
                                  {user?.mobile || "N/A"}
                                </p>

                                <strong>LinkedIn:</strong>
                                <p className="text-muted font">
                                  { user?.linkedin ? (<a
                                    href={user?.linkedin || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {user?.linkedin ? user.linkedin : "N/A"}
                                  </a>):("N/A")}
                                  
                                </p>

                                <strong>GitHub:</strong>
                                <p className="text-muted font">
                                  { user?.Github ? (<a
                                    href={user?.Github || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {user?.Github ? user.Github : "N/A"}
                                  </a>) : ("N/A")}
                                  
                                </p>

                                <strong>Instagram:</strong>
                                <p className="text-muted font">
                                  { user?.instagram ? (<a
                                    href={user?.instagram || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {user?.instagram ? user.instagram : "N/A"}
                                  </a>):("N/A")}
                                  
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* END Contact Details Item */}
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Experience
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="inputExperience"
                                placeholder="Experience"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the{" "}
                                  <a href="#">terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>

          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

const Profile = () => {
  const location = useLocation();
  const { state } = location;
  let { userData, setFilter } = useContext(AuthContext);
  setFilter(false);
  console.log("state", state);
  if (state) {
    userData = state;
    localStorage.setItem("id", JSON.stringify(state?.id));
  }
  console.log(" userData", userData);
  const getProfileContent = () => {
    if (userData.is_student) {
      return StudentProfileContent;
    } else if (userData.is_alumni) {
      return AlumniProfileContent;
    } else if (userData.is_superuser || (!userData.is_student && !userData.is_alumni)) {
      return SuperUserProfileContent;
    }
  };
  return (
    <Home
      DynamicContent={getProfileContent()}
      url="profile"
      heading="Profile"
    />
  );
};

export default Profile;
