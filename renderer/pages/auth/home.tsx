import { useRouter } from "next/router";
import BottomBar from "../../components/core/BottomBar";
import KeyBoardKeys from "../../components/core/KeyBoardKeys";
import Action from "../../types/action.type";

export default function AuthHome() {
  const router = useRouter();

  const actions: Action[] = [
    {
      name: "Sign In",
      shortcut: ["coc", "L"],
      action: () => router.push("/auth/signIn"),
    },
    {
      name: "Sign Up",
      shortcut: ["coc", "R"],
      action: () => router.push("/auth/signUp"),
    },
  ];

  return (
    <>
      <div className="pt-28 px-36">
        <div className="flex justify-center">
          <img className="mb-3" src="/images/logo.svg" height={30} width={30} />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Welcome to Snipcap</p>
          <p>
            With Snipcap you have your code snippets on your fingertips, no need
            to leave your keyboard.
          </p>
          <p className="pt-5 flex justify-center gap-3">
            To open and close Snipcap press{" "}
            <KeyBoardKeys keys={["coc", "shift", "L"]} />
          </p>

          <p className="flex gap-3 justify-center italic pt-48 text-secondaryText">
            Continue by opening the actions with
            <KeyBoardKeys keys={["coc", "K"]} />
          </p>
        </div>
      </div>
      <BottomBar actions={actions} />
    </>
  );
}
