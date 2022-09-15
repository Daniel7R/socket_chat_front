import React, { useEffect, useState } from "react";

const Chatbar = ({ socket, Styles }) => {
  const [users, setUsers] = useState([]);

  let cUser;

  if (typeof window !== "undefined") {
    cUser = localStorage.getItem("user");
  }
  useEffect(() => {
    try {
      socket.on("newUserResponse", (data) => setUsers(data));
    } catch (err) {
      console.log(err);
    }
  }, [socket, users]);

  return (
    <div className={Styles.chat__sidebar}>
      <h2 style={{ fontWeight: "bold", fontSize: "28px", color: "#000000" }}>
        Challenge 1
      </h2>

      <div>
        <h4 className={Styles.chat__header} style={{ color: "#000000" }}>
          Active Users
        </h4>
        <div className={Styles.chat__users}>
          {users.map(
            (user) =>
              user !== cUser && <p key={user?.socketID}>{user?.username}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { Chatbar };
