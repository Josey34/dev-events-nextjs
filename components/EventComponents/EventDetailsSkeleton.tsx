const EventDetailsSkeleton = () => {
    return (
        <section id="event" className="animate-pulse">
            <div className="header">
                <div className="h-10 w-3/4 bg-dark-200 rounded-md mb-4"></div>
                <div className="h-6 w-full bg-dark-200 rounded-md"></div>
            </div>

            <div className="details">
                {/* Left side */}
                <div className="content">
                    {/* Banner skeleton */}
                    <div className="banner aspect-video bg-dark-200 rounded-lg"></div>

                    {/* Overview section */}
                    <section className="flex-col-gap-2">
                        <div className="h-8 w-32 bg-dark-200 rounded-md mb-2"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-dark-200 rounded-md"></div>
                            <div className="h-4 w-full bg-dark-200 rounded-md"></div>
                            <div className="h-4 w-3/4 bg-dark-200 rounded-md"></div>
                        </div>
                    </section>

                    {/* Event Details section */}
                    <section className="flex-col-gap-2">
                        <div className="h-8 w-40 bg-dark-200 rounded-md mb-2"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-dark-200 rounded-md"></div>
                                    <div className="h-4 w-48 bg-dark-200 rounded-md"></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Agenda section */}
                    <section className="flex-col-gap-2">
                        <div className="h-8 w-36 bg-dark-200 rounded-md mb-2"></div>
                        <div className="space-y-2">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="h-4 w-full bg-dark-200 rounded-md"></div>
                            ))}
                        </div>
                    </section>

                    {/* Organizer section */}
                    <section className="flex-col-gap-2">
                        <div className="h-8 w-48 bg-dark-200 rounded-md mb-2"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-dark-200 rounded-md"></div>
                            <div className="h-4 w-5/6 bg-dark-200 rounded-md"></div>
                        </div>
                    </section>

                    {/* Tags section */}
                    <section className="flex-col-gap-2">
                        <div className="h-8 w-24 bg-dark-200 rounded-md mb-2"></div>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="h-8 w-20 bg-dark-200 rounded-full"></div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right side - Booking card */}
                <aside className="booking">
                    <div className="signup-card">
                        <div className="h-8 w-40 bg-dark-200 rounded-md mb-3"></div>
                        <div className="h-4 w-full bg-dark-200 rounded-md mb-6"></div>
                        <div className="h-12 w-full bg-dark-200 rounded-md"></div>
                    </div>
                </aside>
            </div>

            {/* Similar Events section skeleton */}
            <div className="flex w-full flex-col gap-4 pt-20">
                <div className="h-8 w-48 bg-dark-200 rounded-md"></div>
                <div className="events">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-dark-200 rounded-lg p-4 space-y-3">
                            <div className="aspect-video bg-dark-100 rounded-md"></div>
                            <div className="h-6 w-3/4 bg-dark-100 rounded-md"></div>
                            <div className="h-4 w-full bg-dark-100 rounded-md"></div>
                            <div className="h-4 w-1/2 bg-dark-100 rounded-md"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventDetailsSkeleton;
