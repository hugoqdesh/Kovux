"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import { Wallet } from "lucide-react";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const chartData = [
	{ date: "2024-04-01", balance: 222 },
	{ date: "2024-04-02", balance: 97 },
	{ date: "2024-04-03", balance: 167 },
	{ date: "2024-04-04", balance: 242 },
	{ date: "2024-04-05", balance: 373 },
	{ date: "2024-04-06", balance: 301 },
	{ date: "2024-04-07", balance: 245 },
	{ date: "2024-04-08", balance: 409 },
	{ date: "2024-04-09", balance: 59 },
	{ date: "2024-04-10", balance: 261 },
	{ date: "2024-04-11", balance: 327 },
	{ date: "2024-04-12", balance: 292 },
	{ date: "2024-04-13", balance: 342 },
	{ date: "2024-04-14", balance: 137 },
	{ date: "2024-04-15", balance: 120 },
	{ date: "2024-04-16", balance: 138 },
	{ date: "2024-04-17", balance: 446 },
	{ date: "2024-04-18", balance: 364 },
	{ date: "2024-04-19", balance: 243 },
	{ date: "2024-04-20", balance: 89 },
	{ date: "2024-04-21", balance: 137 },
	{ date: "2024-04-22", balance: 224 },
	{ date: "2024-04-23", balance: 138 },
	{ date: "2024-04-24", balance: 387 },
	{ date: "2024-04-25", balance: 215 },
	{ date: "2024-04-26", balance: 75 },
	{ date: "2024-04-27", balance: 383 },
	{ date: "2024-04-28", balance: 122 },
	{ date: "2024-04-29", balance: 315 },
	{ date: "2024-04-30", balance: 454 },
	{ date: "2024-05-01", balance: 165 },
	{ date: "2024-05-02", balance: 293 },
	{ date: "2024-05-03", balance: 247 },
	{ date: "2024-05-04", balance: 385 },
	{ date: "2024-05-05", balance: 481 },
	{ date: "2024-05-06", balance: 498 },
	{ date: "2024-05-07", balance: 388 },
	{ date: "2024-05-08", balance: 149 },
	{ date: "2024-05-09", balance: 227 },
	{ date: "2024-05-10", balance: 293 },
	{ date: "2024-05-11", balance: 335 },
	{ date: "2024-05-12", balance: 197 },
	{ date: "2024-05-13", balance: 197 },
	{ date: "2024-05-14", balance: 448 },
	{ date: "2024-05-15", balance: 473 },
	{ date: "2024-05-16", balance: 338 },
	{ date: "2024-05-17", balance: 499 },
	{ date: "2024-05-18", balance: 315 },
	{ date: "2024-05-19", balance: 235 },
	{ date: "2024-05-20", balance: 177 },
	{ date: "2024-05-21", balance: 82 },
	{ date: "2024-05-22", balance: 81 },
	{ date: "2024-05-23", balance: 252 },
	{ date: "2024-05-24", balance: 294 },
	{ date: "2024-05-25", balance: 201 },
	{ date: "2024-05-26", balance: 213 },
	{ date: "2024-05-27", balance: 420 },
	{ date: "2024-05-28", balance: 233 },
	{ date: "2024-05-29", balance: 78 },
	{ date: "2024-05-30", balance: 340 },
	{ date: "2024-05-31", balance: 178 },
	{ date: "2024-06-01", balance: 178 },
	{ date: "2024-06-02", balance: 470 },
	{ date: "2024-06-03", balance: 103 },
	{ date: "2024-06-04", balance: 439 },
	{ date: "2024-06-05", balance: 88 },
	{ date: "2024-06-06", balance: 294 },
	{ date: "2024-06-07", balance: 323 },
	{ date: "2024-06-08", balance: 385 },
	{ date: "2024-06-09", balance: 438 },
	{ date: "2024-06-10", balance: 155 },
	{ date: "2024-06-11", balance: 92 },
	{ date: "2024-06-12", balance: 492 },
	{ date: "2024-06-13", balance: 81 },
	{ date: "2024-06-14", balance: 426 },
	{ date: "2024-06-15", balance: 307 },
	{ date: "2024-06-16", balance: 371 },
	{ date: "2024-06-17", balance: 475 },
	{ date: "2024-06-18", balance: 107 },
	{ date: "2024-06-19", balance: 341 },
	{ date: "2024-06-20", balance: 408 },
	{ date: "2024-06-21", balance: 169 },
	{ date: "2024-06-22", balance: 317 },
	{ date: "2024-06-23", balance: 480 },
	{ date: "2024-06-24", balance: 132 },
	{ date: "2024-06-25", balance: 141 },
	{ date: "2024-06-26", balance: 434 },
	{ date: "2024-06-27", balance: 448 },
	{ date: "2024-06-28", balance: 149 },
	{ date: "2024-06-29", balance: 103 },
	{ date: "2024-06-30", balance: 446 },
];

const chartConfig = {
	balance: {
		label: "Balance",
		color: "var(--brand)",
	},
} satisfies ChartConfig;

export function ChartBalance() {
	const [timeRange, setTimeRange] = useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2024-06-30");
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
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<CardTitle className="flex items-center gap-1.5">
					<Wallet size={20} className="text-brand" />
					Account balance
				</CardTitle>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="hidden sm:ml-auto sm:flex"
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
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-balance)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-balance)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<defs>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
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
									labelFormatter={(value: any) => {
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
							type="natural"
							fill="url(#fillDesktop)"
							stroke="var(--color-balance)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
