import React from "react";
import { Navigate, Outlet ,Link} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../api/axios-client.js";
import { useEffect } from "react";

function DashboardLayout() {
  const { token,user,setAccessToken,setUser ,notification,displayNotification} = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }
  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setAccessToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}

export default DashboardLayout;
