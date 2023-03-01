import React, { useEffect, useState } from "react";
import Sidebar from "./navigation/Sidebar";
import Routes from "./navigation/Routes";
import Header from "./navigation/Header";
import useWindowSize from "./hooks/useWindowSize";
import "./App.scss";

function App() {
	const { width } = useWindowSize();

	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	useEffect(() => {
		if (width >= 1024 && !sidebarIsOpen) {
			setSidebarIsOpen(true);
		}
	}, [width, sidebarIsOpen]);

	const isSidebarOpen = sidebarIsOpen && width < 1024;

	const toggleSidebar = () => {
		setSidebarIsOpen(!sidebarIsOpen);
	};

	return (
		<div className="app">
			<Header toggleSidebar={toggleSidebar} />
			<Sidebar sidebarIsOpen={sidebarIsOpen} />
			<main
				className={`main-content${isSidebarOpen ? " opaque" : ""}`}
				onClick={isSidebarOpen ? toggleSidebar : null}
			>
				<Routes />
			</main>
		</div>
	);
}

export default App;
