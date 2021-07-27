import {
  FC,
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import { Identity } from 'types/identity';

export const IdentityContext =
  createContext<[Identity | null, (user: Identity) => void]>(null);
export const useIdentity = () => useContext(IdentityContext);

const IdentityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Identity | null>(null);

  const setIdentity = useCallback((identity) => {
    setUser(identity);
  }, []);

  useEffect(() => {
    fetch(`/api/me`)
      .then((data) => data.json())
      .then((data) => {
        if (!data.id) setUser(null);
        else setUser(data);
      });
  }, []);

  return (
    <IdentityContext.Provider value={[user, setIdentity]}>
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
