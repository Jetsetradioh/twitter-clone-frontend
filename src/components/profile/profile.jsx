import "./profile.css";
const Profile = () => {
  const profile = {
    username: "filipliljenberg", // Användarnamn på Twitter
    name: "Filip Liljenberg", // Fullständigt namn
    bio: "Frontend developer | Passion for web design & coding | Always learning", // Profilbio
    profileImage: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg", // URL till profilbild
    bannerImage:
      "https://marketplace.canva.com/EAE91Kz0wsI/1/0/1600w/canva-blue-yellow-retro-quotes-twitter-header-xTB_BZnqeew.jpg", // URL till bannerbild
    followersCount: 1200, // Antal följare
    followingCount: 350, // Antal följda konton
    tweetsCount: 500, // Antal tweets
    joinedDate: "2019-08-12", // Datum när användaren började använda Twitter
    location: "Stockholm, Sweden", // Användarens plats
    website: "https://filipliljenberg.dev", // Länk till personlig webbsida
    isVerified: false, // Om kontot är verifierat eller inte
  };

  const getProfile = async () => {
    const respone = await fetch(`http://localhost:3000/api/profile/${user.id}`);
    const data = await respone.json();
    let profile = data;
  };

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
  } = profile;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <i id="profile-left-icon" className="fa-solid fa-arrow-left"></i>{" "}
        <div className="profile-header-box">
          <h2>{name}</h2>
          <h6>{tweetsCount} tweets</h6>
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
    </div>
  );
};

export default Profile;
