import Highlight from "react-highlight";

type Props = {
  code: string;
};

export default function CodeBox(props: Props) {
  return (
    <div className="selectable">
      <Highlight className="bg-gray-900 rounded-md">{props.code}</Highlight>
    </div>
  );
}
