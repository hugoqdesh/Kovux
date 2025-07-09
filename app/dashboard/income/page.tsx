import BackBtn from "@/components/dashboard/back-btn";
import IncomeTransaction from "@/components/dashboard/income-transaction";

export default function Income() {
	return (
		<main className="flex items-center min-h-screen max-w-2xl mx-auto">
			<BackBtn />

			<IncomeTransaction />
		</main>
	);
}
