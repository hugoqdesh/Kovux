"use client";

import { Area, AreaChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
	balance: {
		label: "balance",
	},
} satisfies ChartConfig;

export function ChartArea() {
	const [timeRange, setTimeRange] = useState("90d");

	const { data: transactions, isPending } = useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			const res = await axios.get("/api/transaction");
			return res.data;
		},
	});

	if (isPending)
		return (
			<Card>
				<CardHeader className="items-center pb-0 border-b">
					<CardTitle>Balance Overview</CardTitle>
				</CardHeader>
				<CardContent className="flex items-center justify-center h-64">
					<Skeleton className="w-full h-full" />
				</CardContent>
			</Card>
		);

	const dailyBalanceData = () => {
		const allTransactions = transactions
			.flatMap((group: { transactions: any[] }) => group.transactions)
			.sort(
				(a: { createdAt: string }, b: { createdAt: string }) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);

		const transactionsByDate = allTransactions.reduce(
			(acc: any, transaction: { createdAt: string }) => {
				const date = transaction.createdAt.split("T")[0];
				(acc[date] = acc[date] || []).push(transaction);
				return acc;
			},
			{}
		);

		const dailyData = [];
		let runningBalance = 0;
		const endDate = new Date();
		const startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000);

		for (
			let date = new Date(startDate);
			date <= endDate;
			date.setDate(date.getDate() + 1)
		) {
			const dateStr = date.toISOString().split("T")[0];

			(transactionsByDate[dateStr] || []).forEach((transaction: any) => {
				runningBalance +=
					transaction.type === "INCOME"
						? transaction.amount
						: -transaction.amount;
			});

			dailyData.push({ date: dateStr, balance: runningBalance });
		}

		return dailyData;
	};

	const chartData = dailyBalanceData();

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date();
		let daysToSubtract = 90;

		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}

		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card>
			<CardHeader className="flex items-center border-b pb-0">
				<CardTitle>Balance Overview</CardTitle>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="w-[160px] ml-auto"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="90d">Last 3 months</SelectItem>
						<SelectItem value="30d">Last 30 days</SelectItem>
						<SelectItem value="7d">Last 7 days</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px]">
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-blue-700)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-blue-700)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="balance"
							type="linear"
							fill="url(#fill)"
							stroke="var(--color-blue-700)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
