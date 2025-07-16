import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
	Blend,
	BriefcaseBusiness,
	Building2,
	CarTaxiFront,
	ChartNoAxesCombined,
	Drama,
	EyeClosed,
	Gift,
	Guitar,
	Handshake,
	HeartPulse,
	House,
	IdCardLanyard,
	Landmark,
	PawPrint,
	Plane,
	Shirt,
	ShoppingBasket,
	ShoppingCart,
	Tags,
	Target,
	TicketMinus,
	TicketPlus,
	TicketSlash,
	UtilityPole,
	Wine,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const getIcon = (category: string) => {
	const icons: { [key: string]: any } = {
		rent: House,
		utilities: UtilityPole,
		transport: CarTaxiFront,
		groceries: ShoppingBasket,
		dining: Wine,
		healthcare: HeartPulse,
		hobbies: Guitar,
		personal: EyeClosed,
		clothes: Shirt,
		fun: Drama,
		shopping: ShoppingCart,
		pets: PawPrint,
		travel: Plane,
		gifts: Gift,
		work: BriefcaseBusiness,
		misc: TicketMinus,
		business: Building2,
		employment: IdCardLanyard,
		freelance: Handshake,
		hustle: Target,
		benefits: Landmark,
		refunds: TicketSlash,
		bonuses: Tags,
		investments: ChartNoAxesCombined,
		other: TicketPlus,
	};

	const Icon = icons[category.toLowerCase()];
	return Icon ? <Icon /> : <Blend />;
};

export default function TransactionCards() {
	const { data, isPending, isLoading } = useQuery({
		queryKey: ["accounts"],
		queryFn: async () => {
			const res = await axios.get("/api/transaction");
			return res.data;
		},
	});

	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get("/api/user");
			return res.data;
		},
	});

	if (isPending)
		return (
			<div className="flex flex-col justify-center gap-2 items-center py-20 max-w-2xl mx-auto w-full px-2 md:px-0">
				<Skeleton className="h-[90px] w-full" />
				<Skeleton className="h-[90px] w-full" />
				<Skeleton className="h-[90px] w-full" />
				<Skeleton className="h-[90px] w-full" />
			</div>
		);

	const formatAmount = (amount: number) => {
		const currency = user?.currency || "USD";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency,
		}).format(amount);
	};

	return (
		<div className="flex flex-col gap-2 w-full px-2 md:px-0">
			{Array.isArray(data) &&
				data?.map(
					({ label, transactions }: { label: string; transactions: any[] }) => (
						<div key={label}>
							<h2 className="text-lg font-medium mb-3">{label}</h2>
							<div className="flex flex-col gap-2">
								{transactions.map(
									(transaction: {
										id: string;
										category: string;
										method: string;
										type: string;
										amount: number;
									}) => (
										<Card className="w-full" key={transaction.id}>
											<CardContent className="flex flex-row items-center justify-between">
												<div className="flex flex-row items-center">
													<div className="rounded border p-2.5">
														{getIcon(transaction.category)}
													</div>
													<div className="flex flex-col ml-3">
														<CardTitle>{transaction.category}</CardTitle>
														<CardDescription>
															{transaction.method
																.replace("_", " ")
																.toLowerCase()}
														</CardDescription>
													</div>
												</div>
												<span
													className={
														transaction.type === "INCOME"
															? "text-green-500"
															: "text-red-500"
													}
												>
													{transaction.type === "INCOME" ? "+" : "-"}
													{formatAmount(transaction.amount)}
												</span>
											</CardContent>
										</Card>
									)
								)}
							</div>
						</div>
					)
				)}
		</div>
	);
}
