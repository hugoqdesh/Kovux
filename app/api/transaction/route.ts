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

		const transactions = await prisma.financialTransaction.findMany({
			where: {
				userId: session.user.id,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(transactions);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to get transactions",
			status: 500,
		});
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { method, amount, type, note, category } = body;

		const transaction = await prisma.financialTransaction.create({
			data: {
				method: method,
				amount: amount,
				type: type,
				note: note,
				category: category,
				userId: session.user.id,
			},
		});

		const balanceChange = type === "INCOME" ? amount : -amount;

		await prisma.accountBalance.upsert({
			where: {
				userId_method: {
					userId: session.user.id,
					method,
				},
			},
			update: {
				amount: {
					increment: balanceChange,
				},
			},
			create: {
				userId: session.user.id,
				method,
				amount: balanceChange,
			},
		});

		return NextResponse.json(transaction);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to process transaction",
			status: 500,
		});
	}
}
