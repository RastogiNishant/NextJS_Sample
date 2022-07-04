import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail?.includes('@')) {
      res.status(422).json({ message: 'Invalid Email Address' });
      return;
    }
    const client = await MongoClient.connect(
      'mongodb+srv://nish:ze7WjkPLuqtM1uMV@cluster0.zwsnd.mongodb.net/events?retryWrites=true&w=majority'
    );
    const db = client.db();
    await db.collection('newsletter').insertOne({
      email: userEmail,
    });
    client.close();

    console.log(userEmail);
    res.status(201).json({ message: 'User Signed Up' });
  }
};

export default handler;
