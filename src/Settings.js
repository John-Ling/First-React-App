import { ListIDTable, SettingsID } from "./components/ListIDTable";
import { Link} from "react-router-dom";
import "./scss/app.css";

export const Settings = (props) => {
	return (
		<div className="App">
			<div className="main-section">
				<h2>Settings</h2>
				<ListIDTable/>
				<Link id="settings-button" to="/"><button>Back</button></Link>
			</div>
		</div>
	)	
}