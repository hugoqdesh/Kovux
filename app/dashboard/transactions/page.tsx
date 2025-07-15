"use client";

import BackBtn from "@/components/dashboard/back-btn";
import TransactionCards from "@/components/dashboard/transaction-cards";

export default function Transactions() {
	return (
		<main className="flex flex-col justify-center gap-6 items-center py-32 max-w-2xl mx-auto">
			<BackBtn />
			<TransactionCards />
		</main>
	);
}
