import KeyBoardKeys from "../core/KeyBoardKeys";

export default function NoSnippetCreatedYet() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="flex gap-3 text-secondaryText">
        Add your first snippet by pressing
        <KeyBoardKeys keys={["coc", "N"]} />
      </p>
    </div>
  );
}
