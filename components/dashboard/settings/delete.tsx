"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function Delete() {
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async () => {
			const res = await axios.delete("/api/user");
			return res.data;
		},
		onSuccess: () => {
			router.push("/");
		},
	});

	const handleDelete = () => {
		mutation.mutate();
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Danger zone</CardTitle>
				<CardDescription>
					Be careful. Account deletion cannot be undone.
				</CardDescription>
			</CardHeader>
			<CardFooter className="flex justify-end border-t">
				<Button
					variant="destructive"
					disabled={mutation.isPending}
					onClick={handleDelete}
				>
					{mutation.isPending ? "Deleting..." : "Delete account"}
				</Button>
			</CardFooter>
		</Card>
	);
}

export default Delete;
