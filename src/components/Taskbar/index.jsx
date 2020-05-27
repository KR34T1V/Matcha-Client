import React from "react";

const Taskbar = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <h1>this is the loggedIn Taskbar</h1>
      ) : (
        <h1>This is the loggedOut Taskbar</h1>
      )}
    </div>
  );
};

export default Taskbar;
