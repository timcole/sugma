import { createHash } from 'crypto';
import { forwardRef, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = {
  email: string;
  name: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Avatar = forwardRef<HTMLImageElement, Props>(
  ({ email, name, ...props }, ref) => (
    <AvatarImg
      ref={ref}
      src={`https://www.gravatar.com/avatar/${createHash('md5')
        .update(email)
        .digest('hex')}?s=50&d=mp`}
      alt={`${name}'s avatar`}
      {...props}
    />
  ),
);

const AvatarImg = styled.img`
  height: 36px;
  border: 1px solid var(--header_active);
  border-radius: 50%;
  color: var(--header_text);
`;
