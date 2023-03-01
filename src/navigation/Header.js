import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = ({ toggleSidebar }) => {
	return (
		<header className="header">
			<div className="logo">
				<NavLink to="/">SoundTrack Academy</NavLink>
			</div>
			<button className="sidebar-toggle" onClick={toggleSidebar}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</header>
	);
};

export default Header;
