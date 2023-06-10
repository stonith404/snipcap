import { Models } from "appwrite";

export type Snippet = {
  name: string;
  description: string;
  code: string;
  language: string;
};


export type SnippetDocument = Snippet & Models.Document;


