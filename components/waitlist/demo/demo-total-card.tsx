import { Layers2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function BalanceCardDemo() {
	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
				<CardTitle className="flex items-center gap-1.5">
					<Layers2 size={20} className="text-brand" /> Total Balance
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 xl:mt-36">
				<div className="flex gap-3">
					<span className="text-4xl font-semibold">$12,042.00</span>
					<div className="flex items-center gap-1 text-muted-foreground text-sm">
						<Badge variant="outline" className="text-brand-green">
							+0.87%
						</Badge>
					</div>
				</div>
				<p className="text-muted-foreground text-start text-sm">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
					repellat corporis natus porro quis voluptas.
				</p>
			</CardContent>
		</Card>
	);
}

export default BalanceCardDemo;
