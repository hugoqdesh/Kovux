import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.fixedWindow(2, "30m"),
});

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

		const identifier = req.headers.get("x-forwarded-for") || "unknown";
		const result = await ratelimit.limit(identifier);

		if (!result.success) {
			return NextResponse.json(
				{
					error: "Rate limit exceeded. Please try again later.",
				},
				{ status: 429 }
			);
		}

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
