"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {
	Activity,
	Apple,
	BadgePlus,
	Banknote,
	BanknoteArrowDown,
	BanknoteArrowUp,
	BriefcaseBusiness,
	CreditCard,
	DollarSign,
	Drama,
	EyeClosed,
	Gift,
	House,
	IdCard,
	LibraryBig,
	PiggyBank,
	Plane,
	ReceiptText,
	Send,
	ShoppingBag,
	TrainFront,
	Wine,
} from "lucide-react";
import { toast } from "sonner";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
	amount: z.coerce.number().positive(),
	payment: z.string({ required_error: "Please select a payment method" }),
	type: z.string({
		required_error: "Please select a type",
	}),
	note: z.string().max(20).optional(),
	category: z.string({
		required_error: "Please select a category",
	}),
});

function Transaction() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (payload: any) => {
			const res = await axios.post("/api/transaction", payload);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["transaction"] });
			toast.success("New transaction made", { richColors: true });
			form.reset();
		},
		onError: () => {
			toast.error("Something went wrong!", { richColors: true });
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const formattedAmount = parseFloat(values.amount.toString()).toFixed(2);

		const payload = {
			amount: parseFloat(formattedAmount),
			method: values.payment,
			type: values.type,
			note: values.note,
			category: values.category,
		};

		mutation.mutate(payload);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="w-full">
					<BadgePlus className="-ms-1" />
					Quick Transaction
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Transaction</DialogTitle>
					<DialogDescription>Make a new income/expense</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												className="peer ps-9"
												placeholder="0.00"
												type="number"
												{...field}
												disabled={mutation.isPending}
												value={field.value ?? ""}
											/>
											<div className="text-brand pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
												<DollarSign size={16} aria-hidden="true" />
											</div>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="payment"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Payment Method</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={mutation.isPending}
										value={field.value ?? ""}
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Choose a payment method" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="CASH">
												<Banknote
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Cash</span>
											</SelectItem>
											<SelectItem value="DEBIT_CARD">
												<IdCard
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Debit Card</span>
											</SelectItem>
											<SelectItem value="CREDIT_CARD">
												<CreditCard
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Credit Card</span>
											</SelectItem>
											<SelectItem value="SAVINGS_ACCOUNT">
												<PiggyBank
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Savings Account</span>
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={mutation.isPending}
										value={field.value ?? ""}
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Choose a payment method" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="INCOME">
												<BanknoteArrowUp
													size={16}
													aria-hidden="true"
													className="text-brand-green"
												/>
												<span className="truncate">Income</span>
											</SelectItem>
											<SelectItem value="EXPENSE">
												<BanknoteArrowDown
													size={16}
													aria-hidden="true"
													className="text-brand-red"
												/>
												<span className="truncate">Expense</span>
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="note"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Note (optional)</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											disabled={mutation.isPending}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={mutation.isPending}
										value={field.value ?? ""}
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Choose a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Food & Drink">
												<Wine
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Food & Drink</span>
											</SelectItem>
											<SelectItem value="Shopping">
												<ShoppingBag
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Shopping</span>
											</SelectItem>
											<SelectItem value="Transport">
												<TrainFront
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Transport</span>
											</SelectItem>
											<SelectItem value="Home">
												<House
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Home</span>
											</SelectItem>
											<SelectItem value="Bills & Fees">
												<ReceiptText
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Bills & Fees</span>
											</SelectItem>
											<SelectItem value="Entertainment">
												<Drama
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Entertainment</span>
											</SelectItem>
											<SelectItem value="Travel">
												<Plane
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Travel</span>
											</SelectItem>
											<SelectItem value="Healthcare">
												<Activity
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Healthcare</span>
											</SelectItem>
											<SelectItem value="Education">
												<LibraryBig
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Education</span>
											</SelectItem>
											<SelectItem value="Groceries">
												<Apple
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Groceries</span>
											</SelectItem>
											<SelectItem value="Gifts">
												<Gift
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Gifts</span>
											</SelectItem>
											<SelectItem value="beauty">
												<EyeClosed
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Beauty</span>
											</SelectItem>
											<SelectItem value="Business">
												<BriefcaseBusiness
													size={16}
													aria-hidden="true"
													className="text-brand"
												/>
												<span className="truncate">Business</span>
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" disabled={mutation.isPending}>
									Cancel
								</Button>
							</DialogClose>
							<Button
								variant="outline"
								type="submit"
								disabled={mutation.isPending}
							>
								<Send className="-ms-1 text-brand" />
								{mutation.isPending ? "Submitting..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default Transaction;
