import AccountCards from "@/components/dashboard/account-cards";
import BalanceCard from "@/components/dashboard/balance-card";
import { ChartBalance } from "@/components/dashboard/chart-balance";

export default function DashboardPage() {
	return (
		<main className="flex flex-col gap-4 px-6 py-4 md:py-6">
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
