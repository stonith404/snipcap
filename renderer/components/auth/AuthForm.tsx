import { useForm } from "@mantine/form";
import { ID } from "appwrite";
import { useRouter } from "next/router";
import { useUser } from "../../hooks/useUser";
import appwrite from "../../services/appwrite.service";
import Action from "../../types/action.type";
import BottomBar from "../core/BottomBar";
import { useToast } from "../core/Toast";
import TextInput from "../core/input/TextInput";

type Props = {
  mode: "signIn" | "signUp";
};

export default function AuthForm({ mode }: Props) {
  const toast = useToast();
  const router = useRouter();
  const user = useUser();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const action: Action = {
    name: mode === "signIn" ? "Sign In" : "Sign Up",
    shortcut: ["enter"],
    action: () => {
      if (mode === "signIn") {
        appwrite.account
          .createEmailSession(form.values.email, form.values.password)
          .then(async () => {
            user.setUser(await appwrite.account.get());
            router.push("/home");
          })
          .catch((err) => {
            toast.showError(err.message);
          });
      } else {
        appwrite.account
          .create(ID.unique(), form.values.email, form.values.password)
          .then(async (userResponse) => {
            await appwrite.account.createEmailSession(
              form.values.email,
              form.values.password
            );
            user.setUser(userResponse);
            router.push("/home");
          })
          .catch((err) => {
            toast.showError(err.message);
          });
      }
    },
  };

  return (
    <div>
      <div className="px-20 flex flex-col gap-4">
        <TextInput
          autoFocus
          label="Email"
          placeholder="Your email"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Your password"
          {...form.getInputProps("password")}
        />
      </div>
      <BottomBar action={action} />
    </div>
  );
}
