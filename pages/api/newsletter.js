import { MongoClient } from 'mongodb';

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `${process.env.DB_CONNECTION}events?retryWrites=true&w=majority`
  );
  return client;
};

const insertDocument = async (client, document) => {
  const db = client.db();
  await db.collection('newsletter').insertOne(document);
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail?.includes('@')) {
      res.status(422).json({ message: 'Invalid Email Address' });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connection to the database failed!' });
    }
    try {
      await insertDocument(client, { email, userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }

    console.log(userEmail);
    res.status(201).json({ message: 'User Signed Up' });
  }
};

export default handler;
