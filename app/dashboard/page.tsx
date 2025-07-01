import AccountCards from "@/components/dashboard/account-cards";
import BalanceCard from "@/components/dashboard/balance-card";
import { ChartBalance } from "@/components/dashboard/chart-balance";
import Transaction from "@/components/dashboard/transaction";

export default function DashboardPage() {
	return (
		<main className="flex flex-col gap-4 px-6 py-4 md:py-6">
			<div>
				<h2 className="font-semibold text-2xl flex items-center gap-1.5">
					Welcome back, <span className="text-brand">hugoqdesh</span>
				</h2>
				<p className="text-muted-foreground text-sm">
					Here's your business financial overview for today.
				</p>
				<div className="block md:hidden mt-2">
					<Transaction />
				</div>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
				<div className="xl:col-span-2">
					<ChartBalance />
				</div>
				<BalanceCard />
			</div>

			<AccountCards />
		</main>
	);
}
