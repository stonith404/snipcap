import { useRouter } from "next/router";
import CreateUpdateSnippet from "../../components/snippet/CreateUpdateSnippet";
import { SnippetDocument } from "../../types/snippet.type";

export default function CreateSnippet() {
  const router = useRouter();
  const snippet: SnippetDocument = JSON.parse(router.query.snippet as string);

  return <CreateUpdateSnippet snippet={snippet} />;
}
