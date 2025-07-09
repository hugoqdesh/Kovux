"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { BanknoteArrowDown, BanknoteArrowUp, Wallet } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function TotalBalance() {
	const { data, isPending } = useQuery({
		queryKey: ["accounts"],
		queryFn: async () => {
			const res = await axios.get("/api/accounts");
			return res.data;
		},
	});

	if (isPending) {
		return (
			<div className="flex flex-col gap-2 items-center justify-center mx-auto">
				<Skeleton className="h-[100px] w-[400px]" />
				<div className="flex items-center gap-4 mt-2">
					<Skeleton className="h-[35px] w-[130px]" />
					<Skeleton className="h-[35px] w-[130px]" />
				</div>
				<Skeleton className="h-[35px] w-[130px] mt-2" />
			</div>
		);
	}

	const formatAmount = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);

	const total =
		data.cash + data.debitCard + data.creditCard + data.savingsAccount;

	return (
		<section className="flex flex-col gap-2 items-center justify-center mx-auto">
			<h1 className="text-7xl md:text-8xl font-semibold">
				{formatAmount(total)}
			</h1>

			<div className="flex items-center gap-4 mt-4">
				<Link href="dashboard/expense">
					<Button variant="outline">
						<BanknoteArrowDown className="-ms-1 text-brand opacity-60" />
						Add Expense
					</Button>
				</Link>
				<Link href="dashboard/income">
					<Button variant="outline">
						<BanknoteArrowUp className="-ms-1 text-brand opacity-60" />
						Add Income
					</Button>
				</Link>
			</div>

			<Link href="dashboard/accounts" className="mt-2">
				<Button variant="outline">
					<Wallet className="-ms-1 text-brand opacity-60" />
					View Accounts
				</Button>
			</Link>
		</section>
	);
}
