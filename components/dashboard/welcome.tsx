"use client";

import React, { useEffect, useState } from "react";
import Transaction from "./transaction";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Welcome() {
	const { data, isPending } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get("/api/user");
			return res.data;
		},
	});

	if (isPending) {
		return (
			<h2 className="font-semibold text-2xl flex items-center gap-1.5">
				Welcome back,
			</h2>
		);
	}

	return (
		<div>
			<h2 className="font-semibold text-2xl flex items-center gap-1.5">
				Welcome back, <span className="text-brand">{data.name}</span>
			</h2>
			<p className="text-muted-foreground text-sm">
				Here's your financial overview for today
			</p>
			<div className="block md:hidden mt-2">
				<Transaction />
			</div>
		</div>
	);
}
