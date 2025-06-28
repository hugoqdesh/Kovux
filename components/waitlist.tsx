"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";
import axios from "axios";
import { z } from "zod";

const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

export default function Waitlist() {
	const [email, setEmail] = useState("");

	async function createWaitlistUser(e: any) {
		e.preventDefault();

		const validation = emailSchema.safeParse({ email });
		if (!validation.success) {
			toast.error(validation.error.errors[0].message, { richColors: true });
			return;
		}

		const waitlist = { email };
		try {
			const res = await axios.post("/api/waitlist", waitlist);

			toast.success("Successfully joined the waitlist!", { richColors: true });

			setEmail("");
		} catch (err) {
			toast.error("Something went wrong, try again!", {
				richColors: true,
				description: "You might've been rate limited.",
			});
		}
	}
	return (
		<form className="flex gap-2 mb-2">
			<div className="relative">
				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="peer ps-9"
					placeholder="Enter email"
					required
				/>
				<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
					<Mail size={16} aria-hidden="true" />
				</div>
			</div>
			<Button
				onClick={createWaitlistUser}
				type="submit"
				variant="outline"
				size="icon"
			>
				<Send />
			</Button>
		</form>
	);
}
