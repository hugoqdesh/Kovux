import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Coins, Github } from "lucide-react";

export default function Header() {
	return (
		<nav className="flex items-center justify-between max-w-7xl mx-auto pt-4 px-6 2xl:px-0">
			<Link href="/" className="flex items-center gap-1.5 group">
				<Coins className="group-hover:rotate-12 transition duration-200" />
				<span className="font-semibold">Kovux</span>
			</Link>

			<div className="flex gap-4">
				<Link href="https://github.com/hugoqdesh/qashko" target="_blank">
					<Button variant="outline" size="icon">
						<Github />
					</Button>
				</Link>
				<ModeToggle />
			</div>
		</nav>
	);
}
