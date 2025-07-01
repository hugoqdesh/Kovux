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
	Plane,
	ReceiptText,
	Send,
	ShoppingBag,
	TrainFront,
	Wine,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";

const formSchema = z.object({
	amount: z.coerce.number().positive(),
	payment: z.string({ required_error: "Please select a payment method" }),
	note: z.string().max(50).optional(),
	category: z.string({
		required_error: "Please select a category",
	}),
});

function Transaction() {
	const [entryType, setEntryType] = useState<"expense" | "income">("expense");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 0,
			note: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const formattedAmount = parseFloat(values.amount.toString()).toFixed(2);

			const payload = {
				...values,
				amount: parseFloat(formattedAmount),
				type: entryType,
			};

			console.log(payload);
			toast.success("Event has been created", {
				richColors: true,
			});
		} catch (error) {
			console.log("Form submission error", error);
			toast.error("Something went wrong!", {
				richColors: true,
			});
		}
	}

	return (
		<Tabs
			value={entryType}
			onValueChange={(val) => setEntryType(val as "expense" | "income")}
			defaultValue="expense"
			className="max-w-xl mx-auto w-full space-y-6"
		>
			<TabsList>
				<TabsTrigger value="expense">
					<BanknoteArrowDown
						className="-ms-0.5 me-0.5 opacity-60"
						size={16}
						aria-hidden="true"
					/>
					Expense
				</TabsTrigger>
				<TabsTrigger value="income">
					<BanknoteArrowUp
						className="-ms-0.5 me-0.5 opacity-60"
						size={16}
						aria-hidden="true"
					/>
					Income
				</TabsTrigger>
			</TabsList>
			<TabsContent value="expense">
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
											/>
											<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
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
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Choose a payment method" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="credit card">
												<CreditCard size={16} aria-hidden="true" />
												<span className="truncate">Credit Card</span>
											</SelectItem>
											<SelectItem value="debit card">
												<IdCard size={16} aria-hidden="true" />
												<span className="truncate">Debit Card</span>
											</SelectItem>
											<SelectItem value="cash">
												<Banknote size={16} aria-hidden="true" />
												<span className="truncate">Cash</span>
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
										<Input type="text" {...field} />
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
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Choose a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="food & drink">
												<Wine size={16} aria-hidden="true" />
												<span className="truncate">Food & Drink</span>
											</SelectItem>
											<SelectItem value="shopping">
												<ShoppingBag size={16} aria-hidden="true" />
												<span className="truncate">Shopping</span>
											</SelectItem>
											<SelectItem value="transport">
												<TrainFront size={16} aria-hidden="true" />
												<span className="truncate">Transport</span>
											</SelectItem>
											<SelectItem value="home">
												<House size={16} aria-hidden="true" />
												<span className="truncate">Home</span>
											</SelectItem>
											<SelectItem value="bills & fees">
												<ReceiptText size={16} aria-hidden="true" />
												<span className="truncate">Bills & Fees</span>
											</SelectItem>
											<SelectItem value="entertainment">
												<Drama size={16} aria-hidden="true" />
												<span className="truncate">Entertainment</span>
											</SelectItem>
											<SelectItem value="travel">
												<Plane size={16} aria-hidden="true" />
												<span className="truncate">Travel</span>
											</SelectItem>
											<SelectItem value="healthcare">
												<Activity size={16} aria-hidden="true" />
												<span className="truncate">Healthcare</span>
											</SelectItem>
											<SelectItem value="education">
												<LibraryBig size={16} aria-hidden="true" />
												<span className="truncate">Education</span>
											</SelectItem>
											<SelectItem value="groceries">
												<Apple size={16} aria-hidden="true" />
												<span className="truncate">Groceries</span>
											</SelectItem>
											<SelectItem value="gifts">
												<Gift size={16} aria-hidden="true" />
												<span className="truncate">Gifts</span>
											</SelectItem>
											<SelectItem value="beauty">
												<EyeClosed size={16} aria-hidden="true" />
												<span className="truncate">Beauty</span>
											</SelectItem>
											<SelectItem value="business">
												<BriefcaseBusiness size={16} aria-hidden="true" />
												<span className="truncate">Business</span>
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button variant="secondary" type="submit">
							<Send className="-ms-1" />
							Submit
						</Button>
					</form>
				</Form>
			</TabsContent>
			<TabsContent value="income">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 max-w-xl mx-auto w-full"
					>
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
											/>
											<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
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
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Choose a payment method" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="credit card">
												<CreditCard size={16} aria-hidden="true" />
												<span className="truncate">Credit Card</span>
											</SelectItem>
											<SelectItem value="debit card">
												<IdCard size={16} aria-hidden="true" />
												<span className="truncate">Debit Card</span>
											</SelectItem>
											<SelectItem value="cash">
												<Banknote size={16} aria-hidden="true" />
												<span className="truncate">Cash</span>
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
										<Input type="text" {...field} />
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
									>
										<FormControl className="w-full">
											<SelectTrigger>
												<SelectValue placeholder="Choose a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="salary">
												<BanknoteArrowUp size={16} aria-hidden="true" />
												<span className="truncate">Salary</span>
											</SelectItem>
											<SelectItem value="gift">
												<Gift size={16} aria-hidden="true" />
												<span className="truncate">Gift</span>
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button variant="secondary" type="submit">
							<Send className="-ms-1" />
							Submit
						</Button>
					</form>
				</Form>
			</TabsContent>
		</Tabs>
	);
}

export default Transaction;
