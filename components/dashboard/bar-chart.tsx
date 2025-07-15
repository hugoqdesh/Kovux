"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ month: "January", income: 186, expense: 80 },
	{ month: "February", income: 305, expense: 200 },
	{ month: "March", income: 237, expense: 120 },
	{ month: "April", income: 73, expense: 190 },
	{ month: "May", income: 209, expense: 130 },
	{ month: "June", income: 214, expense: 140 },
];

const chartConfig = {
	income: {
		label: "Income",
	},
	expense: {
		label: "Expense",
	},
} satisfies ChartConfig;

export function ChartBarMultiple() {
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
						<Bar dataKey="income" fill="var(--color-green-600)" radius={4} />
						<Bar dataKey="expense" fill="var(--color-red-600)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
