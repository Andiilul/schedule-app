import { useState } from "react";
import { Cells } from "./Cells";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface DateObject {
	day: string;
	month: string;
	year: string;
}

interface TableProps {
	date: DateObject;
}
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

export const Table: React.FC<TableProps> = ({ date }) => {
	const [selectedMonth, setSelectedMonth] = useState<string>(date.month);
	const [selectedYear, setSelectedYear] = useState<string>(date.year);

	const currentDate = `${selectedYear}-${selectedMonth}-${date.day}`;
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

	const firstDateDay = new Date(currentDate).getDay();
	const lastDateDay = lastDate.getDay();

	return (
		<main className="flex p-4 flex-col gap-4 bg-[#1a1c23] rounded-lg">
			<section className="flex flex-col items-center">
				<section className="flex items-center gap-4">
					<button
						onClick={() => setSelectedYear(eval(`${selectedYear} - 1`))}
						className="rounded-[50%] p-2 text-[14px] text-white bg-[#5799cb] hover:bg-[#2c88cc] transition-[600ms]"
						title="left"
					>
						<FaChevronLeft />
					</button>
					<div className="text-white text-[32px]">{selectedYear}</div>
					<button
						onClick={() => setSelectedYear(eval(`${selectedYear} + 1`))}
						className="rounded-[50%] p-2 text-[14px] text-white bg-[#5799cb] hover:bg-[#2c88cc] transition-[600ms]"
						title="left"
					>
						<FaChevronRight />
					</button>
				</section>
				<section>
					<select
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(e.target.value)}
						className="bg-transparent text-[20px] text-white appearance-none max-w-max text-center hover:text-[#2c88cc] transition-[600ms]"
						title="month"
					>
						{months.map((month, index) => (
							<option
								className="text-black text-[14px]"
								key={index}
								value={String(index + 1)}
							>
								{month}
							</option>
						))}
					</select>
				</section>
			</section>
			<div>{previousMonthLastDate.toString()}</div>

			<main>
				<div className="grid gap-[2px] rounded-lg grid-cols-7 max-w-max ">
					{days.map((_, index) => (
						<Cells type="head" key={index}>
							{days[index]}
						</Cells>
					))}
				</div>
				<section className="grid gap-[2px] rounded-lg grid-cols-7 max-w-max">
					{Array.from({ length: firstDateDay }).map((_, index) => (
						<Cells type="blur" key={index}>
							{previousMonthTotalDay - (firstDateDay - index) + 1}
						</Cells>
					))}
					{Array.from({ length: totalDay }).map((_, index) => (
						<Cells key={index}>{index + 1}</Cells>
					))}
					{Array.from({ length: 6 - lastDateDay }).map((_, index) => (
						<Cells type="blur" key={index}>
							{index + 1}
						</Cells>
					))}
				</section>
			</main>
		</main>
	);
};
