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

		const accountsData = {
			cash: accounts.find((e) => e.method === "CASH")?.amount || 0,
			debitCard: accounts.find((e) => e.method === "DEBIT_CARD")?.amount || 0,
			creditCard: accounts.find((e) => e.method === "CREDIT_CARD")?.amount || 0,
			savingsAccount:
				accounts.find((e) => e.method === "SAVINGS_ACCOUNT")?.amount || 0,
		};

		return NextResponse.json(accountsData);
	} catch (error) {
		return NextResponse.json({
			error: "Error displaying account balances",
			status: 500,
		});
	}
}
