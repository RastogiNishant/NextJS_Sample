import path from 'path';
import fs from 'fs/promises';
import { getFeaturedEvents } from 'dummy-data';
import EventList from 'components/events/event-list';

const Homepage = (props) => {
  console.log('props', props);
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  console.log('(Re)-Generating...', data);
  return {
    props: {
      products: { ...data.data },
    },
    revalidate: 10, // re-generate the page on given seconds in production only
  };
}

export default Homepage;
