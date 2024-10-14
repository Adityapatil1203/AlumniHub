import React, { useContext ,useState , useEffect, useRef , useCallback } from "react";
import "./profile.css"
import axios from 'axios'
import AuthContext from "../../context/AuthContext.js";


const SuperUserProfileContent = () => {
    let { userData ,setLoading, showNotification} = useContext(AuthContext);
    console.log("userData", userData);
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id"))
      : null;
    const [user, setUser] = useState(null);
    const [reload, setReload] = useState(false);
    const [posts, setPosts] = useState([]);  // Store posts
    const [page, setPage] = useState(1);     // Keep track of the page number
    const [hasMore, setHasMore] = useState(true); 
  
    const [superUserData, setSuperUserData] = useState({
      user: {
        // username: '',
        full_name: '',
        About: '',
        Work: '',
        Year_Joined: '',
        graduation_year: '',
        Branch: '',
        email: '',
        mobile: '',
        linkedin: '',
        Github: '',
        instagram: '',
        portfolio_link: '',
        resume_link: '',
        skills: '',
      },
      profile: {
        user: {
          // username: user?.username,
          full_name: '',
        About: '',
        Work: '',
        Year_Joined: '',
        graduation_year: '',
        Branch: '',
        email: '',
        mobile: '',
        linkedin: '',
        Github: '',
        instagram: '',
        portfolio_link: '',
        resume_link: '',
        skills: '',
        },
        designation:'', // Designation for the HOD
      },
    });
    
  
    
    
    useEffect(() => {
      setLoading(true);
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
            if(response.data){
              setSuperUserData({
                user: {
                  // username: response.data.username,
                  full_name: response.data.full_name,
                  About: response.data.About,
                  Work: response.data.Work,
                  Year_Joined: response.data.Year_Joined,
                  graduation_year: response.data.graduation_year,
                  Branch: response.data.Branch,
                  email: response.data.email,
                  mobile: response.data.mobile,
                  linkedin: response.data.linkedin,
                  Github: response.data.Github,
                  instagram: response.data.instagram,
                  portfolio_link: response.data.portfolio_link,
                  resume_link: response.data.resume_link,
                  skills: response.data.skills,
                },
                profile: {
                  user: {
                    // username: response.data.username,
                    full_name: response.data.full_name,
                    About: response.data.About,
                    Work: response.data.Work,
                    Year_Joined: response.data.Year_Joined,
                    graduation_year: response.data.graduation_year,
                    Branch: response.data.Branch,
                    email: response.data.email,
                    mobile: response.data.mobile,
                    linkedin: response.data.linkedin,
                    Github: response.data.Github,
                    instagram: response.data.instagram,
                    portfolio_link: response.data.portfolio_link,
                    resume_link: response.data.resume_link,
                    skills: response.data.skills,
                  },
                  designation: response.data.hod_profile.designation
            }
              })
              setLoading(false);
            }
        })
        .catch((error) => {
          console.error("Error fetching Admin data:", error);
          setLoading(false);
          showNotification("Error fetching Admin data, please try again.", "error", "Error");
        });
  localStorage.getItem("id") && localStorage.removeItem("id"); 
       
    }, [userData?.user_id,reload]);
  
  
    console.log("user ", user);
  
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
      try {
        const response = await axios.put(`http://127.0.0.1:8000/edit-hod-profile/${id || userData?.user_id}/`, superUserData,{
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        });
        if (response.status === 200) {
          setLoading(false);
          showNotification("Profile updated successfully", "success", "Success");
          if (reload) {
            setReload(false);
          } else {
            setReload(true);
          }
        }
        else {
          setLoading(false);
          showNotification(response.data.detail, "error", "Error");
          if (reload) {
            setReload(false);
          } else {
            setReload(true);
          }
          
        }
  
      } catch (error) {
        console.error('Error updating profile:', error.message);
        setLoading(false);
        showNotification("Error updating profile, please try again.", "error", "Error");
      }
    };
  
    // Handle input changes for user data
    const handleUserChange = (e) => {
      const { name, value } = e.target;
      setSuperUserData((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name]: value // Update the correct field in user
        },
        profile: {
          ...prevState.profile,
          user: {
            ...prevState.profile.user,
            [name]: value // Update the same field in nested user object if needed
          }
        }
      }));
    };
    
    // Handle input changes for profile data
    const handleProfileChange = (e) => {
      const { name, value } = e.target;
      setSuperUserData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value // Update the correct field in profile
        }
      }));
    };
  
  useEffect(() => {
      fetchPosts(page); // Fetch the first page of posts when the component mounts
  
      const handleScroll = () => {
        // Check if the user has scrolled to the bottom
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore) {
          loadMorePosts(); // Load more posts when scrolled near the bottom
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    }, [page, hasMore]);
  
    const fetchPosts = async (page) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/hodposts/author/${id || userData?.user_id}/?page=${page}&page_size=10`);
        setPosts(prevPosts => [...prevPosts, ...response.data.results]); // Append new posts to existing posts
        setHasMore(response.data.next !== null); // If 'next' is null, stop loading more posts
      } catch (error) {
        console.error('Error fetching posts:', error);
        showNotification("Error fetching posts, please try again.", "error", "Error");
      }
    };
  
    const loadMorePosts = () => {
      setPage(prevPage => prevPage + 1); // Increment page count to load more posts
    };
  
    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    };
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
  
                  {/* About Box */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">About</h3>
                    </div>
                    {/* /.card-header */}
                    <div
                      className="card-body"
                      style={{
                        maxHeight: "80vh",
                        overflowX: "auto",
                        overflowY: "auto",
                      }}
                    >
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
                        <i className="fas fa-calendar-alt mr-1" />
                        Joining Year
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
                        { userData?.user_id===user?.id && (
                           <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#settings"
                            data-toggle="tab"
                          >
                            Edit Profile
                          </a>
                        </li>
                        )}
                       
                      </ul>
                    </div>
              
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="active tab-pane" id="activity"  style={{
                            maxHeight: "131vh",
                            overflowY: "auto", // Enable vertical scrolling
                            overflowX: "hidden", // Prevent horizontal scrolling
                            padding: "15px", // Optional: add padding if needed
                            boxSizing: "border-box", // Ensure padding is included in width calculation
                          }}>
                          {/* Post */}
                        {posts.map(post => (
          <div key={post.id} className="post">
              
                            <div className="user-block" >
                              <img
                                className="img-circle img-bordered-sm"
                                src={ `http://127.0.0.1:8000/${user?.Image || "#"}` }
                                alt="user image"
                                
                              />
                              < span className="username">
                                <a href="#">{post?.author_name || (post?.author_username ? post?.author_username : "Author")}</a>
                                
                                
                              </ span>
                              
                              <span className="description">
                                Created at - {formatDate(post?.created_at) || "Date"}
                                <br></br>
                                <span className="badge bg-success" style={{fontSize: "0.8em",padding: "0.5em"}} > { post?.tag || "Tag" }</span>
                              </span>
                              
                            </div>
                          
                            <span style={{ fontWeight: "bold" , fontSize: "1.09em"}}>
                              { post?.title || "Title" }
                            </span>
                            <p className="postfont" style={{ marginTop: "0.5em" ,marginBottom: "0.5em"}}>
                              { post?.content || "Content" }
                            </p>
                            <div className="row">
    <div className="col-auto">
      <a href={post?.image_url || "#"} target="_blank" rel="noreferrer" className="mr-3">
        <i className="fas fa-image mr-1" /> Image
      </a>
    </div>
    <div className="col-auto">
      <a href={post?.DocUrl || "#"} target="_blank" rel="noreferrer" className="mr-3">
        <i className="fas fa-file-alt mr-1" /> Document
      </a>
    </div>
    <div className="col-auto">
      <a href={post?.link || "#"} target="_blank" rel="noreferrer" className="mr-3">
        <i className="fas fa-link mr-1" /> Link
      </a>
    </div>
  </div>
  
                        
                          
          </div>
        ))}
        
  
                       
                       
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
                            {/* END Contact Details Item */}
                          </div>
                        </div>
                        {/* /.tab-pane */}
                        <div
                          className="tab-pane"
                          id="settings"
                          style={{
                            maxHeight: "131vh",
                            overflowY: "auto", // Enable vertical scrolling
                            overflowX: "hidden", // Prevent horizontal scrolling
                            padding: "15px", // Optional: add padding if needed
                            boxSizing: "border-box", // Ensure padding is included in width calculation
                          }}
                        >
                          <form
                            className="form-horizontal"
                            onSubmit={handleSubmit}
                          >
                            <p
                              className="editheading"
                              style={{ marginTop: "0px" }}
                            >
                              Personal Information
                            </p>
                            <div className="form-group row">
                              <label
                                htmlFor="inputFullName"
                                className="col-sm-2 col-form-label"
                              >
                                Full Name
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="full_name"
                                  name="full_name"
                                  value={superUserData?.user?.full_name}
                                  onChange={handleUserChange}
                                  placeholder="Full Name"
                                />
                              </div>
                            </div>
  
                            <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                Department
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Branch"
                                  name="Branch"
                                  value={superUserData?.user?.Branch}
                                  onChange={handleUserChange}
                                  placeholder="CSE, ECE, CIVIL, etc."
                                />
                              </div>
                            </div>
  
                            <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                Joining Year
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="Year_Joined"
                                  name="Year_Joined"
                                  value={superUserData?.user?.Year_Joined}
                                  onChange={handleUserChange}
                                  placeholder="Year Joined"
                                />
                              </div>
                            </div>
  
                            <hr
                              style={{
                                border: "1px solid black",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                              }}
                            ></hr>
                            <p className="editheading">Contact Information</p>
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
                                  id="email"
                                  name="email"
                                  value={superUserData?.user?.email}
                                  onChange={handleUserChange}
                                  placeholder="Email"
                                />
                              </div>
                            </div>
  
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Mobile
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="mobile"
                                  name="mobile"
                                  value={superUserData?.user?.mobile}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
  
                                    if (value.length === 10) {
                                      handleUserChange({
                                        target: { name: "mobile", value },
                                      });
                                    } else if (value.length <= 10) {
                                      handleUserChange({
                                        target: { name: "mobile", value },
                                      });
                                    }
                                  }}
                                  placeholder="Mobile"
                                  maxLength="10"
                                  minLength="10"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                LinkedIn
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="url"
                                  className="form-control"
                                  id="linkedin"
                                  name="linkedin"
                                  value={superUserData?.user?.linkedin}
                                  onChange={handleUserChange}
                                  placeholder="LinkedIn profile link"
                                />
                              </div>
                            </div>
  
                            <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                Instagram
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="url"
                                  className="form-control"
                                  id="instagram"
                                  name="instagram"
                                  value={superUserData?.user?.instagram}
                                  onChange={handleUserChange}
                                  placeholder="Instagram profile link"
                                />
                              </div>
                            </div>
  
                            <hr
                              style={{
                                border: "1px solid black",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                              }}
                            ></hr>
                            <p className="editheading">Professional Profiles</p>
                            <div className="form-group row">
                              <label
                                htmlFor="inputGithub"
                                className="col-sm-2 col-form-label"
                              >
                                Github
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="url"
                                  className="form-control"
                                  id="Github"
                                  name="Github"
                                  value={superUserData?.user?.Github}
                                  onChange={handleUserChange}
                                  placeholder="Github profile link"
                                />
                              </div>
                            </div>
  
                            <hr
                              style={{
                                border: "1px solid black",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                              }}
                            ></hr>
                            <p className="editheading">
                              Professional Information
                            </p>
  
                            <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                About
                              </label>
                              <div className="col-sm-10">
                                <textarea
                                  type="text"
                                  className="form-control"
                                  id="About"
                                  name="About"
                                  value={superUserData?.user?.About}
                                  onChange={handleUserChange}
                                  placeholder="About..."
                                  rows="3"
                                  style={{ resize: "vertical" }}
                                />
                              </div>
                            </div>
  
                            <div className="form-group row">
                              <label
                                htmlFor="inputDesignation"
                                className="col-sm-2 col-form-label"
                              >
                                Designation
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="designation"
                                  name="designation"
                                  value={superUserData?.profile?.designation}
                                  onChange={handleProfileChange}
                                  placeholder="Head of Department, etc."
                                />
                              </div>
                            </div>
  
                            <div className="form-group row">
                              <div className="offset-sm-2 col-sm-10 mt-3">
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

export default SuperUserProfileContent;
