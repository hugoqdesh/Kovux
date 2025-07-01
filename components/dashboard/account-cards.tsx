import React from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

function AccountCards() {
	return (
		<>
			<h2 className="font-semibold">My Accounts</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-1.5">Cash</CardTitle>
						<CardAction className="text-xs">
							{/* +$209.46 */}
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
							Credit Card
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
						<CardTitle className="flex items-center gap-1.5">Savings</CardTitle>
						<CardAction className="text-xs">
							<Badge variant="outline" className="text-brand-red">
								-9.8%
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
							Investments
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
			</div>
		</>
	);
}

export default AccountCards;
