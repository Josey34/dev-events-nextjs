import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connectToDatabase();

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json(
                { message: "Invalid JSON data format" },
                { status: 400 }
            );
        }

        const createdEvent = await Event.create(event);

        return NextResponse.json(
            { message: "Event Created Successfully", event: createdEvent },
            { status: 201 }
        );
    } catch (e) {
        return NextResponse.json(
            {
                message: "Event Creation Failed",
                error: e instanceof Error ? e.message : "Unknown",
            },
            { status: 500 }
        );
    }
};
