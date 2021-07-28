import EventEmitter from 'events';
import {
  FC,
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { Identity } from 'types/identity';

export const IdentityContext =
  createContext<{
    identity: Identity | null;
    setIdentity: (user: Identity) => void;
    events: EventEmitter;
  }>(null);
export const useIdentity = () => useContext(IdentityContext);

const IdentityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [events] = useState(new EventEmitter());

  useEffect(() => {
    fetch(`/api/me`)
      .then((data) => data.json())
      .then((data) => {
        if (!data.id) setIdentity(null);
        else setIdentity(data);
      });
  }, []);

  return (
    <IdentityContext.Provider value={{ identity, setIdentity, events }}>
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
