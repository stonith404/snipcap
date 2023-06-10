import * as Popover from "@radix-ui/react-popover";
import { create } from "zustand";
import useKeyPress from "../../hooks/useKeyPress.hook";
import Action from "../../types/action.type";
import { keyBoardEventToShortcut } from "../../utils/string.util";
import KeyBoardKeys from "./KeyBoardKeys";
import ScrollList from "./List";

type Props = {
  actions: Action[];
};

type ActionMenuState = {
  open: boolean;
  toggleOpen: () => void;
};

export const useActionMenu = create<ActionMenuState>((set) => ({
  open: false,
  toggleOpen: () =>
    set((state) => {
      return { open: !state.open };
    }),
}));

function ListItem({ item }: { item: Action }) {
  return (
    <div className="flex items-center gap-2">
      <p>{item.name}</p>
      <div className="flex gap-1">
        <KeyBoardKeys keys={item.shortcut} />
      </div>
    </div>
  );
}

export default function ActionMenu({ actions }: Props) {
  const actionMenu = useActionMenu();

  useKeyPress("coc+K", () => actionMenu.toggleOpen());
  useKeyPress("escape", () => actionMenu.open && actionMenu.toggleOpen());

  // Dynamically add keyboard shortcuts based on the actions
  useKeyPress(
    actions.map((action) => action.shortcut.join("+")).join(", "),
    (_, e) => {
      const action = actions.find((action) => {

        const pressedKey = keyBoardEventToShortcut(e)
          .replaceAll("meta", "coc")
          .replaceAll("ctrl", "coc");

        return (
          action.shortcut.join("+").toUpperCase() == pressedKey.toUpperCase()
        );
      });
      action?.action();
    }
  );

  return (
    <Popover.Root open={actionMenu.open}>
      <Popover.Trigger
        asChild
        className="flex gap-2 items-center focus:outline-none"
      >
        <button
          tabIndex={-1}
          onFocus={(e) => e.target.blur()}
          className="hover:bg-hover rounded-md py-1 px-2 focus:bg-red-500"
          onClick={actionMenu.toggleOpen}
        >
          <p className="text-sm">Actions</p>
          <KeyBoardKeys keys={["coc", "K"]} />
        </button>
      </Popover.Trigger>
      <Popover.Content className="focus:outline-none shadow-xl shadow-black mr-2 mb-5">
        <div className="bg-foreground border-[1px] border-border p-3 rounded-md text-sm gap-3 flex flex-col">
          <ScrollList
            onSelected={(action) => {
              action.action();
              actionMenu.toggleOpen();
            }}
            items={actions}
            listItem={ListItem}
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
