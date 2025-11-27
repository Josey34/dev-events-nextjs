import BookEvent from "@/components/BookEvent";
import EventAgenda from "@/components/EventComponents/EventAgenda";
import EventCard from "@/components/EventComponents/EventCard";
import EventDetailItem from "@/components/EventComponents/EventDetailItem";
import EventTags from "@/components/EventComponents/EventTags";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type EventData = Pick<
    IEvent,
    | "_id"
    | "description"
    | "image"
    | "overview"
    | "date"
    | "time"
    | "location"
    | "mode"
    | "agenda"
    | "audience"
    | "tags"
    | "organizer"
>;

async function SimilarEvents({ params }: { params: Promise<{ slug: string }> }) {
    'use cache';
    cacheLife("hours");

    const { slug } = await params;
    const similarEvents: IEvent[] = (await getSimilarEventsBySlug(slug)) || [];

    return (
        <div className="flex w-full flex-col gap-4 pt-20">
            <h2>Similar Events</h2>
            <div className="events">
                {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                    <EventCard key={similarEvent.title} {...similarEvent} />
                ))}
            </div>
        </div>
    );
}

const EventDetailsContent = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    'use cache';
    cacheLife("hours");

    const { slug } = await params;

    let event: EventData;

    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`);

        if (!request.ok) {
            return notFound();
        }

        const data = await request.json();

        if (!data.event) {
            return notFound();
        }

        event = data.event;
    } catch (error) {
        console.error("Error fetching event:", error);
        return notFound();
    }

    const {
        description,
        image,
        overview,
        date,
        time,
        location,
        mode,
        agenda,
        audience,
        tags,
        organizer,
    } = event;

    // Parse agenda and tags safely
    let agendaItems: string[] = [];
    let eventTags: string[] = [];

    try {
        agendaItems = Array.isArray(agenda)
            ? typeof agenda[0] === "string"
                ? agenda
                : agenda
            : [];
    } catch (error) {
        console.error("Error parsing agenda:", error);
        agendaItems = Array.isArray(agenda) ? agenda : [];
    }

    try {
        eventTags = Array.isArray(tags)
            ? typeof tags[0] === "string"
                ? tags
                : tags
            : [];
    } catch (error) {
        console.error("Error parsing tags:", error);
        eventTags = Array.isArray(tags) ? tags : [];
    }

    const bookings = 10;

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className="details">
                {/* Left side */}
                <div className="content">
                    <Image
                        src={image}
                        alt="Event Banner"
                        width={800}
                        height={800}
                        className="banner"
                    />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem
                            icon="/icons/calendar.svg"
                            alt="calendar"
                            label={date}
                        />
                        <EventDetailItem
                            icon="/icons/clock.svg"
                            alt="clock"
                            label={time}
                        />
                        <EventDetailItem
                            icon="/icons/pin.svg"
                            alt="pin"
                            label={location}
                        />
                        <EventDetailItem
                            icon="/icons/mode.svg"
                            alt="mode"
                            label={mode}
                        />
                        <EventDetailItem
                            icon="/icons/audience.svg"
                            alt="audience"
                            label={audience}
                        />
                    </section>

                    <EventAgenda agendaItems={agendaItems} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={eventTags} />
                </div>

                {/* Right side */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ): (
                            <p className="text-sm">
                                Be the first to book your spot!
                            </p>
                        )}

                        <BookEvent eventId={event._id} slug={slug} />
                    </div>
                </aside>
            </div>

            <Suspense fallback={<div className="flex w-full flex-col gap-4 pt-20"><h2>Similar Events</h2><p>Loading similar events...</p></div>}>
                <SimilarEvents params={params} />
            </Suspense>
        </section>
    );
};

export default EventDetailsContent;
