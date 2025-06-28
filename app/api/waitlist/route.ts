import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const waitlist = await prisma.waitlistUser.count();
		return NextResponse.json(waitlist);
	} catch (error) {
		return NextResponse.json({ error: "Error getting users", status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email } = body;

		const waitlist = await prisma.waitlistUser.create({
			data: {
				email: email,
			},
		});

		return NextResponse.json(waitlist);
	} catch (error) {
		return NextResponse.json({
			error: "Error creating waitlist user",
			status: 500,
		});
	}
}
