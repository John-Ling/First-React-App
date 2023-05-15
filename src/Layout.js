import { useState } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	const [tableData, setTableData] = useState([]);
	return (
		<>
			<Outlet context={[tableData, setTableData]}/>
		</>
	);
}