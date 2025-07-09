import BackBtn from "@/components/dashboard/back-btn";
import ExpenseTransaction from "@/components/dashboard/expense-transaction";

export default function Expense() {
	return (
		<main className="flex items-center min-h-screen max-w-2xl mx-auto">
			<BackBtn />

			<ExpenseTransaction />
		</main>
	);
}
