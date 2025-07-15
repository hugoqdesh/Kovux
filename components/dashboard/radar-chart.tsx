"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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
	category: {
		label: "Category",
	},
} satisfies ChartConfig;

export function ChartRadar() {
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
					<CardTitle>Category Breakdown</CardTitle>
				</CardHeader>
				<CardContent className="flex items-center justify-center h-64">
					<Skeleton className="w-full h-full" />
				</CardContent>
			</Card>
		);

	const categoryTotals: { [key: string]: number } = {};

	data?.forEach((group: any) => {
		group.transactions.forEach((transaction: any) => {
			if (transaction.type === "EXPENSE" && transaction.category) {
				categoryTotals[transaction.category] =
					(categoryTotals[transaction.category] || 0) + transaction.amount;
			}
		});
	});

	const chartData = Object.entries(categoryTotals).map(
		([category, amount]) => ({
			category,
			amount,
		})
	);

	return (
		<Card>
			<CardHeader className="items-center pb-0 border-b">
				<CardTitle>Category Breakdown</CardTitle>
			</CardHeader>
			<CardContent className="pb-0">
				<ChartContainer config={chartConfig}>
					<RadarChart data={chartData}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<PolarAngleAxis dataKey="category" />
						<PolarGrid />
						<Radar
							dataKey="amount"
							fill="var(--color-blue-600)"
							fillOpacity={0.6}
						/>
					</RadarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
