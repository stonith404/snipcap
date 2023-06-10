import { clipboard } from "electron";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../../../node_modules/highlight.js/styles/base16/atelier-cave.css";
import CodeBox from "../../components/snippet/CodeBox";
import { useAlertDialog } from "../../components/core/AlertDialog";
import BottomBar from "../../components/core/BottomBar";
import { useToast } from "../../components/core/Toast";
import TopBar from "../../components/core/TopBar";
import snippetService from "../../services/snippetService";
import Action from "../../types/action.type";
import { SnippetDocument } from "../../types/snippet.type";

export default function Snippet() {
  const router = useRouter();
  const alertDialog = useAlertDialog();
  const toast = useToast();

  const [snippet, setSnipped] = useState<SnippetDocument>(
    JSON.parse(router.query.snippet as string)
  );

  const actions: Action[] = [
    {
      name: "Copy",
      shortcut: ["coc", "enter"],
      action: () => {
        clipboard.writeText(snippet.code);
        toast.showSuccess("Copied to clipboard");
      },
    },
    {
      name: "Edit",
      shortcut: ["coc", "E"],
      action: () => {
        router.push({
          pathname: "/snippet/update",
          query: { snippet: JSON.stringify(snippet) },
        });
      },
    },
    {
      name: "Delete",
      shortcut: ["coc", "shift", "D"],
      action: () =>
        alertDialog.show({
          title: "Delete Snippet",
          description: `Are you sure you want to delete ${snippet.name}?`,
          confirmText: "Delete",
          onConfirm: () =>
            snippetService.remove(snippet.$id).then(() => router.push("/home")),
        }),
    },
  ];

  useEffect(() => {
    snippetService.get(snippet.$id).then((snippet) => setSnipped(snippet));
  }, []);

  return (
    <div className="">
      <TopBar title={snippet.name} backButton />
      <div className="mx-5 mt-5 text-secondaryText">
        <p className="mb-5">{snippet.description}</p>
        <CodeBox code={snippet.code} />
      </div>
      <BottomBar actions={actions} />
    </div>
  );
}
