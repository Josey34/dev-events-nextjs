const EventCardSkeleton = () => {
    return (
        <div id="event-card" className="animate-pulse cursor-default">
            {/* Poster skeleton */}
            <div className="poster aspect-[410/300] bg-dark-200 rounded-lg"></div>

            {/* Location skeleton */}
            <div className="flex flex-row gap-2 mt-3">
                <div className="w-[14px] h-[14px] bg-dark-200 rounded"></div>
                <div className="h-4 w-32 bg-dark-200 rounded"></div>
            </div>

            {/* Title skeleton */}
            <div className="title mt-2">
                <div className="h-6 w-full bg-dark-200 rounded"></div>
            </div>

            {/* Date and time skeleton */}
            <div className="datetime mt-3">
                <div className="flex items-center gap-2">
                    <div className="w-[14px] h-[14px] bg-dark-200 rounded"></div>
                    <div className="h-4 w-24 bg-dark-200 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-[14px] h-[14px] bg-dark-200 rounded"></div>
                    <div className="h-4 w-20 bg-dark-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
