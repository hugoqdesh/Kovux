import { ChartAreaInteractive } from "@/components/dashboard/area-chart";
import { ChartBarMultiple } from "@/components/dashboard/bar-chart";
import BackBtn from "@/components/dashboard/back-btn";
import { ChartRadarDefault } from "@/components/dashboard/radar-chart";

export default function Income() {
	return (
		<main className="flex items-center min-h-screen max-w-6xl mx-auto">
			<BackBtn />

			<div className="w-full grid grid-cols-2 gap-4">
				<div className="col-span-2">
					<ChartAreaInteractive />
				</div>

				<ChartBarMultiple />
				<ChartRadarDefault />
			</div>
		</main>
	);
}
