import { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

// TypeScript interface for Booking document
export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: [true, "Event ID is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            validate: {
                validator: (v: string) => {
                    // Email validation regex
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(v);
                },
                message: "Please provide a valid email address",
            },
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

/**
 * Pre-save hook to verify that the referenced event exists
 * Prevents orphaned bookings by validating event reference before saving
 */
BookingSchema.pre("save", async function () {
    // Only verify eventId if it's new or modified
    if (this.isNew || this.isModified("eventId")) {
        const eventExists = await Event.findById(this.eventId);

        if (!eventExists) {
            throw new Error(
                `Event with ID ${this.eventId} does not exist`
            );
        }
    }
});

// Create index on eventId for faster queries when fetching bookings by event
BookingSchema.index({ eventId: 1 });

// Additional composite index for querying bookings by event and email
BookingSchema.index({ eventId: 1, email: 1 });

// Prevent model recompilation in development (Next.js hot reload)
const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
