import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useIdentity } from './identity';
import { createHash } from 'crypto';

type Props = {
  clicked?: EventTarget;
};

const Header: FC<Props> = ({ clicked }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLImageElement>(null);
  const avatarMenu = useRef<HTMLDivElement>(null);
  const me = useIdentity();

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
        <h3>Sugma</h3>
      </Brand>
      <Nav>
        <Link href="/" passHref>
          <NavItem className="active">Dashboard</NavItem>
        </Link>
        <NavItem className="new">New Link</NavItem>
      </Nav>
      <User>
        <Icon
          height="22"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.14773 14.1525C9.39198 14.3457 9.43068 14.697 9.23419 14.9372C9.08893 15.1148 8.92107 15.2738 8.74319 15.404C8.14396 15.8608 7.38213 16.0679 6.62554 15.9803C5.86829 15.8927 5.17753 15.517 4.70613 14.9352C4.5108 14.6941 4.5512 14.3429 4.79638 14.1508C5.04156 13.9588 5.39866 13.9985 5.59399 14.2396C5.87829 14.5905 6.29728 14.8184 6.75821 14.8717C7.21981 14.9251 7.68415 14.7989 8.05623 14.5154C8.16594 14.435 8.26454 14.3416 8.3497 14.2375C8.54619 13.9973 8.90348 13.9593 9.14773 14.1525ZM1.36057 5.59979L1.37071 5.12313C1.37796 4.91924 1.38918 4.72998 1.40564 4.54477C1.65245 1.95565 4.19642 0 6.971 0H7.02974C9.80283 0 12.3475 1.95428 12.6028 4.54829C12.6174 4.71319 12.6237 4.85966 12.6256 5.06565L12.6263 5.69586C12.627 5.75326 12.628 5.80375 12.6295 5.85082L12.6371 6.00781L12.6738 6.15751C12.7897 6.57442 12.9933 6.9642 13.2722 7.30257L13.3963 7.44437L13.4471 7.50774C13.7816 7.99335 13.9727 8.55841 14 9.16698L13.9992 9.48963C13.9758 10.2104 13.7035 10.9065 13.2043 11.4865C12.5433 12.1681 11.6475 12.5915 10.6954 12.6766C8.23693 12.9359 5.75647 12.9359 3.30479 12.6773C2.3462 12.5877 1.45307 12.1655 0.763107 11.4579C0.254322 10.8553 -0.0161289 10.0966 0.000744422 9.32995L0.00144091 9.13934C0.0308352 8.55642 0.220736 7.99188 0.55124 7.50416L0.606558 7.43503C0.992556 7.02394 1.25645 6.52084 1.37096 5.97844L1.35857 6.02716L1.36057 5.59979ZM7.02974 1.11628H6.971C4.74889 1.11628 2.72426 2.67269 2.5362 4.64542C2.52657 4.75382 2.5189 4.86566 2.5129 4.98336L2.49967 5.35647L2.4943 6.09189L2.48245 6.20534C2.32601 6.94641 1.966 7.63274 1.44059 8.19229L1.48117 8.1466L1.4086 8.26327C1.27267 8.5012 1.18497 8.7596 1.15032 9.01459L1.13594 9.16698L1.13581 9.34193C1.12468 9.8514 1.30189 10.3485 1.60892 10.7144C2.08255 11.1988 2.72327 11.5016 3.41903 11.5667C5.79706 11.8175 8.19634 11.8175 10.5835 11.5658C11.2717 11.5042 11.912 11.2016 12.3598 10.7413C12.6988 10.3464 12.8779 9.84772 12.8648 9.32286L12.8655 9.19211C12.8481 8.81485 12.7244 8.44901 12.5072 8.13375L12.5198 8.15405L12.4062 8.02468C12.0147 7.55527 11.7303 7.0108 11.572 6.42717L11.5185 6.20654L11.5079 6.13241C11.4999 6.0241 11.4953 5.92785 11.4928 5.81211L11.4905 5.0884C11.489 4.90435 11.4839 4.78047 11.4724 4.65061C11.2777 2.6726 9.25121 1.11628 7.02974 1.11628Z"
            fill="#E5E5E5"
          />
        </Icon>
        {me?.email && (
          <Avatar
            ref={menuButton}
            src={`https://www.gravatar.com/avatar/${createHash('md5')
              .update(me.email)
              .digest('hex')}?s=50`}
            alt={`${me.name}'s avatar`}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        )}
        {menuOpen && (
          <AvatarMenu ref={avatarMenu}>
            <AvatarMenuLink href="/cdn-cgi/access/logout">
              Logout
            </AvatarMenuLink>
          </AvatarMenu>
        )}
      </User>
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
  max-width: 1000px;
  padding: 0 8px;
  border-bottom: 1px solid var(--header_active);
`;

const NavItem = styled.a`
  display: inline-block;
  padding: 8px 12px;
  font-size: 0.9em;
  border-radius: 6px;
  color: var(--header_text);
  text-decoration: none;
  margin: 2px 3px 10px 3px;

  &.active {
    background: var(--header_active);
  }

  &.new {
    margin-left: auto;
    background: var(--accent);
  }
`;

const User = styled.div`
  flex: 1;
  text-align: right;
  position: relative;
`;

const Icon = styled.svg`
  padding: 7px;
  margin-right: 25px;
`;

const Avatar = styled.img`
  height: 36px;
  border: 1px solid var(--header_active);
  border-radius: 50%;
  color: var(--header_text);
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
