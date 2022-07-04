import { MongoClient } from 'mongodb';
import { getAllDocuments } from 'helpers/db-util';

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  console.log('eventId', eventId);

  const client = await MongoClient.connect(
    `${process.env.DB_CONNECTION}events?retryWrites=true&w=majority`
  );
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input' });
      return;
    }

    const db = client.db();

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection('comments').insertOne(newComment);
    newComment.id = result.insertedId;
    res.status(201).json({ message: 'Comment Added', comment: newComment });
  }

  if (req.method === 'GET') {
    const db = client.db();
    const documents = getAllDocuments(
      db,
      'comments',
      { _id: -1 },
      { eventId: eventId }
    );
    res.status(200).json({ comments: documents });
  }
  client.close();
};

export default handler;
