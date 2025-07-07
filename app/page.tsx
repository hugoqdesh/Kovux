import Demo from "@/components/waitlist/demo";
import Header from "@/components/waitlist/header";
import Waitlist from "@/components/waitlist/waitlist";

export default function Home() {
	return (
		<>
			<header>
				<Header />
			</header>

			<main className="flex flex-col items-center justify-center mt-[12rem] text-center px-6 md:px-0 gap-32">
				<section className="flex flex-col items-center gap-4 max-w-2xl">
					<h1 className="text-2xl md:text-4xl font-semibold">
						Your Open-Source Solution to{" "}
						<span className="text-brand">Financial Chaos</span>
					</h1>
					<p className="text-muted-foreground text-sm md:text-base">
						An open-source personal finance management designed to help you{" "}
						<span className="text-brand">manage expenses</span>,{" "}
						<span className="text-brand">track income</span>, and{" "}
						<span className="text-brand">build wealth</span> through smart
						financial decisions.
					</p>

					<Waitlist />
				</section>

				<Demo />

				<footer className="bg-background py-12">
					<div className="mx-auto max-w-5xl px-6">
						<span className="text-muted-foreground block text-center text-sm">
							© {new Date().getFullYear()} Kovux, All rights reserved
						</span>
					</div>
				</footer>
			</main>
		</>
	);
}
