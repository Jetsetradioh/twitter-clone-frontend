import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  const [edit, setEdit] = useState({
    name: "",
    bio: "",
    location: "",
    profileImage: "",
    bannerImage: "",
  });

  const editProfile = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/edit-user/${loggedUser._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edit),
      }
    );
    const data = await response.json();
    if (response.ok) {
      const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (storedUser) {
        storedUser.foundUser = data; // eller data.updatedUser
        localStorage.setItem("loggedUser", JSON.stringify(storedUser));
      }

      // Eventuellt: uppdatera lokal state om du har någon
      // setUser(data);

      navigate("/profile");
    }
  };

  return (
    <div className="profile-container">
      <div className="edit-profile-container">
        <form className="edit-form" onSubmit={editProfile}>
          <input
            type="text"
            placeholder="Profile-image"
            value={edit.profileImage}
            onChange={(e) =>
              setEdit((prev) => ({ ...prev, profileImage: e.target.value }))
            }
          ></input>
          <input
            type="text"
            placeholder="Banner-image"
            value={edit.bannerImage}
            onChange={(e) =>
              setEdit((prev) => ({ ...prev, bannerImage: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Name"
            value={edit.name}
            onChange={(e) =>
              setEdit((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Bio"
            value={edit.bio}
            onChange={(e) =>
              setEdit((prev) => ({ ...prev, bio: e.target.value }))
            }
          ></input>
          <input
            type="text"
            placeholder="Location"
            value={edit.location}
            onChange={(e) =>
              setEdit((prev) => ({ ...prev, location: e.target.value }))
            }
          />
          <input type="submit" value="Spara"></input>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
