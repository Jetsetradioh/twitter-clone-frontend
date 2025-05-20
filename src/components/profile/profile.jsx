import { useState, useEffect } from "react";
import "./profile.css";
import Tweet from "../tweet/tweet";
const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

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
  } = loggedUser;

  useEffect(() => {
    const getTweets = async () => {
      const response = await fetch(`http://localhost:3000/api/tweets/${_id}`);
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
        <button className="profile-follow-btn">Follow</button>
      </div>
      <div className="profile-body">
        <div className="profile-name-box">
          <h2>{name}</h2>
          <span>@{username}</span>
        </div>

        <p>{bio}</p>
        <h6>{location}</h6>
        <h6>Joined {joinedDate}</h6>
        <div className="profile-following">
          <span>{followingCount} Following </span>
          <span>{followersCount} Followers</span>
        </div>
      </div>
      <Tweet tweets={tweets}></Tweet>
    </div>
  );
};

export default Profile;
