import classes from 'components/input/comment-list.module.css';

const CommentList = ({ items }) => {
  return (
    <ul className={classes.comments}>
      {items?.map((each) => (
        <li key={each._id}>
          <p>{each.text}</p>
          <div>
            By <address>{each.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
