import classes from 'components/event-detail/logistics-item.module.css';

const LogisticsItem = ({ icon: Icon, children }) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
