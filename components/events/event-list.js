import EventItem from 'components/events/event-item';
import classes from 'components/events/event-list.module.css';

const EventList = ({ items }) => {
  return (
    <ul className={classes.item}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
};

export default EventList;
