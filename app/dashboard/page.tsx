import Header from "@/components/dashboard/header";
import TotalBalance from "@/components/dashboard/total-balance";

export default function Dashboard() {
	return (
		<>
			<Header />
			<main className="flex min-h-screen">
				<TotalBalance />
			</main>
		</>
	);
}
