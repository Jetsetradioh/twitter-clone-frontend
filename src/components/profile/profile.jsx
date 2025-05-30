import { useState, useEffect, use } from "react";
import "./profile.css";
import Tweet from "../tweet/tweet";
import { Link } from "react-router-dom";
const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const updatedUser = async () => {
      const fetchUser = await fetch(
        `http://localhost:3000/api/update-user/${loggedUser._id}`
      );
      const data = await fetchUser.json();
      setUpdatedUser(data);
    };
    updatedUser();
  }, []);

  const [tweets, setTweets] = useState([]);
  const {
    _id,
    name,
    username,
    bio,
    location,
    tweetsCount,
    bannerImage,
    profileImage,
    joinedDate,
    followersCount,
    followingCount,
  } = updatedUser;

  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch(
        `http://localhost:3000/api/tweets/${loggedUser._id}`
      );
      const data = await response.json();
      setTweets(data);
    };
    getTweets();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <i id="profile-left-icon" className="fa-solid fa-arrow-left"></i>{" "}
        <div className="profile-header-box">
          <h2>{name}</h2>
          <h6>{tweetsCount} tweets </h6>
        </div>
      </div>
      <img className="profile-banner" src={bannerImage}></img>
      <div className="profile-image-box">
        <img className="profile-image" src={profileImage}></img>
        <Link to="/editProfile">
          <button className="profile-follow-btn">Edit</button>
        </Link>
      </div>
      <div className="profile-body">
        <div className="profile-name-box">
          <h2>{name}</h2>
          <span>@{username}</span>
        </div>

        <p>{bio}</p>
        <h6>{location}</h6>
        <h6>Gick med {new Date(joinedDate).toLocaleDateString()}</h6>
        <div className="profile-following">
          <span>{followingCount} Following </span>
          <span>{followersCount} Followers</span>
        </div>
      </div>
      <Tweet tweets={tweets} showInput={false} />
    </div>
  );
};

export default Profile;
