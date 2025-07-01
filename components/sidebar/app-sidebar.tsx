"use client";

import {
	ArrowLeftRight,
	BadgePlus,
	ChartPie,
	Coins,
	HeartHandshake,
	House,
	Mailbox,
	Send,
	Tickets,
	WalletCards,
} from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavBottom } from "@/components/sidebar/nav-bottom";
import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";

const data = {
	user: {
		name: "hugoqdesh",
		email: "m@example.com",
		avatar: "demo-pfp.png",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: House,
		},
		{
			title: "Accounts",
			url: "/dashboard/accounts",
			icon: Tickets,
		},
		{
			title: "Transactions",
			url: "/dashboard/transactions",
			icon: ArrowLeftRight,
		},
		{
			title: "Insights",
			url: "/dashboard/reports",
			icon: ChartPie,
		},
		{
			title: "Budgets",
			url: "/dashboard/budgets",
			icon: WalletCards,
		},
	],

	navBottom: [
		{
			title: "Feedback",
			url: "/feedback",
			icon: Send,
		},
		{
			title: "Help & Support",
			url: "/help",
			icon: HeartHandshake,
		},
		{
			title: "Updates",
			url: "/updates",
			icon: Mailbox,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link href="/dashboard">
								<Coins className="!size-5 text-brand" />
								<span className="text-base font-semibold">Kovux</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>

				<Link href="/dashboard/transaction">
					<Button variant="outline" size="sm" className="w-full">
						<BadgePlus className="-ms-1" />
						Quick Transaction
					</Button>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavBottom items={data.navBottom} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
