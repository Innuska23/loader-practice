import { useEffect } from 'react';
import { Decks } from '../features/decks/Decks.tsx';
import { GlobalError } from './GlobalError/GlobalError.tsx';
import { useAppSelector, useAppDispatch } from './store.ts';
import { selectAppStatus } from './app-selectors.ts';
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx';
import { fetchDecksTC } from '../features/decks/decks-thunks.ts';

export const App = () => {
  const status = useAppSelector(selectAppStatus);

  return (
    <div>
      {status === 'loading' && <LinearLoader />}
      <Decks />
      <GlobalError />
    </div>
  );
};
