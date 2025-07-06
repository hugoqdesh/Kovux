import { Card, CardHeader } from "@/components/ui/card";
import { Lock, Settings2, Sparkles } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
	return (
		<section className="mt-2">
			<div className="@container mx-auto max-w-5xl">
				<div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 grid">
					<Card className="group bg-background border-none">
						<CardHeader>
							<CardDecorator>
								<Lock className="size-6" aria-hidden />
							</CardDecorator>

							<h3 className="mt-4 font-medium">Secure & open source</h3>
						</CardHeader>
					</Card>

					<Card className="group bg-background border-none">
						<CardHeader>
							<CardDecorator>
								<Settings2 className="size-6" aria-hidden />
							</CardDecorator>

							<h3 className="mt-4 font-medium">Access anywhere</h3>
						</CardHeader>
					</Card>

					<Card className="group bg-background border-none">
						<CardHeader>
							<CardDecorator>
								<Sparkles className="size-6" aria-hidden />
							</CardDecorator>

							<h3 className="mt-4 font-medium">Smart features</h3>
						</CardHeader>
					</Card>
				</div>
			</div>
		</section>
	);
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
	<div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
		<div
			aria-hidden
			className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
		/>
		<div
			aria-hidden
			className="bg-radial to-background absolute inset-0 from-transparent to-75%"
		/>
		<div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
			{children}
		</div>
	</div>
);
