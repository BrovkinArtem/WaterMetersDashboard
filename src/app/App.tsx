import { StoreProvider } from '@/app/providers/StoreProvider';
import { createRootStore } from '@/app/store/rootStore';
import { MetersPage } from '@/pages/meters-page/ui/MetersPage';

const rootStore = createRootStore();

export function App() {
  return (
    <StoreProvider store={rootStore}>
      <MetersPage />
    </StoreProvider>
  );
}
