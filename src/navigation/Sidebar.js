import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faBook,
	faSignInAlt,
	faSignOutAlt,
	faUserPlus,
	faEdit,
	faSignOut,
	faSignIn,
	faUsers,
	faUserFriends,
	faChalkboard,
	faClipboard,
	faFile,
	faFileAlt,
	faSchool,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss";

const Sidebar = ({ sidebarIsOpen }) => {
	const style = !sidebarIsOpen
		? {
				width: "0",
		  }
		: {};
	return (
		<nav className="sidebar" style={style}>
			<ul>
				<li>
					<NavLink to="/students">
						<FontAwesomeIcon icon={faUserFriends} />
						<span>Students</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/lessons">
						<FontAwesomeIcon icon={faClipboard} />
						<span>Lessons</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/login">
						<FontAwesomeIcon icon={faSignIn} />
						<span>Login</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/logout">
						<FontAwesomeIcon icon={faSignOut} />
						<span>Logout</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/register">
						<FontAwesomeIcon icon={faUserPlus} />
						<span>Register</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/update">
						<FontAwesomeIcon icon={faEdit} />
						<span>Update</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Sidebar;
