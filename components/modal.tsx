import {
  FC,
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  // useCallback,
} from 'react';
import styled from 'styled-components';

type Modal = {
  btn: EventTarget;
  title: string;
  component: FC;
};

export const ModalContext = createContext<(model: Modal | null) => void>(null);
export const useModal = () => useContext(ModalContext);

type Props = {
  children: ReactNode;
  clicked?: EventTarget;
};

const ModalProvider: FC<Props> = ({ children, clicked }) => {
  const [modal, setModal] = useState<Modal>(null);
  const [out, setOut] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modal || !modalRef.current || clicked === modal.btn || out)
      return () => {};

    let hasClickedIn = false;
    let parent: HTMLElement = clicked as HTMLElement;
    while (parent) {
      parent = parent.parentElement;
      if (parent === modalRef.current) hasClickedIn = true;
    }
    if (!hasClickedIn) setOut(true);
  }, [clicked, out]);

  useEffect(() => {
    if (out)
      setTimeout(() => {
        setModal(null);
        setOut(false);
      }, 150);
  }, [out]);

  return (
    <ModalContext.Provider value={setModal}>
      {children}
      {modal && (
        <Modal ref={modalRef} className={out ? 'out' : ''}>
          <div className="content">
            <div className="title">
              <p>{modal.title}</p>
            </div>
            <modal.component />
          </div>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(var(--header_100), 0.8);
  animation: bg 150ms linear;

  &.out {
    animation: bgOut 150ms linear;
    div.content {
      animation: topOut 150ms linear;
    }
  }

  div.title {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    background: var(--background_300);
    text-transform: uppercase;
    font-size: 0.8em;
    border-top: 1px solid var(--background_100);
    font-weight: 400;

    p {
      margin: 15px;
    }
  }

  div.content {
    top: 0;
    max-height: 300px;
    position: relative;
    width: 100%;
    max-width: 1080px;
    overflow: auto;
    height: 100%;
    margin: 0 auto;
    background: var(--background_200);
    border-radius: 0 0 10px 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    animation: top 150ms linear;
  }

  @keyframes bg {
    0% {
      background: rgba(var(--header_100), 0);
    }
    100% {
      background: rgba(var(--header_100), 0.8);
    }
  }

  @keyframes bgOut {
    0% {
      background: rgba(var(--header_100), 0.8);
    }
    100% {
      background: rgba(var(--header_100), 0);
    }
  }

  @keyframes top {
    0% {
      top: -300px;
    }
    100% {
      top: 0;
    }
  }

  @keyframes topOut {
    0% {
      top: 0;
    }
    100% {
      top: -300px;
    }
  }
`;
