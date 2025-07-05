"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCard, Layers2 } from "lucide-react";
import { Badge } from "../ui/badge";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

function BalanceCard() {
	const { data, isPending } = useQuery({
		queryKey: ["accounts"],
		queryFn: async () => {
			const res = await axios.get("/api/accounts");
			return res.data;
		},
	});

	if (isPending) {
		return <Skeleton className="h-[200px] xl:h-[380px] w-full" />;
	}

	const formatAmount = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);

	const total =
		data.cash + data.debitCard + data.creditCard + data.savingsAccount;

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
				<CardTitle className="flex items-center gap-1.5">
					<Layers2 size={20} className="text-brand" /> Total Balance
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 xl:mt-36">
				<div className="flex gap-3">
					<span className="text-4xl font-semibold">{formatAmount(total)}</span>
					<div className="flex items-center gap-1 text-muted-foreground text-sm">
						<Badge variant="outline" className="text-brand-green">
							+0.87%
						</Badge>
					</div>
				</div>
				<p className="text-muted-foreground text-sm">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
					repellat corporis natus porro quis voluptas.
				</p>
			</CardContent>
		</Card>
	);
}

export default BalanceCard;
