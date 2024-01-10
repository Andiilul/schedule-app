import { Memo } from "../IMemo";
import { Cells } from "./Cells";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DateSectionProps {
	firstDateDay: number;
	totalDay: number;
	lastDateDay: number;
	previousMonthTotalDay: number;
	focusDate: string;
	shownDate: string;
	setFocusDate: React.Dispatch<React.SetStateAction<string>>;
	selectedMonth: string;
	setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
	selectedYear: string;
	setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
	memo: Memo[];
}

export const DateSection: React.FC<DateSectionProps> = ({
	firstDateDay,
	lastDateDay,
	totalDay,
	focusDate,
	shownDate,
	previousMonthTotalDay,
	setFocusDate,
	selectedMonth,
	setSelectedMonth,
	selectedYear,
	setSelectedYear,
	memo,
}) => {
	const cellsDate = new Date(shownDate);
	const month = String(cellsDate.getMonth() + 1).padStart(2, "0");
	const longMonth = cellsDate.toLocaleString("en-US", { month: "long" });
	const year = String(cellsDate.getFullYear());

	const handlePrevMonth = (newDate: number) => {
		const newMonth = (parseInt(selectedMonth) - 1).toString().padStart(2, "0");

		if (selectedMonth !== "01"){
			setSelectedMonth(newMonth);
			setFocusDate(`${selectedYear}-${newMonth}-${newDate}`);
		}else{
			setSelectedMonth("12");
			const newYear = (parseInt(selectedYear) - 1).toString();
			setSelectedYear(newYear);
			setFocusDate(`${newYear}-12-${newDate}`);
		}
	};

	const handleNextMonth = (newDate: number) => {
		const newMonth = (parseInt(selectedMonth) + 1).toString().padStart(2, "0");

		if (selectedMonth !== "12") {
			setSelectedMonth(newMonth);
			setFocusDate(`${selectedYear}-${newMonth}-${newDate + 1}`);
			console.log(focusDate);
		} else {
			setSelectedMonth("01");
			const newYear = (parseInt(selectedYear) + 1).toString();
			setSelectedYear(newYear);
			setFocusDate(`${newYear}-01-${newDate + 1}`);
			console.log(focusDate);
		}
	};

	return (
		<main>
			<div className="grid gap-2 rounded-lg grid-cols-7 ">
				{days.map((_, index) => (
					<Cells type="head" key={index}>
						{days[index]}
					</Cells>
				))}
			</div>
			<section className="grid gap-2 rounded-lg grid-cols-7">
				{/*  prev month map */}
				{Array.from({ length: firstDateDay }).map((_, index) => (
					<div key={index} onClick={() => handlePrevMonth(previousMonthTotalDay - (firstDateDay - index) + 1)}>
						<Cells type="blur">
							{previousMonthTotalDay - (firstDateDay - index) + 1}
						</Cells>
					</div>
				))}
				{/* current month map */}
				{Array.from({ length: totalDay }).map((_, index) => (
					<div
						key={index}
						onClick={() => setFocusDate(`${year}-${month}-${index + 1}`)}
						title={`${index + 1} ${longMonth} ${year}`}
					>
						<Cells
							badge={
								memo.find(
									(memo) => memo.date === `${year}-${month}-${index + 1}`
								)?.memoList.length
							}
							active={`${focusDate}` === `${year}-${month}-${index + 1}`}
						>
							{index + 1}
						</Cells>
					</div>
				))}
				{/* next month map */}
				{Array.from({ length: 6 - lastDateDay }).map((_, index) => (
					<div onClick={() => handleNextMonth(index)}>
						<Cells type="blur" key={index}>
							{index + 1}
						</Cells>
					</div>
				))}
			</section>
		</main>
	);
};
