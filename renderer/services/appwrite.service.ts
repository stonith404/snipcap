import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646f0a7268f15db8ab09");

const database = new Databases(client);
const account = new Account(client);

const appwrite = {
  database,
  account,
};


export const DATABASE = "646f0b163808ff71d4b1"

export default appwrite;
