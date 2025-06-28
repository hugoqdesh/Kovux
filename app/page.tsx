import Counter from "@/components/counter";
import Header from "@/components/header";
import { DotPattern } from "@/components/ui/dot-pattern";
import Waitlist from "@/components/waitlist";

export default function Home() {
	return (
		<>
			<DotPattern
				width={20}
				height={20}
				cx={1}
				cy={1}
				cr={1}
				className="opacity-30 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
			/>

			<header>
				<Header />
			</header>

			<main className="flex flex-col items-center justify-center h-[45rem] text-center px-6 md:px-0">
				<div className="flex flex-col gap-4 mb-4 max-w-2xl">
					<h1 className="text-3xl md:text-4xl font-semibold">
						Clean finance for clear minds
					</h1>
					<p className="text-muted-foreground text-sm md:text-base">
						Skip the spreadsheets and complexity. Automatically{" "}
						<span className="text-primary">track</span>,{" "}
						<span className="text-primary">understand</span>, and{" "}
						<span className="text-primary">control</span> your income/expenses.
						All from one clean, modern open-source place.
					</p>
				</div>

				<Waitlist />
				<Counter />
			</main>
		</>
	);
}
