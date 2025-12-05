'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function QueryProvider({
   children,
}: {
   children: React.ReactNode
}) {
   const queryClient = new QueryClient()
   // const [queryClient] = useState(
   //    () =>
   //       new QueryClient({
   //          defaultOptions: {
   //             queries: {
   //                staleTime: 5 * 1000,
   //                refetchInterval: 5 * 1000,
   //             },
   //          },
   //       })
   // )
   return (
      <QueryClientProvider client={queryClient}>
         {children}
         {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
   )
}
