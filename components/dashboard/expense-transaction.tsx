"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Banknote,
	BriefcaseBusiness,
	CarTaxiFront,
	CreditCard,
	DollarSign,
	Drama,
	Dumbbell,
	EyeClosed,
	Gift,
	Guitar,
	HeartPulse,
	House,
	IdCard,
	PawPrint,
	PersonStanding,
	PiggyBank,
	Plane,
	Send,
	Shirt,
	ShoppingBasket,
	ShoppingCart,
	TicketMinus,
	UtilityPole,
	Wine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const formSchema = z.object({
	amount: z.coerce.number().positive(),
	payment: z.string().min(1, "Please select a payment method"),
	category: z.string().min(1, "Please select a category"),
});

export default function ExpenseTransaction() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			payment: "",
			category: "",
		},
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
			toast.success("New expense added", { richColors: true });
			form.reset();
		},
		onError: () => {
			toast.error("Something went wrong! Try again", { richColors: true });
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const formattedAmount = parseFloat(values.amount.toString()).toFixed(2);

		const payload = {
			amount: parseFloat(formattedAmount),
			method: values.payment,
			category: values.category,
			type: "EXPENSE",
		};

		mutation.mutate(payload);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full px-4 md:px-0"
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
										disabled={mutation.isPending}
										value={field.value ?? ""}
									/>
									<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
										<DollarSign
											size={16}
											aria-hidden="true"
											className="opacity-60 text-red-600 dark:text-red-400"
										/>
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
							<FormControl>
								<RadioGroup
									value={field.value}
									onValueChange={field.onChange}
									disabled={mutation.isPending}
									className="gird grid-cols-2"
								>
									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="CASH"
											id="CASH"
											className="sr-only"
										/>
										<Banknote size={20} aria-hidden="true" />
										<Label
											htmlFor="CASH"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Cash
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="DEBIT_CARD"
											id="DEBIT_CARD"
											className="sr-only"
										/>
										<IdCard size={20} aria-hidden="true" />
										<Label
											htmlFor="DEBIT_CARD"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Debit Card
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="CREDIT_CARD"
											id="CREDIT_CARD"
											className="sr-only"
										/>
										<CreditCard size={20} aria-hidden="true" />
										<Label
											htmlFor="CREDIT_CARD"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Credit Card
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="SAVINGS_ACCOUNT"
											id="SAVINGS_ACCOUNT"
											className="sr-only"
										/>
										<PiggyBank size={20} aria-hidden="true" />
										<Label
											htmlFor="SAVINGS_ACCOUNT"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Savings Account
										</Label>
									</div>
								</RadioGroup>
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
							<FormControl>
								<RadioGroup
									value={field.value}
									onValueChange={field.onChange}
									disabled={mutation.isPending}
									className="grid grid-cols-4"
								>
									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Rent"
											id="Rent"
											className="sr-only"
										/>
										<House size={20} aria-hidden="true" />
										<Label
											htmlFor="Rent"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Rent
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Utilities"
											id="Utilities"
											className="sr-only"
										/>
										<UtilityPole size={20} aria-hidden="true" />
										<Label
											htmlFor="Utilities"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Utilities
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Transport"
											id="Transport"
											className="sr-only"
										/>
										<CarTaxiFront size={20} aria-hidden="true" />
										<Label
											htmlFor="Transport"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Transport
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Groceries"
											id="Groceries"
											className="sr-only"
										/>
										<ShoppingBasket size={20} aria-hidden="true" />
										<Label
											htmlFor="Groceries"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Groceries
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Eating Out"
											id="Eating Out"
											className="sr-only"
										/>
										<Wine size={20} aria-hidden="true" />
										<Label
											htmlFor="Eating Out"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Eating Out
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Healthcare"
											id="Healthcare"
											className="sr-only"
										/>
										<HeartPulse size={20} aria-hidden="true" />
										<Label
											htmlFor="Healthcare"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Healthcare
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Hobbies"
											id="Hobbies"
											className="sr-only"
										/>
										<Guitar size={20} aria-hidden="true" />
										<Label
											htmlFor="Hobbies"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Hobbies
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Personal"
											id="Personal"
											className="sr-only"
										/>
										<EyeClosed size={20} aria-hidden="true" />
										<Label
											htmlFor="Personal"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Personal
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Clothes"
											id="Clothes"
											className="sr-only"
										/>
										<Shirt size={20} aria-hidden="true" />
										<Label
											htmlFor="Clothes"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Clothes
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Entertainment"
											id="Entertainment"
											className="sr-only"
										/>
										<Drama size={20} aria-hidden="true" />
										<Label
											htmlFor="Entertainment"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Entertainment
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Shopping"
											id="Shopping"
											className="sr-only"
										/>
										<ShoppingCart size={20} aria-hidden="true" />
										<Label
											htmlFor="Shopping"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Shopping
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Pets"
											id="Pets"
											className="sr-only"
										/>
										<PawPrint size={20} aria-hidden="true" />
										<Label
											htmlFor="Pets"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Pets
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Travel"
											id="Travel"
											className="sr-only"
										/>
										<Plane size={20} aria-hidden="true" />
										<Label
											htmlFor="Travel"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Travel
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Gifts"
											id="Gifts"
											className="sr-only"
										/>
										<Gift size={20} aria-hidden="true" />
										<Label
											htmlFor="Gifts"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Gifts
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Work"
											id="Work"
											className="sr-only"
										/>
										<BriefcaseBusiness size={20} aria-hidden="true" />
										<Label
											htmlFor="Work"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Work
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-red-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Miscellaneous"
											id="Miscellaneous"
											className="sr-only"
										/>
										<TicketMinus size={20} aria-hidden="true" />
										<Label
											htmlFor="Miscellaneous"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Miscellaneous
										</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button variant="red" type="submit" disabled={mutation.isPending}>
					<Send className="-ms-1" />
					{mutation.isPending ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
