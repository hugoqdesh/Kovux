"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export default function TransactionTable() {
	const { data, isPending } = useQuery({
		queryKey: ["transaction"],
		queryFn: async () => {
			const res = await axios.get("/api/transaction");
			return res.data;
		},
	});

	if (isPending) {
		return <Skeleton className="h-[200px] xl:h-[380px] w-full" />;
	}

	return (
		<div className="bg-background overflow-hidden rounded-md border">
			<Table>
				<TableHeader>
					<TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
						<TableHead className="h-11">Date</TableHead>
						<TableHead className="h-11">Category</TableHead>
						<TableHead className="h-11">Type</TableHead>
						<TableHead className="h-11">Payment Method</TableHead>
						<TableHead className="h-11">Amount</TableHead>
						<TableHead className="h-11">Note</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
					{data.map((item: any) => (
						<TableRow
							key={item.id}
							className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
						>
							<TableCell>
								{new Date(item.createdAt).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									hour: "numeric",
									minute: "2-digit",
									hour12: true,
								})}
							</TableCell>
							<TableCell>{item.category}</TableCell>
							<TableCell>
								{item.type.charAt(0).toUpperCase() +
									item.type.slice(1).toLowerCase()}
							</TableCell>
							<TableCell>
								{item.method
									.replace(/_/g, " ")
									.toLowerCase()
									.replace(/\b\w/g, (l: string) => l.toUpperCase())}
							</TableCell>
							<TableCell>
								{item.type === "INCOME" ? "+" : "-"}${item.amount.toFixed(2)}
							</TableCell>
							<TableCell>{item.note || "-"}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
