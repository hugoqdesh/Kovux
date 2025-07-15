import { ChartArea } from "@/components/dashboard/area-chart";
import BackBtn from "@/components/dashboard/back-btn";
import { ChartBar } from "@/components/dashboard/bar-chart";
import { ChartRadar } from "@/components/dashboard/radar-chart";

export default function Income() {
	return (
		<main className="flex items-center min-h-screen max-w-6xl mx-auto">
			<BackBtn />

			<div className="w-full grid grid-cols-2 gap-4">
				<div className="col-span-2">
					<ChartArea />
				</div>

				<ChartBar />
				<ChartRadar />
			</div>
		</main>
	);
}
