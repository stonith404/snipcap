import AuthForm from "../../components/auth/AuthForm";
import TopBar from "../../components/core/TopBar";

export default function SignUp() {
  return (
    <>
      <TopBar backButton title="Sign Up" />
      <div className="pt-10">
        <div className="text-center mb-10"></div>
        <AuthForm mode="signUp" />
      </div>
    </>
  );
}
