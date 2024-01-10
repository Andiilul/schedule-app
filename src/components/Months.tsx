import { Cells } from "./Cells";
import React from "react";

interface MonthSectionProps {
	months: string[];
	setDateMode: React.Dispatch<React.SetStateAction<"Date" | "Month">>;
	setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
}

export const MonthSection: React.FC<MonthSectionProps> = ({
	setDateMode,
	setSelectedMonth,
	months,
}) => {
	const handleMonthClick = (index: number) => {
		setSelectedMonth(String(index + 1));
		setDateMode("Date");
	};

	return (
		<main className="grid grid-cols-4">
			{months.map((_, index) => (
				<div key={index} onClick={() => handleMonthClick(index)}>
					<Cells type={"month"}>{months[index].substring(0, 3)}</Cells>
				</div>
			))}
		</main>
	);
};
