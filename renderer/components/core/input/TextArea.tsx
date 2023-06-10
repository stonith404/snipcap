import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  className?: string;
};

export default function TextArea(props: Props) {
  return (
    <div className="flex">
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
        <textarea
          {...props}
          className={`input ${props.className}`}
        />
        {props.error && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {props.error}
          </span>
        )}
      </div>
    </div>
  );
}
