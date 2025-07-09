import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col gap-4 items-center justify-center min-h-screen px-6">
			<h1 className="font-semibold text-2xl md:text-3xl max-w-3xl text-center">
				Minimal Open-Source Solution for Tracking Personal Finances & Making
				Better Decisions
			</h1>
			<p className="text-muted-foreground">Being developed, so stay tuned!</p>

			<div className="flex items-center gap-4">
				{/* <Link href="https://x.com/hugoqdesh" target="_blank">
					<Button variant="outline">View X for more info</Button>
				</Link> */}

				<Link href="https://github.com/hugoqdesh/kovux" target="_blank">
					<Button variant="outline">
						<Github />
						GitHub
					</Button>
				</Link>
			</div>
		</main>
	);
}
