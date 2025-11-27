import EventCardSkeleton from "./EventComponents/EventCardSkeleton";

const HomePageSkeleton = () => {
    return (
        <section>
            {/* Title */}
            <h1 className="text-center">
                The Hub for Every Dev <br /> Event You Can&apos;t Miss
            </h1>
            <p className="text-center mt-5">
                Hackathons, Meetups, and Conferences, All in One Place
            </p>

            {/* Title Button Skeleton */}
            <div className="flex justify-center mt-8">
                <div className="h-12 w-40 bg-dark-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Events Section */}
            <div className="mt-20 space-y-7">
                <h3>Feature Events</h3>

                <ul className="events">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <EventCardSkeleton key={item} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HomePageSkeleton;
