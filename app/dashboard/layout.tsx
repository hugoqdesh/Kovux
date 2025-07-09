import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/signin");
	}

	return (
		<main>
			{children}
			<Toaster />
		</main>
	);
}
