interface TodoProps {
	time: string;
	content: string;
}

import { useState } from "react";
import { CiClock2 } from "react-icons/ci";

export const Todo: React.FC<TodoProps> = ({ time, content }) => {
	const [full, setFull] = useState<boolean>(false);
	return (
		<main
    title={`Click To ${full? "Collapse" :"Expand"}`}
			onClick={() => setFull(!full)}
			onMouseLeave={() => setFull(false)}
			className={`p-3 text-[12px] hover:bg-lighthover transition-[200ms] leading-[14px] gap-2 flex h-max flex-col font-light ${
				full ? "text-white" : "text-gray-400"
			} cursor-pointer w-full bg-transparent`}
		>
			<div className="flex items-center ">
				<div className="text-[16px]">
					<CiClock2 />
				</div>
				<span className="text-[12px] ">&nbsp; {time}</span>
			</div>
			<span className={`break-words ${!full && "line-clamp-3"} `}>
				"{content}"
			</span>
		</main>
	);
};
