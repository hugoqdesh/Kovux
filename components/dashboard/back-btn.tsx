import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackBtn() {
	return (
		<header className="absolute top-0 left-0 right-0 flex items-center justify-between pt-4 px-4 md:px-6 z-10">
			<Link href="/dashboard">
				<Button size="icon" variant="outline">
					<ChevronLeft />
				</Button>
			</Link>
		</header>
	);
}
