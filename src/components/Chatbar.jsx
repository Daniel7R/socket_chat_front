import React, { useEffect, useState } from "react";

const Chatbar = ({ socket, Styles }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      socket.on("newUserResponse", (data) => setUsers(data));
      // try {
      // } catch (err) {
      //   console.log(err);
      // }
    })();
  }, [socket, users]);

  return (
    <div className={Styles.chat__sidebar}>
      <h2>Challenge 1</h2>

      <div>
        <h4 className={Styles.chat__header}>ACTIVE USERS</h4>
        <div className={Styles.chat__users}>
          {users.map((user) => (
            <p key={user.socketID}>{user?.username}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Chatbar };
