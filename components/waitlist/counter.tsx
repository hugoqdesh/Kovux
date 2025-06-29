"use client";

import React, { useEffect, useState } from "react";
import { AnimatedNumber } from "../ui/animated-number";
import axios from "axios";

export default function Counter() {
	const [value, setValue] = useState(0);

	async function getCount() {
		try {
			const res = await axios.get("/api/waitlist");
			setValue(res.data);
		} catch (error) {}
	}

	useEffect(() => {
		getCount();
	}, []);

	return (
		<p className="text-muted-foreground text-sm md:text-sm">
			Join{" "}
			<AnimatedNumber
				className="text-primary font-semibold"
				springOptions={{
					bounce: 0,
					duration: 2000,
				}}
				value={value}
			/>{" "}
			others to get early benefits
		</p>
	);
}
