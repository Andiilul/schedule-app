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
}

export const DateSection: React.FC<DateSectionProps> = ({
	firstDateDay,
	lastDateDay,
	totalDay,
	focusDate,
	shownDate,
	previousMonthTotalDay,
	setFocusDate,
}) => {
	const cellsDate = new Date(shownDate);
	const month = String(cellsDate.getMonth() + 1).padStart(2, "0");
	const longMonth = cellsDate.toLocaleString("en-US", { month: "long" });
	const year = String(cellsDate.getFullYear());

	return (
		<main>
			<div className="grid gap-[2px] rounded-lg grid-cols-7 ">
				{days.map((_, index) => (
					<Cells type="head" key={index}>
						{days[index]}
					</Cells>
				))}
			</div>
			<section className="grid gap-[2px] rounded-lg grid-cols-7">
				{/*  prev month map */}
				{Array.from({ length: firstDateDay }).map((_, index) => (
					<Cells type="blur" key={index}>
						{previousMonthTotalDay - (firstDateDay - index) + 1}
					</Cells>
				))}
				{/* current month map */}
				{Array.from({ length: totalDay }).map((_, index) => (
					<div
						onClick={() => setFocusDate(`${year}-${month}-${index + 1}`)}
						title={`${index + 1} ${longMonth} ${year}`}
					>
						<Cells
							active={`${focusDate}` === `${year}-${month}-${index + 1}`}
							key={index}
						>
							{index + 1}
						</Cells>
					</div>
				))}
				{/* next month map */}
				{Array.from({ length: 6 - lastDateDay }).map((_, index) => (
					<Cells type="blur" key={index}>
						{index + 1}
					</Cells>
				))}
			</section>
		</main>
	);
};
