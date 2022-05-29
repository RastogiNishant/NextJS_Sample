import Link from 'next/link';
import classes from 'components/layout/main-header.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Next Events</Link>
      </div>
      <nav className={classes.navigation}>
        <Link href="/events">Browse All Events</Link>
      </nav>
    </header>
  );
};

export default MainHeader;
