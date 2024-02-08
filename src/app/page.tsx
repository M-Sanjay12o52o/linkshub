import { getServerSession } from "next-auth";
import Links from "../components/Links";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className=" max-w-5xl mx-auto ">
      <div>{JSON.stringify(session)}</div>
      {" "}
      <Links />{" "}
    </div>
  );
}
