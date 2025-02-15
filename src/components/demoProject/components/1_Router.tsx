import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AddUser from "./3_AddUser"
import GetUser from "./2_GetUser"

const queryClient = new QueryClient()

function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <GetUser/>
      <AddUser />
    </QueryClientProvider>

  )
}

export default Router
