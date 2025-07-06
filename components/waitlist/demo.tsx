"use client";

import Image from "next/image";
import Features from "./features";

export default function Demo() {
	return (
		<section className="md:px-6">
			<div className="mx-auto w-full max-w-5xl">
				<div>
					<div className="rounded-3xl p-4 w-full border">
						<Image
							src="/demo-image.png"
							alt=""
							width={900}
							height={900}
							priority
							unoptimized
							quality={80}
							className="w-max"
						/>
					</div>
					<p className="text-xs md:text-sm text-muted-foreground mt-3">
						( This is still a demo design as the product isn't finished yet )
					</p>
				</div>

				<Features />
			</div>
		</section>
	);
}
