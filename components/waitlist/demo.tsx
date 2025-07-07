import Features from "./features";
import { ChartBalanceDemo } from "./demo/demo-chart";
import BalanceCardDemo from "./demo/demo-total-card";
import AccountCardsDemo from "./demo/demo-account-card";

export default function Demo() {
	return (
		<section className="md:px-6 max-w-[1600px] w-full">
			<div>
				<div className="rounded-3xl p-4 w-full border">
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
						<div className="xl:col-span-2">
							<ChartBalanceDemo />
						</div>
						<BalanceCardDemo />
					</div>

					<AccountCardsDemo />
				</div>
				<p className="text-xs md:text-sm text-muted-foreground mt-3">
					( This is a demo dashboard page as the product isn't finished yet )
				</p>
			</div>

			<Features />
		</section>
	);
}
