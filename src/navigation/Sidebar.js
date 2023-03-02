import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faEdit,
	faSignOut,
	faSignIn,
	faUserFriends,
	faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
	const style = isSidebarOpen
		? {
				left: "0",
				boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
		  }
		: {};
	return (
		<nav className="sidebar" style={style}>
			<ul className="sidebar-top">
				<li>
					<NavLink to="/students" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faUserFriends} />
						<span>Students</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/lessons" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faClipboard} />
						<span>Lessons</span>
					</NavLink>
				</li>
			</ul>
			<ul className="sidebar-bottom">
				<li>
					<NavLink to="/login" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faSignIn} />
						<span>Login</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/logout" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faSignOut} />
						<span>Logout</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/register" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faUserPlus} />
						<span>Register</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/update" onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faEdit} />
						<span>Update</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Sidebar;
