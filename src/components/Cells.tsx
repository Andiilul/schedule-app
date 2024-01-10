interface CellsProps {
	children?: React.ReactNode;
	type?: "head" | "blur" | "month" | "default";
	active?: boolean;
	badge?: number;
}

export const Cells: React.FC<CellsProps> = ({
	children,
	type = "default",
	active = false,
	badge,
}) => {
	if (type === "head") {
		return (
			<div className="flex rounded-[4px] text-[18px] h-16 w-20 justify-center items-center text-primary ">
				{children}
			</div>
		);
	}

	if (type === "default") {
		return (
			<div
				className={`flex relative font-semibold rounded-[4px] text-[18px] ${
					active ? "bg-focus" : "hover:bg-hover"
				} h-16 justify-center items-center text-white   cursor-pointer select-none `}
			>
				{children}
				{badge && badge > 0 && badge <= 4 ? (
					<section className="absolute left-0 bottom-0 grid w-full h-1 grid-cols-4 gap-1">
						{Array.from({ length: badge }).map((_, index) => (
							<div
								key={index}
								className={`h-[3px] rounded-sm bg-blue-${100 * (index + 3)}`}
							></div>
						))}
					</section>
				) : badge && badge > 4 ? (
					<section className="absolute left-0 bottom-0 w-full h-1  gap-1">
						<div className="h-[3px] rounded-sm bg-gradient-to-r from-blue-500 to-blue-800"></div>
					</section>
				) : (
					""
				)}
			</div>
		);
	}

	if (type === "blur") {
		return (
			<div className="flex font-semibold rounded-[4px] text-[10px] h-16 justify-center items-center text-gray-400 hover:bg-lighthover hover:text-[16px] cursor-pointer select-none transition-[200ms]">
				{children}
			</div>
		);
	}
	if (type === "month") {
		return (
			<div className="flex font-ligth rounded-[4px] text-[16px] h-16 justify-center items-center text-gray-400 hover:bg-lighthover hover:text-[18px] cursor-pointer select-none transition-[200ms]">
				{children}
			</div>
		);
	}
};
