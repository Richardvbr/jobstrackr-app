import { Header } from "@/components";
import { trpc } from "@/lib/trpc";

const DashboardPage = () => {
  const { data } = trpc.user.getUsers.useQuery();

  console.log(data);

  return (
    <>
      {/* <Header /> */}
      <h1>{`Hello, user list: ${JSON.stringify(data)}`} </h1>
    </>
  );
};

export default DashboardPage;
