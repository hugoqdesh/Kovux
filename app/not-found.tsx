import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
	return (
		<div className="relative text-center z-[1] pt-52">
			<h1 className="mt-4 text-balance text-5xl font-semibold text-primary sm:text-7xl">
				Page not found
			</h1>
			<p className="mt-6 font-medium text-muted-foreground sm:text-xl/8">
				Lost, this page is. In another system, it may be.
			</p>

			<div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6">
				<Button className="-order-1 sm:order-none" asChild>
					<Link href="/dashboard">Take me to dashboard</Link>
				</Button>
			</div>
		</div>
	);
}
