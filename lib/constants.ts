export interface Event {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events: Event[] = [
    {
        title: "React Summit 2025",
        image: "/images/event1.png",
        slug: "react-summit-2025",
        location: "Amsterdam, Netherlands",
        date: "June 13-17, 2025",
        time: "9:00 AM - 6:00 PM"
    },
    {
        title: "Next.js Conf",
        image: "/images/event2.png",
        slug: "nextjs-conf-2025",
        location: "San Francisco, CA",
        date: "October 24, 2025",
        time: "10:00 AM - 5:00 PM"
    },
    {
        title: "Web3 Builders Hackathon",
        image: "/images/event3.png",
        slug: "web3-builders-hackathon",
        location: "Austin, TX",
        date: "March 15-17, 2025",
        time: "48-hour event"
    },
    {
        title: "DevOps Days",
        image: "/images/event4.png",
        slug: "devops-days-2025",
        location: "London, UK",
        date: "April 8-9, 2025",
        time: "8:30 AM - 7:00 PM"
    },
    {
        title: "AI & Machine Learning Summit",
        image: "/images/event5.png",
        slug: "ai-ml-summit-2025",
        location: "New York, NY",
        date: "May 22-24, 2025",
        time: "9:00 AM - 6:00 PM"
    },
    {
        title: "Mobile Dev Meetup",
        image: "/images/event6.png",
        slug: "mobile-dev-meetup",
        location: "Seattle, WA",
        date: "February 28, 2025",
        time: "6:00 PM - 9:00 PM"
    }
];
