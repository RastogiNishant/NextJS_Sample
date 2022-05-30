export const getAllEvents = async () => {
  const response = await fetch(
    'https://nextjs-sample-41a78-default-rtdb.asia-southeast1.firebasedatabase.app/events.json?isFeatured=true'
  );
  const data = await response.json();

  const allEvents = [];
  for (const key in data) {
    allEvents.push({
      id: key,
      ...data[key],
    });
  }
  return allEvents;
};

export const getEventById = async (id) => {
  const allEvent = await getAllEvents();
  return allEvent.find((event) => event.id === id);
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter(({ isFeatured }) => isFeatured);
};
