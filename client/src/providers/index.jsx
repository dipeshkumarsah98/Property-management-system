import { QueryClient, QueryClientProvider } from "react-query";
import { UserDetailProvider } from "src/context/UserDetailContext";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserDetailProvider>{children}</UserDetailProvider>
      </QueryClientProvider>
    </>
  );
}
