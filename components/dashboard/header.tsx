import React from "react";
import { ModeToggle } from "../mode-toggle";
import Settings from "./settings";

export default function Header() {
	return (
		<header className="absolute top-0 left-0 right-0 flex items-center justify-between pt-4 px-4 md:px-6 z-10">
			<span className="font-semibold">Kovux</span>

			<div className="flex items-center gap-2">
				<Settings />
				<ModeToggle />
			</div>
		</header>
	);
}
