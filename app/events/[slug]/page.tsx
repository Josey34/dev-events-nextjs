import { Suspense } from "react";
import EventDetailsContent from "@/components/EventComponents/EventDetailsContent";
import EventDetailsSkeleton from "@/components/EventComponents/EventDetailsSkeleton";

const EventDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    return (
        <Suspense fallback={<EventDetailsSkeleton />}>
            <EventDetailsContent params={params} />
        </Suspense>
    );
};

export default EventDetailsPage;
