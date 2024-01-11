import { ChangeEvent, useEffect, useState } from "react";
import { Memo } from "../IMemo";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Todo } from "./ToDo";

interface SchedulerProps {
	focusDate: string;
	memo: Memo[];
	setMemo: React.Dispatch<React.SetStateAction<Memo[]>>;
}

export const Scheduler: React.FC<SchedulerProps> = ({
	focusDate,
	memo,
	setMemo,
}) => {
	const [isInput, setIsInput] = useState<boolean>(false);

	const isMemo = memo.some((item) => item.date === focusDate);

	const [time, setTime] = useState<string | undefined>("00:00");
	const [content, setContent] = useState<string>("");

	const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	};

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTime(event.target.value);
	};

	const handleSaveInput = () => {
		if (time && time.length !== 0) {
			if (content && content !== "") {
				const existingMemoIndex = memo.findIndex(
					(item) => item.date === focusDate
				);

				if (existingMemoIndex !== -1) {
					const updatedMemo = [...memo];
					const updatedMemoList = [
						...updatedMemo[existingMemoIndex].memoList,
						{
							content: content,
							time: time,
						},
					];

					updatedMemo[existingMemoIndex] = {
						...updatedMemo[existingMemoIndex],
						memoList: updatedMemoList,
					};

					setMemo(updatedMemo);
				} else {
					const newMemo: Memo = {
						date: focusDate,
						memoList: [
							{
								content: content,
								time: time,
							},
						],
					};

					setMemo((prevMemo) => [...prevMemo, newMemo]);
				}

				window.alert("Success");
				setIsInput(false);
				setContent("");
				setTime("00:00");
			} else {
				window.alert("Invalid Content");
				return 0;
			}
		} else {
			window.alert("Invalid Time");
		}
		console.log(time);
	};

	const handleCancelInput = () => {
		setIsInput(false);
		setTime("00:00");
		setContent("");
	};

	useEffect(() => {
		setIsInput(false);
		setTime("00:00");
		setContent("");
	}, [focusDate]);

	const schedulerDate = new Date(focusDate);

	return (
		<div className="flex flex-col gap-3">
			<main className="bg-dark shadow-lg rounded-lg w-80 min-h-[240px] overflow-hidden h-max max-h-[480px] flex flex-col">
				<section className="text-white bg-lighthover text-[16px] w-full p-4 shadow-md">
					Schedule
				</section>
				<section className="p-2 text-primary flex gap-2 items-center">
					<FaRegCalendarAlt />{" "}
					<span className="text-[14px]">
						{schedulerDate.toLocaleString("default", { weekday: "short" })},{" "}
						{schedulerDate.getDate()}{" "}
						{schedulerDate.toLocaleString("default", { month: "long" })}{" "}
						{schedulerDate.getFullYear()}
					</span>
				</section>
				{isInput ? (
					<section className="w-full p-2 flex flex-col gap-2">
						<div className="flex flex-col gap-1">
							<p className="text-white text-[12px]">Time :</p>
							<input
								type="time"
								step="60"
								value={time}
								onChange={handleTimeChange}
								title="hour"
								className="pl-2 p-2 w-full rounded-sm bg-[rgba(255,255,255,0.05)] focus:border-none focus:outline-none text-white"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-white text-[12px]">Content :</p>
							<textarea
								placeholder="Schedule Content..."
								title="Content"
								rows={4}
								value={content}
								onChange={handleContentChange}
								className="pl-2 p-2 w-full rounded-sm no-scrollbar bg-[rgba(255,255,255,0.05)] focus:border-none focus:outline-none text-white resize-none text-[12px]"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<button
								title="Add Schedule"
								onClick={handleSaveInput}
								className="text-green-500 hover:text-green-600 select-none transition-[200ms] bg-dark hover:bg-[rgba(82,255,146,0.2)] text-[14px] p-[12px_24px] rounded-md"
							>
								Save
							</button>
							<button
								title="Add Schedule"
								onClick={handleCancelInput}
								className="text-red-500 hover:text-red-600 select-none transition-[200ms] bg-dark hover:bg-[rgba(172,98,98,0.36)] text-[14px] p-[12px_24px] rounded-md"
							>
								Cancel
							</button>
						</div>
					</section>
				) : isMemo ? (
					<section className="overflow-auto">
						{memo
							.find((item) => item.date === focusDate)
							?.memoList.map((memoItem, index) => (
								<>
									<Todo
										key={index}
										content={memoItem.content}
										time={memoItem.time}
									/>
									{index !==
										(memo.find((item) => item.date === focusDate)?.memoList
											.length ?? 0) -
											1 && (
										<section className="h-[0.2px] ml-[6px] mr-[6px] bg-[#ffffff2a]" />
									)}
								</>
							))}
					</section>
				) : (
					<section className="flex items-center justify-center grow text-[12px] italic text-gray-300">
						No Schedule
					</section>
				)}
			</main>
			{!isInput && (
				<button
					title="Add Schedule"
					onClick={() => setIsInput(true)}
					className="text-lighter hover:text-primary select-none transition-[200ms] bg-dark hover:bg-hover text-[14px] p-[12px_24px] rounded-md"
				>
					Add New Schedule +
				</button>
			)}
		</div>
	);
};
