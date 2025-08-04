import Router from '@/routes/Router';
import { initializeAuthListener } from '@/store/user.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeAuthListener();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
