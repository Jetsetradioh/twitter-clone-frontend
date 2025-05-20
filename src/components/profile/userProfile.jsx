import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Tweet from "../tweet/tweet";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  const locations = useLocation();
  const { tweet } = locations.state || {};

  const [user, setUser] = useState();
  const [usersTweets, setUsersTweets] = useState();

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${tweet.userId}`
      );
      const data = await response.json();
      setUser(data[0]);
      setUsersTweets(data[1]);
    };

    getProfile();
  }, []);

  if (!user) {
    return <div>Laddar profil...</div>;
  }

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
  } = user;

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
      <Tweet tweets={usersTweets}></Tweet>
    </div>
  );
};

export default UserProfile;
