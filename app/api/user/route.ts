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
			error: "Error getting user's username",
			status: 500,
		});
	}
}
