import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { create } from "zustand";
import useKeyPress from "../../hooks/useKeyPress.hook";
import KeyboardTip from "./KeyboardTip";

type AlertDialogProps = {
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
};

type AlertDialogState = {
  props: AlertDialogProps;
  open: boolean;
  show: (props: AlertDialogProps) => void;
  close: () => void;
};

export const useAlertDialog = create<AlertDialogState>((set) => ({
  props: {
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {},
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

export default function AlertDialog() {
  const dialog = useAlertDialog();

  useKeyPress("Escape", () => dialog.close(), {
    enabled: dialog.open,
  });

  useKeyPress(
    "Enter",
    () => {
      dialog.props.onConfirm();
      dialog.close();
    },
    {
      enabled: dialog.open,
    }
  );

  return (
    <RadixAlertDialog.Root open={dialog.open}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-20" />
        <RadixAlertDialog.Content className="shadow-xl shadow-black fixed top-[50%] left-[50%] max-h-[85vh] w-[50vw] translate-x-[-50%] translate-y-[-50%] rounded-md bg-foreground p-5 focus:outline-none">
          <RadixAlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            {dialog.props.title}
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="text-sm text-secondaryText mt-2">
            {dialog.props.description}
          </RadixAlertDialog.Description>
          <div className="flex  gap-2 mt-7">
            <KeyboardTip keys={["esc"]}>
              <RadixAlertDialog.Cancel asChild>
                <button className="btn w-full" onClick={dialog.close}>
                  Cancel
                </button>
              </RadixAlertDialog.Cancel>
            </KeyboardTip>
            <KeyboardTip keys={["enter"]}>
              <RadixAlertDialog.Action asChild>
                <button
                  className="btn  w-full text-red-500"
                  onClick={() => {
                    dialog.props.onConfirm();
                    dialog.close();
                  }}
                >
                  {dialog.props.confirmText}
                </button>
              </RadixAlertDialog.Action>
            </KeyboardTip>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
}
