"use client";

import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Banknote, CreditCard, IdCard, PiggyBank, Tickets } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

function AccountCards() {
	const { data, isPending } = useQuery({
		queryKey: ["accounts"],
		queryFn: async () => {
			const res = await axios.get("/api/accounts");
			return res.data;
		},
	});

	if (isPending)
		return (
			<>
				<h2 className="font-semibold flex items-center gap-1.5">
					<Tickets size={20} className="text-brand" />
					My Accounts
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Skeleton className="h-[125px] w-full" />
					<Skeleton className="h-[125px] w-full" />
					<Skeleton className="h-[125px] w-full" />
					<Skeleton className="h-[125px] w-full" />
				</div>
			</>
		);

	const formatAmount = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);

	const formatChange = (percentChange: number) => {
		const isPositive = percentChange >= 0;
		const sign = isPositive ? "+" : "";
		const colorClass = isPositive ? "text-brand-green" : "text-brand-red";

		return {
			percentText: `${sign}${percentChange}%`,
			colorClass,
		};
	};

	return (
		<>
			<h2 className="font-semibold flex items-center gap-1.5">
				<Tickets size={20} className="text-brand" />
				My Accounts
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<Banknote size={20} className="text-brand" />
							Cash
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<Badge
								variant="outline"
								className={
									formatChange(data?.debitCardChange?.percentChange || 0)
										.colorClass
								}
							>
								{
									formatChange(data?.debitCardChange?.percentChange || 0)
										.percentText
								}
							</Badge>
							from last month
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">
							{formatAmount(data.cash)}
						</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<IdCard size={20} className="text-brand" />
							Debit Card
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<Badge
								variant="outline"
								className={
									formatChange(data?.debitCardChange?.percentChange || 0)
										.colorClass
								}
							>
								{
									formatChange(data?.debitCardChange?.percentChange || 0)
										.percentText
								}
							</Badge>
							from last month
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">
							{formatAmount(data.debitCard)}
						</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<CreditCard size={20} className="text-brand" />
							Credit Card
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<Badge
								variant="outline"
								className={
									formatChange(data?.debitCardChange?.percentChange || 0)
										.colorClass
								}
							>
								{
									formatChange(data?.debitCardChange?.percentChange || 0)
										.percentText
								}
							</Badge>
							from last month
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">
							{formatAmount(data.creditCard)}
						</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<PiggyBank size={20} className="text-brand" />
							Savings Account
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<Badge
								variant="outline"
								className={
									formatChange(data?.debitCardChange?.percentChange || 0)
										.colorClass
								}
							>
								{
									formatChange(data?.debitCardChange?.percentChange || 0)
										.percentText
								}
							</Badge>
							from last month
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">
							{formatAmount(data.savingsAccount)}
						</span>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default AccountCards;
