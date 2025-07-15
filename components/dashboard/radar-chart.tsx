"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ category: "Rent", amount: 186 },
	{ category: "Clothes", amount: 305 },
	{ category: "Pets", amount: 237 },
	{ category: "Work", amount: 273 },
	{ category: "Gifts", amount: 209 },
	{ category: "Transport", amount: 214 },
];

const chartConfig = {
	category: {
		label: "Category",
	},
} satisfies ChartConfig;

export function ChartRadarDefault() {
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
