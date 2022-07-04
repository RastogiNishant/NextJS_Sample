export const getAllDocuments = async (client, collection, sort, filter = {}) =>
  await client.collection(collection).find(filter).sort(sort).toArray();
