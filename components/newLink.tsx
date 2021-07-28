import { ChangeEvent, FC, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { Button } from './button';
import { useIdentity } from './identity';
import { useModal } from './modal';

type Values = {
  slug?: string;
  destination: string;
};

const NewLink: FC = () => {
  const { closeModal } = useModal();
  const { events } = useIdentity();
  const [permanent, setPermanent] = useState<boolean>(true);
  const [values, setValues] = useState<Values>({ destination: '' });
  const [valueErrors, setValueErrors] = useState<
    Partial<Record<keyof Values, String>>
  >({});

  const set = (name: keyof Values) => {
    return ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
      setValueErrors((oldValues) => ({ ...oldValues, [name]: null }));
    };
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const create = await fetch(`/api/create`, {
      method: 'POST',
      body: JSON.stringify({ ...values, permanent }),
      headers: { 'Content-Type': 'application/json' },
    }).then((data) => data.json());

    if (create.field && create.error)
      return setValueErrors({ [create.field]: create.error });

    events.emit('newLink', create);
    closeModal();
  };

  return (
    <Group onSubmit={onSubmit}>
      <div className="section">
        <Input
          placeholder="Short URI"
          onChange={set('slug')}
          className={valueErrors.slug ? 'error' : ''}
        />
        <div className="checkbox">
          <p onClick={() => setPermanent(!permanent)}>
            {permanent ? 'Permanent' : 'Temporary'}
          </p>
          <Checkbox>
            <input
              type="checkbox"
              checked={permanent}
              onChange={() => setPermanent(!permanent)}
            />
            <span></span>
          </Checkbox>
        </div>
      </div>
      <div className="section">
        <Input
          required
          placeholder="Original URL"
          onChange={set('destination')}
          className={valueErrors.destination ? 'error' : ''}
        />
      </div>
      <div className="section">
        <Button className="new">Create</Button>
      </div>
    </Group>
  );
};

export default NewLink;

const Group = styled.form`
  margin: auto;
  width: 600px;
  max-width: 100%;

  div.section {
    margin: 15px;
    display: flex;
    align-items: center;

    ${Button} {
      flex: 1;
    }
  }

  div.checkbox {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: right;
    margin-left: 25px;

    p {
      margin: 0;
      user-select: none;
    }
  }
`;

const Input = styled.input`
  background: var(--background_300);
  border: none;
  outline: none;
  flex: 1;
  padding: 8px 12px;
  font-size: 0.9em;
  vertical-align: center;
  color: var(--content_text);
  border: 2px solid transparent;
  border-radius: 6px;

  &.error {
    border-color: var(--error);
  }

  &:focus {
    border-color: var(--accent);
  }
`;

const Checkbox = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 0 10px;

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: '';
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: var(--content_text);
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + span {
      background-color: var(--accent);
    }

    &:focus + span {
      box-shadow: 0 0 1px var(--accent);
    }

    &:checked + span:before {
      transform: translateX(16px);
    }
  }
`;
