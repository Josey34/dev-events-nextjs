import { Suspense } from "react";
import HomePageContent from "@/components/HomePageContent";
import HomePageSkeleton from "@/components/HomePageSkeleton";

const Page = async () => {
    return (
        <Suspense fallback={<HomePageSkeleton />}>
            <HomePageContent />
        </Suspense>
    );
};

export default Page;
