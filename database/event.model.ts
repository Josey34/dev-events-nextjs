import { Schema, model, models, Document } from "mongoose";

// TypeScript interface for Event document
export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        overview: {
            type: String,
            required: [true, "Overview is required"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
        },
        venue: {
            type: String,
            required: [true, "Venue is required"],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        date: {
            type: String,
            required: [true, "Date is required"],
        },
        time: {
            type: String,
            required: [true, "Time is required"],
        },
        mode: {
            type: String,
            required: [true, "Mode is required"],
            enum: {
                values: ["online", "offline", "hybrid"],
                message: "Mode must be either online, offline, or hybrid",
            },
        },
        audience: {
            type: String,
            required: [true, "Audience is required"],
            trim: true,
        },
        agenda: {
            type: [String],
            required: [true, "Agenda is required"],
            validate: {
                validator: (v: string[]) => Array.isArray(v) && v.length > 0,
                message: "Agenda must contain at least one item",
            },
        },
        organizer: {
            type: String,
            required: [true, "Organizer is required"],
            trim: true,
        },
        tags: {
            type: [String],
            required: [true, "Tags are required"],
            validate: {
                validator: (v: string[]) => Array.isArray(v) && v.length > 0,
                message: "Tags must contain at least one item",
            },
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

/**
 * Pre-save hook to generate slug from title and normalize date/time
 * Only regenerates slug if title has been modified
 */
EventSchema.pre("save", function () {
    // Generate slug from title if title is modified
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
            .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
    }

    // Normalize date to ISO format (YYYY-MM-DD)
    if (this.isModified("date")) {
        const dateObj = new Date(this.date);
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date format");
        }
        this.date = dateObj.toISOString().split("T")[0];
    }

    // Normalize time to HH:MM format (24-hour)
    if (this.isModified("time")) {
        const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(this.time.trim())) {
            throw new Error("Time must be in HH:MM format (24-hour)");
        }
        this.time = this.time.trim();
    }
});

// Prevent model recompilation in development (Next.js hot reload)
const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
