import React from "react";
import { ModeToggle } from "../mode-toggle";
import Settings from "./settings";
import Link from "next/link";

export default function Header() {
	return (
		<header className="absolute top-0 left-0 right-0 flex items-center justify-between pt-4 px-4 md:px-6 z-10">
			<Link href="/">
				<span className="font-semibold">Kovux</span>
			</Link>

			<div className="flex items-center gap-2">
				<Settings />
				<ModeToggle />
			</div>
		</header>
	);
}
