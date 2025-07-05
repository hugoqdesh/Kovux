"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be more than 3 characters")
		.max(15, "Name must be less than 15 characters"),
	email: z.string().email(),
});

function Profile() {
	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await axios.get("/api/user");
			return res.data;
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: data
			? {
					name: data.name,
					email: data.email,
			  }
			: undefined,
		defaultValues: {
			name: "",
			email: "",
		},
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (payload: any) => {
			const res = await axios.put("/api/user", payload);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success("Profile updated successfully", { richColors: true });
		},
		onError: () => {
			toast.error("Failed to update profile", { richColors: true });
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const payload = {
			name: values.name,
			email: values.email,
		};

		mutation.mutate(payload);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>Profile</CardTitle>
						<CardDescription>
							Manage settings for your Cal.com profile
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											{...field}
											disabled={mutation.isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											{...field}
											disabled={mutation.isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex justify-end border-t">
						<Button
							type="submit"
							variant="outline"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? "Updating..." : "Update"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}

export default Profile;
