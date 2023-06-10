import { ID, Query } from "appwrite";
import { Snippet, SnippetDocument } from "../types/snippet.type";
import appwrite, { DATABASE } from "./appwrite.service";

const COLLECTION = "646f0b1e996d8ae9b908";

async function create(snippet: Snippet) {
  await appwrite.database.createDocument(
    DATABASE,
    COLLECTION,
    ID.unique(),
    snippet
  );
}

async function update(id: string, snippet: Snippet) {
  await appwrite.database.updateDocument(DATABASE, COLLECTION, id, snippet);
}

async function remove(id: string) {
  await appwrite.database.deleteDocument(DATABASE, COLLECTION, id);
}

async function get(id: string) {
  return appwrite.database.getDocument<SnippetDocument>(
    DATABASE,
    COLLECTION,
    id
  );
}

async function list(search: string) {
  const queries = search ? [Query.search("name", search)] : [];

  return appwrite.database.listDocuments<SnippetDocument>(
    DATABASE,
    COLLECTION,
    queries
  );
}

export default {
  create,
  update,
  remove,
  list,
  get,
};
