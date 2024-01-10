import { useState } from "react";
import "./App.css";
import { Scheduler } from "./components/Scheduler";
import { Table } from "./components/Table";

function App() {
	const today = new Date();

	const dday = today.getDate().toString().padStart(2, "0");
	const mmonth = String(today.getMonth() + 1).padStart(2, "0");
	const yyear = String(today.getFullYear());

	const date = {
		day: dday,
		month: mmonth,
		year: yyear,
	};

	const [focusDate, setFocusDate] = useState<string>(
		`${date.year}-${date.month}-${date.day}`
	);

	return (
		<main className="max-w-[100vw] gap-4 min-h-[100vh] p-12 overflow-x-hidden flex justify-center bg-main">
			<Table focusDate={focusDate} setFocusDate={setFocusDate} date={date} />
			<Scheduler focusDate={focusDate} />

		</main>
	);
}

export default App;
