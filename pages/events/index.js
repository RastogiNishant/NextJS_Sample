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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
  };
};
