import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useIdentity } from './identity';
import { useModal } from './modal';
import { Avatar } from './avatar';
import { Button } from './button';
import NewLink from './newLink';

type Props = {
  clicked?: EventTarget;
};

const Header: FC<Props> = ({ clicked }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLImageElement>(null);
  const avatarMenu = useRef<HTMLDivElement>(null);
  const { identity } = useIdentity();
  const { setModal } = useModal();

  useEffect(() => {
    if (avatarMenu.current === null || menuButton.current === null)
      return () => {};
    if (clicked === menuButton.current) return () => {};

    let hasClicked = false;
    Array.from(avatarMenu.current.children).forEach((child) => {
      if (child === clicked) hasClicked = true;
    });
    if (!hasClicked) setMenuOpen(false);
  }, [clicked]);

  return (
    <Head>
      <Brand>
        <h3 title="🥜 Short URLs Get More Attention">🥜 SUGMA</h3>
      </Brand>
      {identity && (
        <Nav>
          <Button className="active">
            <Link href="/admin" passHref>
              <a>Dashboard</a>
            </Link>
          </Button>
          <Button
            className="new"
            onClick={(e) =>
              setModal({
                btn: e.target,
                title: 'Create a new short link',
                component: NewLink,
              })
            }
          >
            New Link
          </Button>
        </Nav>
      )}
      {identity && (
        <User>
          <Avatar
            ref={menuButton}
            email={identity.email}
            name={identity.name}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <AvatarMenu ref={avatarMenu}>
              <AvatarMenuLink href="/cdn-cgi/access/logout">
                Logout
              </AvatarMenuLink>
            </AvatarMenu>
          )}
        </User>
      )}
    </Head>
  );
};

export default Header;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Brand = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;

  h3 {
    font-weight: 100;
    padding-left: 15px;
    padding-top: 3px;
    font-size: 1.5em;
    color: var(--header_text);
    margin: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex: 2;
  max-width: 1280px;
  padding: 0 8px;
  border-bottom: 1px solid var(--header_active);

  @media only screen and (max-width: 1080px) {
    order: 1;
    flex: 1;
    flex-basis: 100%;
    margin-top: 15px;
  }

  ${Button} {
    margin: 2px 3px 10px 3px;

    &.new {
      margin-left: auto;
    }
  }
`;

const User = styled.div`
  flex: 1;
  text-align: right;
  position: relative;
`;

const AvatarMenu = styled.div`
  position: absolute;
  margin-top: 15px;
  right: -8px;
  min-width: 200px;
  background: var(--background_200);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: left;

  &:after {
    position: absolute;
    display: block;
    content: '';
    border: 6px solid transparent;
    border-color: var(--background_200) transparent transparent
      var(--background_200);
    right: 21px;
    top: -5px;
    transform: rotate(45deg);
  }
`;

const AvatarMenuLink = styled.a`
  margin: 5px;
  display: block;
  padding: 8px 12px;
  border-radius: 10px;
  color: var(--header_text);
  text-decoration: none;

  &:hover {
    background: var(--background_100);
  }
`;
