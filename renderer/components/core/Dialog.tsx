import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { TbX } from "react-icons/tb";
import { create } from "zustand";
import useKeyPress from "../../hooks/useKeyPress.hook";
import KeyboardTip from "./KeyboardTip";

type DialogProps = {
  title: string;
  content: ReactNode;
};

type DialogState = {
  props: DialogProps;
  open: boolean;
  show: (props: DialogProps) => void;
  close: () => void;
};

export const useDialog = create<DialogState>((set) => ({
  props: {
    title: "",
    content: undefined,
  },
  open: false,
  show: (props) => {
    set({
      open: true,
      props,
    });
  },

  close: () => {
    set({ open: false });
  },
}));

export default function Dialog() {
  const dialog = useDialog();

  useKeyPress("Escape", () => dialog.close());

  return (
    <RadixDialog.Root open={dialog.open} modal>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black bg-opacity-20" />
        <RadixDialog.Content className="shadow-xl shadow-black fixed top-[50%] left-[50%] max-h-[85vh] w-[70vw] translate-x-[-50%] translate-y-[-50%] rounded-md bg-foreground p-5 focus:outline-none">
          <div className="flex justify-between">
            <RadixDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              {dialog.props.title}
            </RadixDialog.Title>
            <KeyboardTip keys={["esc"]}>
              <RadixDialog.Close
                tabIndex={-1}
                className="p-1 bg-neutral-800/50 rounded-md "
                onClick={() => dialog.close()}
              >
                <TbX className="h-4 w-4" />
              </RadixDialog.Close>
            </KeyboardTip>
          </div>
          <RadixDialog.Description className="mt-3">
            {dialog.props.content}
          </RadixDialog.Description>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
