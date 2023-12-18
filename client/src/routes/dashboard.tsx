import { trpc } from "@/lib/trpc";

const DashboardPage = () => {
  const { data } = trpc.user.getUsers.useQuery();

  return (
    <>
      <h1>{`Hello, user list: ${JSON.stringify(data)}`} </h1>
    </>
  );
};

export default DashboardPage;
