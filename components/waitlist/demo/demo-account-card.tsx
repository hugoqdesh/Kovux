import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Banknote, CreditCard, IdCard, PiggyBank, Tickets } from "lucide-react";

function AccountCardsDemo() {
	return (
		<>
			<h2 className="font-semibold flex items-center gap-1.5 mt-4 mb-2">
				<Tickets size={20} className="text-brand" />
				My Accounts
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<Banknote size={20} className="text-brand" />
							Cash
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<span className="text-brand-green">+$12</span>
							<Badge variant="outline" className="text-brand-green">
								+6.2%
							</Badge>
							<span className="hidden md:block">from last month</span>
						</CardAction>
					</CardHeader>
					<CardContent className="flex items-center justify-start">
						<span className="text-xl font-semibold">$41.00</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<IdCard size={20} className="text-brand" />
							Debit Card
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<span className="text-brand-green">+$150</span>
							<Badge variant="outline" className="text-brand-green">
								+9.8%
							</Badge>
							<span className="hidden md:block">from last month</span>
						</CardAction>
					</CardHeader>
					<CardContent className="flex items-center justify-start">
						<span className="text-xl font-semibold">$1,330,28</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<CreditCard size={20} className="text-brand" />
							Credit Card
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<span className="text-brand-red">-$20</span>
							<Badge variant="outline" className="text-brand-red">
								-9.8%
							</Badge>
							<span className="hidden md:block">from last month</span>
						</CardAction>
					</CardHeader>
					<CardContent className="flex items-center justify-start">
						<span className="text-xl font-semibold">-$20.00</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<PiggyBank size={20} className="text-brand" />
							Savings Account
						</CardTitle>
						<CardAction className="text-sm flex items-center gap-1 text-muted-foreground">
							<span className="text-brand-green">+$400</span>
							<Badge variant="outline" className="text-brand-green">
								+1.8%
							</Badge>
							<span className="hidden md:block">from last month</span>
						</CardAction>
					</CardHeader>
					<CardContent className="flex items-center justify-start">
						<span className="text-xl font-semibold">$9,999.99</span>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default AccountCardsDemo;
