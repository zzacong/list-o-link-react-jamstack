import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import LinkList from './components/LinkList'
import LinkForm from './components/LinkForm'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container py-5">
        <h1 className="text-center mb-5">List O' Link</h1>
        <LinkForm />
        <LinkList />
      </div>
    </QueryClientProvider>
  )
}
