import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DateSection } from "./Date";
import { MonthSection } from "./Months";

interface DateObject {
	day: string;
	month: string;
	year: string;
}

interface TableProps {
	date: DateObject;
	focusDate: string;
	setFocusDate: React.Dispatch<React.SetStateAction<string>>;
}
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const Table: React.FC<TableProps> = ({
	date,
	focusDate,
	setFocusDate,
}) => {
	const [dateMode, setDateMode] = useState<"Date" | "Month">("Date");

	const [selectedMonth, setSelectedMonth] = useState<string>(
		String(date.month)
	);
	const [selectedYear, setSelectedYear] = useState<string>(String(date.year));

	const shownDate = `${selectedYear}-${selectedMonth}-1`;
	const lastDate = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0);
	const previousMonthLastDate = new Date(
		parseInt(selectedYear),
		parseInt(selectedMonth) - 1,
		0
	);
	const totalDay = parseInt(String(lastDate.getDate()).padStart(2, "0"));
	const previousMonthTotalDay = parseInt(
		String(previousMonthLastDate.getDate()).padStart(2, "0")
	);

	const firstDateDay = new Date(shownDate).getDay();
	const lastDateDay = lastDate.getDay();

	const handlePrevious = () => {
		if (dateMode === "Date") {
			if (selectedMonth === "1") {
				setSelectedMonth("12");
				setSelectedYear(String(parseInt(selectedYear) - 1));
			} else {
				setSelectedMonth(String(parseInt(selectedMonth) - 1));
			}
		} else {
			setSelectedYear(String(parseInt(selectedYear) - 1));
		}
	};

	const handleNext = () => {
		if (dateMode === "Date") {
			if (selectedMonth === "12") {
				setSelectedMonth("1");
				setSelectedYear(String(parseInt(selectedYear) + 1));
			} else {
				setSelectedMonth(String(parseInt(selectedMonth) + 1));
			}
		} else {
			setSelectedYear(String(parseInt(selectedYear) + 1));
		}
	};

	return (
		<main className="flex min-w-[640px] h-max  p-4 flex-col items-center justify-start gap-4 bg-dark rounded-lg">
			<section className="flex items-center w-[50%] justify-between gap-2">
				<button
					onClick={handlePrevious}
					className="rounded-[50%] p-2 text-[14px] text-white bg-lighter hover:bg-primary transition-[600ms]"
					title="left"
				>
					<FaChevronLeft />
				</button>
				<section
					title="Month And Year"
					onClick={() => setDateMode("Month")}
					className={`flex flex-col  text-white items-center select-none min-w-[200px] rounded-md  ${
						dateMode === "Date" ? "hover:bg-hover cursor-pointer" : ""
					} transition-[600ms]`}
				>
					<div
						className={`text-[32px] ${
							dateMode === "Month" && "animate-blink"
						} `}
					>
						{selectedYear}
					</div>
					<section>
						<div
							className={`bg-transparent text-[20px] appearance-none max-w-max text-center ${
								dateMode === "Date" && "animate-blink"
							}`}
						>
							{dateMode === "Date"
								? months[parseInt(selectedMonth) - 1]
								: "Select Month"}
						</div>
					</section>
				</section>
				<button
					onClick={handleNext}
					className="rounded-[50%] p-2 text-[14px] text-white bg-lighter hover:bg-primary transition-[600ms]"
					title="left"
				>
					<FaChevronRight />
				</button>
			</section>
			{dateMode === "Date" ? (
				<div className="w-full">
					<DateSection
						firstDateDay={firstDateDay}
						totalDay={totalDay}
						lastDateDay={lastDateDay}
						shownDate={shownDate}
						focusDate={focusDate}
						setFocusDate={setFocusDate}
						previousMonthTotalDay={previousMonthTotalDay}
					/>
				</div>
			) : (
				<div className="w-full">
					<MonthSection
						setDateMode={setDateMode}
						setSelectedMonth={setSelectedMonth}
						months={months}
					/>
				</div>
			)}
		</main>
	);
};
