import authOptions from "@/app/api/auth/[...nextauth]/options";
import { AuthPage } from "@refinedev/antd";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Login() {
  const data = await getData();

  if (data.session?.user) {
    return redirect("/");
  }

  return (
    <AuthPage
      type="login"
      registerLink={false}
      forgotPasswordLink={false}
      rememberMe={false}
    />
  );
}

async function getData() {
  const session = await getServerSession(authOptions);

  return {
    session,
  };
}
