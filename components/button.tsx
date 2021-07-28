import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: 8px 12px;
  font-size: 0.9em;
  border-radius: 6px;
  border: none;
  color: var(--header_text);

  &:hover {
    opacity: 0.9;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  &.active {
    background: var(--header_active);
  }

  &.new {
    background: var(--accent);
  }
`;
