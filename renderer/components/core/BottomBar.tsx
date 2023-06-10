import useKeyPress from "../../hooks/useKeyPress.hook";
import Action from "../../types/action.type";
import ActionMenu from "./ActionMenu";
import KeyBoardKeys from "./KeyBoardKeys";

type Props = {
  action?: Action;
  actions?: Action[];
};

export default function BottomBar({ actions, action }: Props) {
  if (action) {
    useKeyPress(action.shortcut.join("+"), action.action);
  }
  return (
    <>
      <div className="mt-14" />
      <div className="fixed bottom-0 pb-1 bg-black w-full border-t-[1px] border-border flex justify-between">
        <img className="ml-5" src="/images/logo.svg" height={13} width={13} />
        <div className="flex py-1 justify-end px-5 mt-1">
          {action ? (
            <div className="py-1 px-2 hover:bg-hover rounded-md">
              <button
                className="flex gap-2 items-center focus:outline-none"
                onClick={action.action}
              >
                <p className="text-sm">{action.name}</p>
                <KeyBoardKeys keys={action.shortcut} />
              </button>
            </div>
          ) : (
            <ActionMenu actions={actions} />
          )}
        </div>
      </div>
    </>
  );
}
