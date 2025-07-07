import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const accounts = await prisma.accountBalance.findMany({
			where: {
				userId: session.user.id,
			},
		});

		const now = new Date();
		const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

		const previousAccounts = await prisma.accountBalance.findMany({
			where: {
				userId: session.user.id,
				updatedAt: {
					gte: lastMonthStart,
					lte: lastMonthEnd,
				},
			},
		});

		const getPercentChange = (current: number, previous: number) => {
			const percentChange =
				previous === 0 ? 0 : ((current - previous) / previous) * 100;
			return Math.round(percentChange * 10) / 10;
		};

		const accountsData = {
			cash: accounts.find((e) => e.method === "CASH")?.amount || 0,
			debitCard: accounts.find((e) => e.method === "DEBIT_CARD")?.amount || 0,
			creditCard: accounts.find((e) => e.method === "CREDIT_CARD")?.amount || 0,
			savingsAccount:
				accounts.find((e) => e.method === "SAVINGS_ACCOUNT")?.amount || 0,

			cashChange: {
				percentChange: getPercentChange(
					accounts.find((e) => e.method === "CASH")?.amount || 0,
					previousAccounts.find((e) => e.method === "CASH")?.amount || 0
				),
			},
			debitCardChange: {
				percentChange: getPercentChange(
					accounts.find((e) => e.method === "DEBIT_CARD")?.amount || 0,
					previousAccounts.find((e) => e.method === "DEBIT_CARD")?.amount || 0
				),
			},
			creditCardChange: {
				percentChange: getPercentChange(
					accounts.find((e) => e.method === "CREDIT_CARD")?.amount || 0,
					previousAccounts.find((e) => e.method === "CREDIT_CARD")?.amount || 0
				),
			},
			savingsAccountChange: {
				percentChange: getPercentChange(
					accounts.find((e) => e.method === "SAVINGS_ACCOUNT")?.amount || 0,
					previousAccounts.find((e) => e.method === "SAVINGS_ACCOUNT")
						?.amount || 0
				),
			},
		};

		return NextResponse.json(accountsData);
	} catch (error) {
		return NextResponse.json({
			error: "Error displaying account balances",
			status: 500,
		});
	}
}
