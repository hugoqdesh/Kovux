import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
	return (
		<main className="flex flex-col gap-4 px-6 py-4 md:py-6 max-w-4xl mx-auto">
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<Badge>0.1</Badge>
					<span className="text-sm text-muted-foreground">July 07, 2025</span>
				</div>
				<h1 className="text-2xl font-semibold">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit!
				</h1>

				<div className="text-muted-foreground flex flex-col gap-6">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Necessitatibus ab hic quod rem temporibus quae eaque atque possimus
						quidem dicta aliquam odio autem, a assumenda.
					</p>

					<p>Here’s what’s new:</p>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="border-b text-xl font-semibold">
					Lorem ipsum dolor sit amet.
				</h2>

				<div className="text-muted-foreground flex flex-col gap-6">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
						neque, itaque vel praesentium temporibus reiciendis aspernatur ab
						molestias obcaecati consequuntur, corrupti, eligendi repellendus
						nisi libero!
					</p>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
						eaque dolorem accusantium molestiae repellat deleniti nihil at cum,
						aliquid, ut temporibus. Illo ut ratione quia!
					</p>

					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, illo!
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="border-b text-xl font-semibold">
					all changes are on github
				</h2>

				<div className="text-muted-foreground flex flex-col gap-6">
					<p>
						You can check all commits on github for even more details and exact
						code changes.
					</p>

					<p>
						we hope that you enjoy this update and have a great rest of your
						day!
					</p>

					<p>~ ❤️</p>
				</div>
			</div>
		</main>
	);
}
