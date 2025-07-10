import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			select: {
				id: true,
				currency: true,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to get user data",
			status: 500,
		});
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { currency } = body;

		const updateUser = await prisma.user.update({
			where: { id: session.user.id },
			data: {
				currency: currency,
			},
		});

		return NextResponse.json(updateUser);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to update user data",
			status: 500,
		});
	}
}
