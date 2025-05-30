import React, { useState, useEffect } from "react";
import "./profile.css";
import Tweet from "../tweet/tweet";
import { Link } from "react-router-dom";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;
  const [updatedUser, setUpdatedUser] = useState(loggedUser || {});

  useEffect(() => {
    if (!loggedUser?._id) return;
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/update-user/${loggedUser._id}`
        );
        const data = await response.json();
        if (data && data.name) setUpdatedUser(data);
      } catch (err) {
        console.error("Error fetching updated user:", err);
      }
    };
    fetchUser();
  }, [loggedUser?._id]);

  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    if (!loggedUser?._id) return;
    const getTweets = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tweets/${loggedUser._id}`
        );
        const data = await response.json();
        setTweets(data);
      } catch (err) {
        console.error("Error fetching tweets:", err);
      }
    };
    getTweets();
  }, [loggedUser?._id]);

  const {
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

  return (
    <div className="profile-container">
      <div className="profile-header">
        <i id="profile-left-icon" className="fa-solid fa-arrow-left"></i>
        <div className="profile-header-box">
          <h2>{name}</h2>
          <h6>{tweetsCount} tweets</h6>
        </div>
      </div>

      <img className="profile-banner" src={bannerImage} alt="banner" />

      <div className="profile-image-box">
        <img className="profile-image" src={profileImage} alt="avatar" />
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
        <h6>
          Gick med {joinedDate && new Date(joinedDate).toLocaleDateString()}
        </h6>
        <div className="profile-following">
          <span>{followingCount} Following</span>
          <span>{followersCount} Followers</span>
        </div>
      </div>

      <Tweet tweets={tweets} showInput={false} />
    </div>
  );
};

export default Profile;
