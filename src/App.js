import React, { useEffect, useState } from "react";
import useWindowSize from "./hooks/useWindowSize";
import Header from "./navigation/Header";
import Routes from "./navigation/Routes";
import Sidebar from "./navigation/Sidebar";
import "./App.scss";

function App() {
	/** Sidebar	- open on larger window sizes, collapsible otherwise */
	const { width } = useWindowSize();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		if (width >= 960 && !isSidebarOpen) {
			setIsSidebarOpen(true);
		}
	}, [width, isSidebarOpen]);

	const canSidebarCollapse = isSidebarOpen && width < 960;

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	/** Teacher authentication */

	return (
		<div className="app">
			<Header toggleSidebar={toggleSidebar} />
			<Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			{canSidebarCollapse && (
				<div className="backdrop" onClick={toggleSidebar}></div>
			)}
			<main className={`main-content`}>
				<Routes />
			</main>
		</div>
	);
}

export default App;
