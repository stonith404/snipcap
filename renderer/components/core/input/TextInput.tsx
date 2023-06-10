import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function TextInput(props: Props) {
  return (
    <div className="flex items-center">
      {props.label && (
        <p
          className={`text-sm w-24 mr-3 ${
            props.error ? "text-red-500" : "text-gray-300 "
          }`}
        >
          {props.label}
        </p>
      )}
      <div className="w-full">
        <input type="text" className="input" {...props} />
        {props.error && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {props.error}
          </span>
        )}
      </div>
    </div>
  );
}
