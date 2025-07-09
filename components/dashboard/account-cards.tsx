"use client";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Banknote, CreditCard, IdCard, PiggyBank, Undo2 } from "lucide-react";
import BackBtn from "./back-btn";
import { Skeleton } from "../ui/skeleton";

export default function AccountCards() {
	const { data, isPending } = useQuery({
		queryKey: ["accounts"],
		queryFn: async () => {
			const res = await axios.get("/api/accounts");
			return res.data;
		},
	});

	if (isPending)
		return (
			<div className="flex flex-col gap-4 items-center justify-center min-h-screen max-w-xl mx-auto px-2 md:px-0">
				<Skeleton className="h-[75px] w-full" />
				<Skeleton className="h-[75px] w-full" />
				<Skeleton className="h-[75px] w-full" />
				<Skeleton className="h-[75px] w-full" />
			</div>
		);

	const formatAmount = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);

	return (
		<div className="flex flex-col gap-4 items-center justify-center min-h-screen max-w-xl mx-auto px-2 md:px-0">
			<Card className="w-full">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="flex items-center gap-1.5">
						<Banknote size={20} className="opacity-60" />
						Cash
					</CardTitle>
					<CardAction>
						<span className="font-semibold">{formatAmount(data.cash)}</span>
					</CardAction>
				</CardHeader>
			</Card>

			<Card className="w-full">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="flex items-center gap-1.5">
						<IdCard size={20} className="opacity-60" />
						Debit Card
					</CardTitle>
					<CardAction>
						<span className="font-semibold">
							{formatAmount(data.debitCard)}
						</span>
					</CardAction>
				</CardHeader>
			</Card>

			<Card className="w-full">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="flex items-center gap-1.5">
						<CreditCard size={20} className="opacity-60" />
						Credit Card
					</CardTitle>
					<CardAction>
						<span className="font-semibold">
							{formatAmount(data.creditCard)}
						</span>
					</CardAction>
				</CardHeader>
			</Card>

			<Card className="w-full">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="flex items-center gap-1.5">
						<PiggyBank size={20} className="opacity-60" />
						Savings Account
					</CardTitle>
					<CardAction>
						<span className="font-semibold">
							{formatAmount(data.savingsAccount)}
						</span>
					</CardAction>
				</CardHeader>
			</Card>
		</div>
	);
}
