import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export const GET = async (
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) => {
    try {
        // Await and extract the slug parameter
        const { slug } = await params;

        // Validate slug parameter exists
        if (!slug) {
            return NextResponse.json(
                { message: "Slug parameter is required" },
                { status: 400 }
            );
        }

        // Validate slug format (alphanumeric and hyphens only)
        const slugRegex = /^[a-z0-9-]+$/;
        if (!slugRegex.test(slug)) {
            return NextResponse.json(
                {
                    message:
                        "Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens",
                },
                { status: 400 }
            );
        }

        // Connect to database
        await connectToDatabase();

        // Query the Event model by slug
        const event = await Event.findOne({ slug }).lean();

        // Handle event not found
        if (!event) {
            return NextResponse.json(
                { message: `Event with slug '${slug}' not found` },
                { status: 404 }
            );
        }

        // Return the event data
        return NextResponse.json(
            {
                message: "Event fetched successfully",
                event,
            },
            { status: 200 }
        );
    } catch (error) {
        // Handle unexpected errors
        console.error("Error fetching event by slug:", error);

        return NextResponse.json(
            {
                message: "Failed to fetch event",
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            },
            { status: 500 }
        );
    }
};

/**
 * PUT /api/events/[slug]
 * Updates a single event by its slug
 */
export const PUT = async (
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) => {
    try {
        const { slug } = await params;

        // Validate slug parameter exists
        if (!slug) {
            return NextResponse.json(
                { message: "Slug parameter is required" },
                { status: 400 }
            );
        }

        // Validate slug format
        const slugRegex = /^[a-z0-9-]+$/;
        if (!slugRegex.test(slug)) {
            return NextResponse.json(
                {
                    message:
                        "Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens",
                },
                { status: 400 }
            );
        }

        // Parse request body
        const body = await req.json();

        // Validate request body is not empty
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { message: "Request body cannot be empty" },
                { status: 400 }
            );
        }

        // Define fields that cannot be updated
        const protectedFields = ["slug", "_id", "createdAt", "updatedAt"];
        const hasProtectedFields = protectedFields.some((field) =>
            Object.prototype.hasOwnProperty.call(body, field)
        );

        if (hasProtectedFields) {
            return NextResponse.json(
                {
                    message: `Cannot update protected fields: ${protectedFields.join(", ")}`,
                },
                { status: 400 }
            );
        }

        // Connect to database
        await connectToDatabase();

        // Update the event and return the updated document
        const updatedEvent = await Event.findOneAndUpdate(
            { slug },
            { $set: body },
            { new: true, runValidators: true }
        ).lean();

        // Handle event not found
        if (!updatedEvent) {
            return NextResponse.json(
                { message: `Event with slug '${slug}' not found` },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Event updated successfully",
                event: updatedEvent,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating event by slug:", error);

        // Handle Mongoose validation errors
        if (error instanceof Error && error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    error: error.message,
                },
                { status: 400 }
            );
        }

        // Handle JSON parse errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: "Invalid JSON in request body" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: "Failed to update event",
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            },
            { status: 500 }
        );
    }
}



/**
 * DELETE /api/events/[slug]
 * Deletes a single event by its slug
 */