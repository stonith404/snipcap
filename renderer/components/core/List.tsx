import React, {
  JSXElementConstructor,
  useEffect,
  useRef,
  useState,
} from "react";
import useKeyPress from "../../hooks/useKeyPress.hook";

type Props<T> = {
  items: T[];
  listItem: JSXElementConstructor<{ item: T }>;
  onSelected: (item: T) => void;
  onHover?: (item: T) => void;
  scrollDisabled?: boolean;
};

function ScrollList<T>({
  items,
  listItem,
  onSelected,
  onHover,
  scrollDisabled,
}: Props<T>) {
  const [selected, setSelected] = useState(undefined);
  const [cursor, setCursor] = useState(0);

  const itemsRef = useRef([]);

  useKeyPress(
    "down",
    () => {
      if (scrollDisabled) return;
      setCursor((prevState) =>
        prevState < items.length - 1 ? prevState + 1 : prevState
      );
    },
    {
      preventDefault: true,
    }
  );

  useKeyPress(
    "up",
    () => {
      if (scrollDisabled) return;
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    },
    {
      preventDefault: true,
    }
  );

  useKeyPress("enter", () => {
    if (scrollDisabled) return;
    setSelected(items[cursor]);
  });

  useEffect(() => {
    if (items.length == 0) return;
    itemsRef.current[cursor].scrollIntoView({
      block: "nearest",
    });
  }, [cursor]);

  useEffect(() => {
    if (onHover) onHover(items[cursor]);
  }, [cursor, items]);

  useEffect(() => {
    if (selected) onSelected(selected);
  }, [selected]);

  return (
    <div className="">
      {items.map((item, i) => (
        <div ref={(el) => (itemsRef.current[i] = el)}>
          <div
            className={`p-1.5 ${i == cursor ? "bg-hover rounded-md" : ""}`}
            onClick={() => setSelected(item)}
          >
            {React.createElement(listItem, { item })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrollList;
