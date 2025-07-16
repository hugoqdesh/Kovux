"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRightLeft, ChartPie, Wallet } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function TotalBalance() {
	const { data, isPending } = useQuery({
		queryKey: ["accounts"],
		queryFn: async () => {
			const res = await axios.get("/api/accounts");
			return res.data;
		},
	});

	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get("/api/user");
			return res.data;
		},
	});

	if (isPending) {
		return (
			<div className="flex flex-col gap-2 items-center justify-center mx-auto">
				<Skeleton className="h-[100px] w-[350px] md:w-[400px]" />
				<div className="flex items-center gap-4 mt-2">
					<Skeleton className="h-[35px] w-[130px]" />
					<Skeleton className="h-[35px] w-[130px]" />
				</div>
				<div className="flex items-center gap-4 mt-2">
					<Skeleton className="h-[35px] w-[100px] md:w-[130px]" />
					<Skeleton className="h-[35px] w-[100px] md:w-[130px]" />
					<Skeleton className="h-[35px] w-[100px] md:w-[130px]" />
				</div>
			</div>
		);
	}

	const formatAmount = (amount: number) => {
		const currency = user?.currency || "USD";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency,
		}).format(amount);
	};

	const total =
		data.cash + data.debitCard + data.creditCard + data.savingsAccount;

	return (
		<section className="flex flex-col gap-2 items-center justify-center mx-auto">
			<h1 className="text-7xl md:text-8xl font-semibold select-none">
				{formatAmount(total)}
			</h1>
			<div className="flex items-center gap-4 mt-4">
				<Link href="dashboard/expense">
					<Button variant="red">Add Expense</Button>
				</Link>
				<Link href="dashboard/income">
					<Button variant="green">Add Income</Button>
				</Link>
			</div>

			<div className="flex items-center gap-4 mt-2">
				<Link href="dashboard/accounts" className="mt-2">
					<Button variant="ghost" size="sm">
						<Wallet className="-ms-1" />
						Accounts
					</Button>
				</Link>

				<Link href="dashboard/transactions" className="mt-2">
					<Button variant="ghost" size="sm">
						<ArrowRightLeft className="-ms-1" />
						Transactions
					</Button>
				</Link>

				<Link href="dashboard/analytics" className="mt-2">
					<Button variant="ghost" size="sm">
						<ChartPie className="-ms-1" />
						Analytics
					</Button>
				</Link>
			</div>
		</section>
	);
}
