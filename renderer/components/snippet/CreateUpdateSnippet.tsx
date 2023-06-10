import { useForm, yupResolver } from "@mantine/form";
import hljs from "highlight.js";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import snippetService from "../../services/snippetService";
import Action from "../../types/action.type";
import { Snippet, SnippetDocument } from "../../types/snippet.type";
import BottomBar from "../core/BottomBar";
import TopBar from "../core/TopBar";
import TextArea from "../core/input/TextArea";
import TextInput from "../core/input/TextInput";

type Props = {
  snippet?: SnippetDocument;
};

const formSchema = Yup.object().shape({
  name: Yup.string().required().max(100),
  code: Yup.string().required().max(5000),
  description: Yup.string().max(500),
  language: Yup.string().required().max(30),
});

let languageManuallySet = false;

export default function CreateUpdateSnippet({ snippet }: Props) {
  const form = useForm({
    validate: yupResolver(formSchema),
    initialValues: {
      name: snippet?.name || "",
      description: snippet?.description || "",
      language: snippet?.language || "",
      code: snippet?.code || "",
    },
  });

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const action: Action = {
    name: "Save",
    shortcut: ["coc", "enter"],
    action: async () => formRef.current?.requestSubmit(),
  };

  useEffect(() => {
    if (languageManuallySet) return;
    form.setFieldValue(
      "language",
      hljs.highlightAuto(form.values.code).language
    );
  }, [form.values.code]);

  return (
    <div>
      <TopBar
        backButton
        title={snippet ? `Update ${snippet.name}` : "Create snippet"}
      />
      <form
        ref={formRef}
        onSubmit={form.onSubmit(async (values: Snippet) => {
          if (snippet) {
            await snippetService.update(snippet.$id, values);
          } else {
            await snippetService.create(values);
          }
          router.back();
        })}
        className="px-20 flex flex-col gap-4"
      >
        <TextInput autoFocus label="Name" {...form.getInputProps("name")} />
        <TextInput
          label="Description"
          placeholder="Optional"
          {...form.getInputProps("description")}
        />
        <TextInput
          label="Language"
          placeholder="Leave empty to auto detect"
          {...form.getInputProps("language")}
          onChange={(e) => {
            languageManuallySet = true;
            form.setFieldValue("language", e.target.value);
          }}
        />
        <TextArea
          className="h-[300px]"
          label="Code"
          {...form.getInputProps("code")}
        />
      </form>
      <BottomBar action={action} />
    </div>
  );
}
