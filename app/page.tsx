import EventCard from "@/components/EventComponents/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { Event, events } from "@/lib/constants";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Page = async () => {
    'use cache';
    cacheLife('hours');
    
    // const response = await fetch(`${BASE_URL}/api/events`);
    
    // const { events } = await response.json();
    
    return (
        <section>
            {/* Title */}
            <h1 className="text-center">
                The Hub for Every Dev <br /> Event You Can&apos;t Miss
            </h1>
            <p className="text-center mt-5">
                Hackathons, Meetups, and Conferences, All in One Place
            </p>
            
            {/* Title Button */}
            <ExploreBtn />
            
            {/* Events */}
            <div className="mt-20 space-y-7">
                <h3>Feature Events</h3>

                <ul className="events">
                    {events && events.length > 0 && events.map((event: Event) => (
                        // <li key={event.title}>
                            <EventCard key={event.title} {...event} />
                        // </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Page;
