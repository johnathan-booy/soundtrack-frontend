import "./App.css";
import FlashContext from "./contexts/FlashContext";
import TeacherContext from "./contexts/TeacherContext";
import Routes from "./navigation/Routes";

function App() {
	return (
		<div className="App">
			<TeacherContext.Provider value={null}>
				<FlashContext.Provider value={null}>
					<Routes />
				</FlashContext.Provider>
			</TeacherContext.Provider>
		</div>
	);
}

export default App;
