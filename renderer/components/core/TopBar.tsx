import { useRouter } from "next/router";
import { TbArrowLeft } from "react-icons/tb";
import useKeyPress from "../../hooks/useKeyPress.hook";
import { useActionMenu } from "./ActionMenu";
import KeyboardTip from "./KeyboardTip";

type Props = {
  backButton?: boolean;
  title?: string;
  children?: React.ReactNode;
};

export default function TopBar({ backButton, title, children }: Props) {
  const router = useRouter();
  const actionMenu = useActionMenu();

  if (backButton) {
    useKeyPress("Escape", () => router.back(), {
      enabled: !actionMenu.open,
    });
  }

  return (
    <div>
      <div className="mb-2 px-5 pt-4 flex gap-3">
        {backButton && (
          <KeyboardTip keys={["esc"]}>
          <button
            className="p-1 bg-neutral-800/50 rounded-md"
            onClick={() => router.back()}
          >
            <TbArrowLeft className="h-5 w-5" />
          </button></KeyboardTip>
        )}
        {title && <h1 className="text-lg ">{title}</h1>}
        {children && children}
      </div>
      <hr className="my-3 h-[1px] border-t-0 bg-border" />
    </div>
  );
}
