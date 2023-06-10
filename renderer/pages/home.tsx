import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useActionMenu } from "../components/core/ActionMenu";
import { useAlertDialog } from "../components/core/AlertDialog";
import BottomBar from "../components/core/BottomBar";
import { useDialog } from "../components/core/Dialog";
import ScrollList from "../components/core/List";
import Loading from "../components/core/Loading";
import NoSnippetCreatedYet from "../components/home/NoSnippetCreatedYet";
import SearchBar, { useSearchBar } from "../components/home/SearchBar";
import SettingsDialog from "../components/home/SettingsDialog";
import useDebounce from "../hooks/useDebounce";
import snippetService from "../services/snippetService";
import { SnippetDocument } from "../types/snippet.type";

const ListItem = ({ item }: { item: SnippetDocument }) => {
  return (
    <div className="flex items-center gap-2">
      <p>
        {item.name} - {item.language}
      </p>
    </div>
  );
};

function Home() {
  const searchBar = useSearchBar();
  const actionMenu = useActionMenu();
  const dialog = useDialog();
  const alertDialog = useAlertDialog();
  const router = useRouter();
  const [snippets, setSnippets] = useState<SnippetDocument[]>([]);
  const selected = useRef<SnippetDocument>();
  const debouncedQuery = useDebounce(searchBar.searchQuery, 400);
  const [isLoading, setIsLoading] = useState(true);

  const actions = useMemo(() => {
    const actionsList = [
      {
        name: "New Snippet",
        shortcut: ["coc", "N"],
        action: () => {
          router.push("/snippet/create");
        },
      },
      {
        name: "Settings",
        shortcut: ["coc", "comma"],
        action: () => {
          dialog.show({
            title: "Settings",
            content: <SettingsDialog />,
          });
        },
      },
    ];

    if (selected.current && snippets.length > 0) {
      actionsList.splice(
        1,
        0,
        {
          name: "Edit Snippet",
          shortcut: ["coc", "E"],
          action: () => {
            router.push({
              pathname: "/snippet/update",
              query: { snippet: JSON.stringify(selected.current) },
            });
          },
        },
        {
          name: "Delete Snippet",
          shortcut: ["coc", "shift", "D"],
          action: () =>
            alertDialog.show({
              title: "Delete Snippet",
              description: `Are you sure you want to delete ${selected.current.name}?`,
              confirmText: "Delete",
              onConfirm: () => {
                setSnippets((snippets) =>
                  snippets.filter(
                    (snippet) => snippet.$id !== selected.current.$id
                  )
                );
                snippetService.remove(selected.current.$id);
              },
            }),
        }
      );
    }

    return actionsList;
  }, [selected.current]);

  useEffect(() => {
    setIsLoading(true);
    snippetService.list(debouncedQuery).then((response) => {
      setSnippets(response.documents);
      selected.current = response.documents[0];
      setIsLoading(false);
    });
  }, [debouncedQuery]);

  useEffect(() => {
    setIsLoading(true);
  }, [searchBar.searchQuery]);

  return (
    <React.Fragment>
      <div className="px-5 pt-4">
        <SearchBar />
      </div>
      <hr className="my-3 h-[1px] border-t-0 bg-border" />

      <div className="mx-5 overflow-auto h-[73vh]">
        {isLoading ? (
          <Loading />
        ) : snippets.length === 0 && !searchBar.searchQuery ? (
          <NoSnippetCreatedYet />
        ) : (
          <ScrollList
            items={snippets}
            listItem={ListItem}
            onHover={(item) => {
              selected.current = item;
            }}
            onSelected={(item) =>
              router.push({
                pathname: "/snippet",
                query: { snippet: JSON.stringify(item) },
              })
            }
            scrollDisabled={actionMenu.open || alertDialog.open || dialog.open}
          />
        )}
      </div>

      <BottomBar actions={actions} />
    </React.Fragment>
  );
}

export default Home;
