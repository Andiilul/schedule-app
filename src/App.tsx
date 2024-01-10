import "./App.css";
import { Table } from "./components/Table";

function App() {
	const today = new Date();

  const dday = today.getDate().toString().padStart(2, '0');
	const mmonth = String(today.getMonth() + 1).padStart(2, "0");
	const yyear = String(today.getFullYear());

	const date = {
		day: dday,
		month: mmonth,
		year: yyear,
	};

	return (
		<main className="max-w-[100vw] min-h-[100vh] p-12 overflow-x-hidden flex justify-center bg-[#2c375f]">
			<Table date={date} />
		</main>
	);
}

export default App;
