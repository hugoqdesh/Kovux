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

		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({
			error: "Error getting user",
			status: 500,
		});
	}
}

export async function PUT(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { name, email, currency } = body;

		const user = await prisma.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				name: name,
				email: email,
				currency: currency,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({
			error: "Error updating user",
			status: 500,
		});
	}
}

export async function DELETE(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const user = await prisma.user.delete({
			where: {
				id: session.user.id,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({
			error: "Error deleting account",
			status: 500,
		});
	}
}
