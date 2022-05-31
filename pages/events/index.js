import { Fragment } from 'react';
import EventList from 'components/events/event-list';
import EventsSearch from 'components/events/events-search';
import { getAllEvents } from 'helpers/apiUtils';

const AllEventsPage = ({ events }) => {
  return (
    <Fragment>
      <EventsSearch />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
  };
};
