import "dotenv/config";
import { MongoClient } from "mongodb";

async function runMigration() {
  const uri = process.env.MONGO_URI!; // Replace with your MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("your_database_name"); // Replace with your database name
    const collection = database.collection("users"); // Replace with your collection name

    // Update all documents in the collection and set the "onboarding" field to false
    const updateResult = await collection.updateMany(
      {},
      { $set: { onboarding: false } }
    );

    console.log(
      `Migration completed. ${updateResult.modifiedCount} documents updated.`
    );
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Close the database connection
    await client.close();
  }
}

runMigration().catch(console.error);
