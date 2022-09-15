import React, { useEffect, useState } from "react";
// import { auth } from "../../firebaseConfig";

const Chatbar = ({ socket, Styles }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      socket.on("newUserResponse", (data) => setUsers(data));
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  }, [socket, users]);

  return (
    <div className={Styles.chat__sidebar}>
      <h2 style={{ fontWeight: "bold", fontSize: "28px" }}>Challenge 1</h2>

      <div>
        <h4 className={Styles.chat__header}>Active Users</h4>
        <div className={Styles.chat__users}>
          {users.map(
            (user) =>
              auth.currentUser.email !== user?.username && (
                <p key={user.socketID}>{user?.username}</p>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export { Chatbar };
