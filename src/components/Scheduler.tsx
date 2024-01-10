import { ChangeEvent, useState } from "react";
import { Memo } from "../IMemo";

interface SchedulerProps {
	focusDate: string;
	memo: Memo[];
	setMemo: React.Dispatch<React.SetStateAction<Memo[]>>;
}

export const Scheduler: React.FC<SchedulerProps> = ({ focusDate, memo , setMemo }) => {
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
			window.alert("Invalid Time");
		}
		console.log(time);
	};

	const handleCancelInput = () => {
		setIsInput(false);
		setTime("00:00");
	};

	return (
		<div className="flex flex-col gap-3">
			<main className="bg-dark shadow-md rounded-lg w-80 min-h-[240px] h-max max-h-[520px] flex flex-col">
				<section className="text-white bg-lighthover text-[16px] w-full p-4 shadow-md">
					Schedule
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
					<section>
						{memo
							.find((item) => item.date === focusDate)
							?.memoList.map((memoItem, index) => (
								<div key={index}>
									<p>{memoItem.content}</p>
								</div>
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
