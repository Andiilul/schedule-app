import "./App.css";
import { Table } from "./components/Table";

function App() {
	const today = new Date();

	const dday = "1";
	const mmonth = String(today.getMonth() + 1).padStart(2, "0");
	const yyear = String(today.getFullYear());

	const date = {
		day: dday,
		month: mmonth,
		year: yyear,
	};

	return (
		<main className="w-[100vw] h-[100vh] flex items-center justify-center bg-[#2c375f]">
			<Table date={date} />
		</main>
	);
}

export default App;
