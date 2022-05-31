import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import EventList from 'components/events/event-list';
import ResultTitle from 'components/events/results-title';
import ErrorAlert from 'components/ui/error-alert';
import Button from 'components/ui/button';

const fetcher = (url) => fetch(url).then((req) => req.json());

const FilteredEventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const filterData = router.query.slug;

  console.log('filterData', filterData);
  const { data, error } = useSWR(
    'https://nextjs-sample-41a78-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const allEvents = [];
      for (const key in data) {
        allEvents.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(allEvents);
    }
  }, [data]);

  if (!events || !filterData) {
    return (
      <Fragment>
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All Events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultTitle date={new Date(numYear, numMonth - 1)} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
