import TransactionTable from "@/components/dashboard/transaction-table";

export default function TransactionsPage() {
	return (
		<main className="flex flex-col gap-4 px-6 py-4 md:py-6">
			<TransactionTable />
		</main>
	);
}
