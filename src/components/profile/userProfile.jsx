import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Tweet from "../tweet/tweet";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  const locations = useLocation();
  const { tweet } = locations.state || {};

  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState();
  const [usersTweets, setUsersTweets] = useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${tweet.userId}`
        );
        const data = await response.json();
        setUser(data.user);
        setUsersTweets(data.tweets);

        // Kolla om loggedUser följer denna användare
        if (loggedUser && data.user.friends?.includes(loggedUser._id)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {
        console.error("Fel vid hämtning av profil:", error);
      }
    };

    getProfile();
  }, [loggedUser, tweet.userId]);

  const handleFollowToggle = async () => {
    if (!loggedUser) {
      alert("Du måste vara inloggad för att följa användare.");
      return;
    }

    const url = isFollowing
      ? `http://localhost:3000/api/remove-friend/${user._id}`
      : `http://localhost:3000/api/add-friend/${user._id}`;

    const method = isFollowing ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: loggedUser._id }),
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);

        // Uppdatera profil-användaren (visad användare)
        setUser((prevUser) => ({
          ...prevUser,
          followersCount: isFollowing
            ? Math.max(0, prevUser.followersCount - 1)
            : prevUser.followersCount + 1,
        }));

        // 👇 Hämta ny data för loggedUser
        const updatedUserRes = await fetch(
          `http://localhost:3000/api/user/${loggedUser._id}`
        );
        const updatedUserData = await updatedUserRes.json();

        // 👇 Uppdatera localStorage
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ foundUser: updatedUserData.user })
        );

        // 👇 Om du har setLoggedUser i denna komponent:
        // setLoggedUser(updatedUserData.user);
      } else {
        const result = await response.json();
        alert(result.message || "Något gick fel.");
      }
    } catch (error) {
      console.error("Fel vid följande:", error);
      alert("Serverfel vid följande.");
    }
  };

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
        <Link to="/home" className="back-arrow">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="profile-header-box">
          <h2>{name}</h2>
          <h6>{tweetsCount} tweets </h6>
        </div>
      </div>
      <img className="profile-banner" src={bannerImage}></img>
      <div className="profile-image-box">
        <img className="profile-image" src={profileImage}></img>
        <button className="profile-follow-btn" onClick={handleFollowToggle}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
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
      <Tweet tweets={usersTweets} showInput={false}></Tweet>
    </div>
  );
};

export default UserProfile;
