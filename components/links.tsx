import { Avatar } from 'components/avatar';
import { timeSince } from 'lib/time';
import { FC } from 'react';
import styled from 'styled-components';
import { Section } from './section';

type Props = {
  links: {
    id: string;
    slug: string;
    destination: string;
    permanent: boolean;
    author: { name: string; email: string };
    _count: { clicks: number };
  }[];
};

const Links: FC<Props> = ({ links }) => {
  return (
    <StyledTable>
      <StyledHead>
        <StyledCol>Short URI</StyledCol>
        <StyledCol>Original URL</StyledCol>
        <StyledCol>Redirect Type</StyledCol>
        <StyledCol>Clicks</StyledCol>
        <StyledCol>Created At</StyledCol>
        <StyledCol className="center">Created By</StyledCol>
      </StyledHead>
      {links
        .sort(
          (a, b) =>
            new Date(parseInt(b.id.substr(1, 8), 36)).getTime() -
            new Date(parseInt(a.id.substr(1, 8), 36)).getTime(),
        )
        .map((link) => (
          <StyledBody key={link.id}>
            <StyledCol>{link.slug}</StyledCol>
            <StyledCol>{link.destination}</StyledCol>
            <StyledCol className="cap">
              {link.permanent ? 'Permanent' : 'Temporary'}
            </StyledCol>
            <StyledCol>{link._count.clicks}</StyledCol>
            <StyledCol>
              {timeSince(new Date(parseInt(link.id.substr(1, 8), 36)))}
            </StyledCol>
            <StyledCol className="center">
              <Avatar {...link.author} />
            </StyledCol>
          </StyledBody>
        ))}
    </StyledTable>
  );
};

export default Links;

const StyledTable = styled(Section)`
  overflow: hidden;
  overflow-x: auto;
`;

const StyledHead = styled.div`
  min-width: 850px;
  display: flex;
  background: var(--background_300);
  text-transform: uppercase;
  text-align: left;
  font-size: 0.8em;
  padding: 15px 0;
  border-bottom: 1px solid var(--background_100);
  font-weight: 400;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

const StyledBody = styled.div`
  min-width: 850px;
  display: flex;
  text-align: left;
  padding: 5px 0;
  font-weight: 200;
  align-items: center;

  &:nth-child(odd) {
    background: var(--background_300);
  }
`;

const StyledCol = styled.div`
  display: flex;
  flex: 0.75;
  margin: 0 15px;
  font-size: 0.9em;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.cap {
    text-transform: uppercase;
    font-weight: 500;
  }

  &.center {
    justify-content: center;
  }

  @media only screen and (max-width: 1050px) {
    flex: 0.9;
  }

  &:nth-child(2) {
    flex: 5;

    @media only screen and (max-width: 975px) {
      flex: 4;
    }
  }

  &:nth-child(3) {
    flex: 1.25;
  }
`;
