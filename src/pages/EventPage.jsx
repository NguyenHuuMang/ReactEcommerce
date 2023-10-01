import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../component/Events/EventCard";
import Header from "../component/Layout/Header";

const EventsPage = () => {
  const { allEvents } = useSelector((state) => state.events);
  return (
    <>
      <div>
        <Header activeHeading={4} />
        <EventCard active={true} data={allEvents && allEvents[""]}/>
      </div>
    </>
  );
};

export default EventsPage;
