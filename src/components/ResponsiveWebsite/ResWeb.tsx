
import { ThemeProvider } from "@mui/material";
import { dashboardTheme } from '../../dashboard'
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

function ResWeb() {
  return (
    <div>
      <ThemeProvider theme={dashboardTheme}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default ResWeb
