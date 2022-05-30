import { Fragment, useEffect, useState } from 'react';
import { getAllEvents, getEventById } from 'helpers/apiUtils';
import EventSummary from 'components/event-detail/event-summary';
import EventLogistics from 'components/event-detail/event-logistics';
import EventContent from 'components/event-detail/event-content';
import ErrorAlert from 'components/ui/error-alert';

const EventDetailPage = ({ event }) => {
  const [isLoading, setIsLoading] = useState(true);
  console.log('events', event);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async (context) => {
  const { params } = context;
  const data = await getEventById(params.eventId); // your fetch function here

  return {
    props: {
      event: { ...data },
    },
  };
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async () => {
  const allEvents = await getAllEvents();

  return {
    paths: allEvents.map((each) => ({
      params: {
        eventId: each.id,
      },
    })),
    fallback: false,
  };
};
