import { MongoClient } from 'mongodb';
const handler = async (req, res) => {
  const eventId = req.query.eventId;
  console.log('eventId', eventId);

  const client = await MongoClient.connect(
    'mongodb+srv://nish:ze7WjkPLuqtM1uMV@cluster0.zwsnd.mongodb.net/events?retryWrites=true&w=majority'
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
    console.log('comment', result);
    newComment.id = result.insertedId;
    res.status(201).json({ message: 'Comment Added', comment: newComment });
  }

  if (req.method === 'GET') {
    const db = client.db();
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: documents });
  }
  client.close();
};

export default handler;
