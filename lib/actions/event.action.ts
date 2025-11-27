'use server';

import { Event } from "@/database";
import connectToDatabase from "../mongodb";
import { cacheLife } from "next/cache";

export const getSimilarEventsBySlug = async (slug: string) => {
    'use cache';
    cacheLife('hours');

    try {
        await connectToDatabase();

        const event = await Event.findOne({ slug }).lean();
        const events = await Event.find({ _id: { $ne: event?._id}, tags: { $in: event?.tags } }).lean();

        // Convert MongoDB objects to plain objects with serializable _id
        return events.map(event => ({
            ...event,
            _id: event._id.toString(),
        }));
    } catch (e: unknown) {
        console.log(e instanceof Error ? e.message : 'An error occurred');
    }
}