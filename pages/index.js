import Head from 'next/head';
import EventList from 'components/events/event-list';
import { getFeaturedEvents } from 'helpers/apiUtils';

const Homepage = ({ events }) => {
  if (!events) {
    <div>Something went wrong</div>;
  }

  if (events.length === 0) {
    <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name="description" content="Events which are featured recently" />
      </Head>
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const allEvents = await getFeaturedEvents();

  if (allEvents?.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      events: [...allEvents.filter(({ isFeatured }) => isFeatured)],
    },
    revalidate: 1800, // re-generate the page on given seconds in production only (1800 - Half Hour)
  };
}

export default Homepage;
