const replace = {
  coc: process.platform == "darwin" ? "⌘" : "Ctrl",
  shift: "⇧",
  enter: "↵",
  comma: ",",
};

export function replaceKeys(keys: string[]) {
  return keys.map((key) => replace[key] || key);
}

export default function KeyBoardKeys({ keys }: { keys: string[] }) {
  keys = replaceKeys(keys);

  return (
    <span className="flex gap-1 items-center">
      {keys.map((key, i) => (
        <span
          key={i}
          className="p-[5px] bg-neutral-800/50 rounded-md text-xs not-italic"
        >
          {key}
        </span>
      ))}
    </span>
  );
}
