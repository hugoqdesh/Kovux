import React from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
	Activity,
	Banknote,
	CreditCard,
	PiggyBank,
	Tickets,
} from "lucide-react";

function AccountCards() {
	return (
		<>
			<h2 className="font-semibold flex items-center gap-1.5">
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
						<CardAction className="text-xs">
							<Badge variant="outline" className="text-brand-green">
								+9.8%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">$220.00</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<CreditCard size={20} className="text-brand" />
							Credit Card
						</CardTitle>
						<CardAction className="text-xs">
							<Badge variant="outline" className="text-brand-green">
								+9.8%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">$674.32</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<PiggyBank size={20} className="text-brand" />
							Savings Account
						</CardTitle>
						<CardAction className="text-xs">
							<Badge variant="outline" className="text-brand-green">
								+9.8%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">$500.00</span>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">
							<Activity size={20} className="text-brand" />
							Health Savings Account
						</CardTitle>
						<CardAction className="text-xs">
							<Badge variant="outline" className="text-brand-green">
								+9.8%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardContent>
						<span className="text-xl font-semibold">$400.00</span>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default AccountCards;
