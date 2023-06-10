import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import KeyBoardKeys from "./KeyBoardKeys";

type Props = {
  children: React.ReactNode;
  keys: string[];
};

export default function KeyboardTip({ children, keys }: Props) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="select-none rounded-[4px] bg-neutral-800 px-3 shadow-md shadow-black text-sm border border-border"
            sideOffset={5}
          >
            <KeyBoardKeys keys={keys} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
