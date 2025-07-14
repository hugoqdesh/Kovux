"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Banknote,
	Building2,
	ChartNoAxesCombined,
	CreditCard,
	DollarSign,
	Handshake,
	IdCard,
	IdCardLanyard,
	Landmark,
	PiggyBank,
	Send,
	Tags,
	Target,
	TicketPlus,
	TicketSlash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
	amount: z.coerce.number().positive(),
	payment: z.string().min(1, "Please select a payment method"),
	category: z.string().min(1, "Please select a category"),
});

export default function IncomeTransaction() {
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
			toast.success("New income added", { richColors: true });
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
			category: values.category,
			type: "INCOME",
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
											className="opacity-60 text-green-600 dark:text-green-400"
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
									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
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

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
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

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
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

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
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
									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Business"
											id="Business"
											className="sr-only"
										/>
										<Building2 size={20} aria-hidden="true" />
										<Label
											htmlFor="Business"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Business
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Employment"
											id="Employment"
											className="sr-only"
										/>
										<IdCardLanyard size={20} aria-hidden="true" />
										<Label
											htmlFor="Employment"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Employment
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Freelance"
											id="Freelance"
											className="sr-only"
										/>
										<Handshake size={20} aria-hidden="true" />
										<Label
											htmlFor="Freelance"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Freelance
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Side Hustle"
											id="Side Hustle"
											className="sr-only"
										/>
										<Target size={20} aria-hidden="true" />
										<Label
											htmlFor="Side Hustle"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Side Hustle
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Benefits"
											id="Benefits"
											className="sr-only"
										/>
										<Landmark size={20} aria-hidden="true" />
										<Label
											htmlFor="Benefits"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Benefits
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Refunds"
											id="Refunds"
											className="sr-only"
										/>
										<TicketSlash size={20} aria-hidden="true" />
										<Label
											htmlFor="Refunds"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Refunds
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Bonuses"
											id="Bonuses"
											className="sr-only"
										/>
										<Tags size={20} aria-hidden="true" />
										<Label
											htmlFor="Bonuses"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Bonuses
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Investments"
											id="Investments"
											className="sr-only"
										/>
										<ChartNoAxesCombined size={20} aria-hidden="true" />
										<Label
											htmlFor="Investments"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Investments
										</Label>
									</div>

									<div className="border-input has-data-[state=checked]:border-green-400/60 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none">
										<RadioGroupItem
											value="Other"
											id="Other"
											className="sr-only"
										/>
										<TicketPlus size={20} aria-hidden="true" />
										<Label
											htmlFor="Other"
											className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
										>
											Other
										</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button variant="green" type="submit" disabled={mutation.isPending}>
					<Send className="-ms-1" />
					{mutation.isPending ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
