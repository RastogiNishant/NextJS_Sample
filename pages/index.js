import EventList from 'components/events/event-list';
import { getAllEvents } from 'helpers/apiUtils';

const Homepage = ({ events }) => {
  console.log('data', events);

  if (!events) {
    <div>Something went wrong</div>;
  }

  if (events.length === 0) {
    <div>Loading...</div>;
  }

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  if (allEvents?.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      events: [...allEvents.filter(({ isFeatured }) => isFeatured)],
    },
    revalidate: 10, // re-generate the page on given seconds in production only
  };
}

export default Homepage;
