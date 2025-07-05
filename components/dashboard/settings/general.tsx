"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	currency: z.string({
		required_error: "Please select a currency",
	}),
});

function General() {
	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get("/api/user");
			return res.data;
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: data ? { currency: data.currency || "USD" } : undefined,
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (payload: any) => {
			const res = await axios.put("/api/user", payload);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("Currency updated successfully", { richColors: true });
		},
		onError: () => {
			toast.error("Failed to update currency", { richColors: true });
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const payload = {
			currency: values.currency || data?.currency,
		};

		mutation.mutate(payload);
	};

	const currencies = useMemo(() => {
		const supportedCurrencies = Intl.supportedValuesOf("currency");

		return supportedCurrencies
			.map((currency) => {
				try {
					const displayNames = new Intl.DisplayNames(["en"], {
						type: "currency",
					});
					const name = displayNames.of(currency);

					return {
						value: currency,
						label: `${currency} - ${name}`,
						name: name || currency,
					};
				} catch (error) {
					return {
						value: currency,
						label: `${currency}`,
						name: currency,
					};
				}
			})
			.filter((currency) => currency.name !== currency.value)
			.sort((a, b) => a.value.localeCompare(b.value));
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>General</CardTitle>
						<CardDescription>
							Manage settings for your language and timezone
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="currency"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Currency</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={mutation.isPending}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="max-h-[300px]">
											{currencies.map(({ value, label }) => (
												<SelectItem key={value} value={value}>
													{label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex justify-end border-t">
						<Button
							type="submit"
							variant="outline"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? "Updating..." : "Update"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}

export default General;
