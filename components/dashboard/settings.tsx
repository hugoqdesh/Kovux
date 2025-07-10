"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Bolt } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const currencies = [
	{ code: "USD", name: "US Dollar" },
	{ code: "EUR", name: "Euro" },
	{ code: "GBP", name: "British Pound" },
	{ code: "JPY", name: "Japanese Yen" },
	{ code: "CAD", name: "Canadian Dollar" },
	{ code: "AUD", name: "Australian Dollar" },
	{ code: "CHF", name: "Swiss Franc" },
	{ code: "CNY", name: "Chinese Yuan" },
	{ code: "INR", name: "Indian Rupee" },
	{ code: "KRW", name: "South Korean Won" },
];

export default function Settings() {
	const [selectedCurrency, setSelectedCurrency] = useState("");
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get("/api/user");
			return res.data;
		},
	});

	const mutation = useMutation({
		mutationFn: async (currency: string) => {
			const res = await axios.post("/api/user", { currency });
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
	});

	const handleSave = () => {
		if (selectedCurrency) {
			mutation.mutate(selectedCurrency);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<Bolt />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription>
						Make change here. Click save when you&apos;re done.
					</SheetDescription>
				</SheetHeader>

				<div className="grid flex-1 auto-rows-min gap-6 px-4">
					<div className="grid gap-3">
						<Label htmlFor="sheet-demo-name">Currency</Label>
						<Select
							value={selectedCurrency || data?.currency || "USD"}
							onValueChange={setSelectedCurrency}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a currency" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{currencies.map((currency) => (
										<SelectItem key={currency.code} value={currency.code}>
											{currency.code} - {currency.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<SheetFooter>
					<Button
						type="submit"
						onClick={handleSave}
						disabled={mutation.isPending}
					>
						Save changes
					</Button>
					<SheetClose asChild>
						<Button variant="outline" disabled={mutation.isPending}>
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
