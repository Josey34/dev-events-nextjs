import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try {
        await connectToDatabase();

        const formData = await req.formData();

        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { message: "Image file is required" },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "image",
                        folder: "DevEvent",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                )
                .end(buffer);
        });
        
        const tagsData = formData.get("tags");
        const tags = tagsData ? JSON.parse(tagsData as string) : [];

        const agendaData = formData.get("agenda");
        const agenda = agendaData ? JSON.parse(agendaData as string) : [];

        const imageUrl = (uploadResult as { secure_url: string }).secure_url;

        const eventData = Object.fromEntries(formData.entries());

        eventData.image = imageUrl;

        const createdEvent = await Event.create({
            ...eventData,
            tags: tags,
            agenda: agenda
        });

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

export const GET = async() => {
    try {
        await connectToDatabase();

        const events = await Event.find().sort({ createdAt: -1 }).lean();

        // Convert MongoDB _id and dates to strings for serialization
        const serializedEvents = events.map(event => ({
            ...event,
            _id: event._id.toString(),
            createdAt: event.createdAt?.toISOString(),
            updatedAt: event.updatedAt?.toISOString(),
        }));

        return NextResponse.json({ message: "Events Fetched Successfully", events: serializedEvents});
    } catch (e) {
        return NextResponse.json(
            {
                message: "Event Fetching Failed",
                error: e,
            },
            { status: 500 }
        );
    }
}