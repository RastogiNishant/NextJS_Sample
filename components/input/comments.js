import { useState, useEffect } from 'react';
import CommentList from 'components/input/comment-list';
import NewComment from 'components/input/new-comment';
import classes from 'components/input/comments.module.css';

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch('/api/comments/' + eventId, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data);
          setComments(data?.comments);
        });
    }
  }, [eventId, showComments]);

  const toggleCommentsHandler = () =>
    setShowComments((prevStatus) => !prevStatus);

  const addCommentHandler = (commentData) => {
    console.log('Called, addCommentHandler');
    // send data to API
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('data', data));
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
