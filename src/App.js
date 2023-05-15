import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from "./Layout";
import { Home } from "./Home";
import { Settings } from "./Settings";
import { NoPage } from "./NoPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout/>}>
					<Route index element={<Home/>}/>
					<Route path="settings" element={<Settings/>}/>
					<Route path="*" element={<NoPage/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
