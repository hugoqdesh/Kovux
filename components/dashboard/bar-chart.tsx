"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
	income: {
		label: "income",
	},
	expense: {
		label: "expense",
	},
} satisfies ChartConfig;

export function ChartBar() {
	const { data, isPending } = useQuery({
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
					<CardTitle>Income vs Expense</CardTitle>
				</CardHeader>
				<CardContent className="flex items-center justify-center h-64">
					<Skeleton className="w-full h-full" />
				</CardContent>
			</Card>
		);

	const chartData =
		data?.map((group: any) => ({
			month: group.label,

			income: group.transactions
				.filter((transaction: any) => transaction.type === "INCOME")
				.reduce((sum: number, transaction: any) => sum + transaction.amount, 0),

			expense: group.transactions
				.filter((transaction: any) => transaction.type === "EXPENSE")
				.reduce((sum: number, transaction: any) => sum + transaction.amount, 0),
		})) || [];

	return (
		<Card>
			<CardHeader className="items-center pb-0 border-b">
				<CardTitle>Income vs Expense</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dot" />}
						/>
						<Bar dataKey="income" fill="var(--color-green-700)" radius={4} />
						<Bar dataKey="expense" fill="var(--color-red-700)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
