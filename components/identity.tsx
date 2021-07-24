import {
  FC,
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { Identity } from 'types/identity';

export const IdentityContext = createContext<Identity | null>(null);
export const useIdentity = () => useContext(IdentityContext);

const IdentityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Identity>();

  useEffect(() => {
    fetch(`/api/me`)
      .then((data) => data.json())
      .then((data) => {
        if (data.err || data.errno || !data.id) setUser(null);
        else setUser(data);
      });
  }, []);

  return (
    <IdentityContext.Provider value={{ ...user }}>
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
