const { MongoClient } = require("mongodb");
let client;
exports.getDb = async () => {
  if (!client) client = new MongoClient(process.env.MONGODB_URI);
  if (!client.topology || !client.topology.isConnected()) await client.connect();
  return client.db(process.env.MONGODB_DB || "vrijeplek");
};
