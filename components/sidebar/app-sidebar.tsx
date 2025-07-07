"use client";

import {
	ArrowLeftRight,
	ChartPie,
	Coins,
	HeartHandshake,
	House,
	Mailbox,
	Send,
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
import Link from "next/link";
import Transaction from "../dashboard/transaction";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: House,
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

				<div className="hidden md:block">
					<Transaction />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavBottom items={data.navBottom} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
