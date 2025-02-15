import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Mutation from './3_Mutation'

const queryClient = new QueryClient()

function TanStack() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Mutation/>
            </QueryClientProvider>

        </div>
    )
}

export default TanStack
