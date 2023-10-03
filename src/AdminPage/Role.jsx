import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      // Check if userId is defined
      // Make an HTTP GET request to fetch user profile data
      axios
        .get(`http://localhost:3000/user/${userId}`)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add more user information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
