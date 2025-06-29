"use client";

import {
	ArrowLeftRight,
	ChartPie,
	CirclePlus,
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
			title: "Reports",
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
							<a href="#">
								<Coins className="!size-5" />
								<span className="text-base font-semibold">Kovux</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<Button className="h-8">
					<CirclePlus />
					<span>Quick Transaction</span>
				</Button>
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
