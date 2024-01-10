interface CellsProps {
	children?: React.ReactNode;
	type?: "head" | "blur" | "month" | "default";
	active?: boolean;
}

export const Cells: React.FC<CellsProps> = ({
	children,
	type = "default",
	active = false,
}) => {
	if (type === "head") {
		return (
			<div className="flex rounded-[4px] text-[18px] h-16 w-20 justify-center items-center text-[#2c88cc] ">
				{children}
			</div>
		);
	}

	if (type === "default") {
		return (
			<div
				className={`flex font-semibold rounded-[4px] text-[18px] ${
					active ? "bg-[#53688d]" : "hover:bg-[#323f56]"
				} h-16 justify-center items-center text-white   cursor-pointer select-none `}
			>
				{children}
			</div>
		);
	}

	if (type === "blur") {
		return (
			<div className="flex font-semibold rounded-[4px] text-[10px] h-16 justify-center items-center text-gray-400 hover:bg-[#282b37] hover:text-[16px] cursor-pointer select-none transition-[200ms]">
				{children}
			</div>
		);
	}
	if (type === "month") {
		return (
			<div className="flex font-ligth rounded-[4px] text-[16px] h-16 justify-center items-center text-gray-400 hover:bg-[#282b37] hover:text-[18px] cursor-pointer select-none transition-[200ms]">
				{children}
			</div>
		);
	}
};
