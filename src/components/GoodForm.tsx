/* eslint-disable react/require-default-props */
import cn from 'classnames';
import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { Color, Good } from '../app.typedefs';

interface Props {
  processGoodCallback: (name: string, colorId: number) => void;
  colorOptions: Color[];
  good?: Good;
}

export const GoodForm: FC<Props> = ({
  processGoodCallback,
  colorOptions,
  good,
}) => {
  const [newGoodName, setNewGoodName] = useState(good?.name || '');
  const [hasNameError, setHasNameError] = useState(false);

  const [newGoodColorId, setNewGoodColorId] = useState(good?.colorId || 0);
  const [hasColorError, setHasColorError] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedName = newGoodName.trim();

    setHasNameError(!trimmedName);
    setHasColorError(!newGoodColorId);

    if (!trimmedName || !newGoodColorId) {
      return;
    }

    processGoodCallback(newGoodName, newGoodColorId);
    setNewGoodName('');
    setNewGoodColorId(0);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasNameError(false);
    setNewGoodName(event.target.value);
  };

  const handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHasColorError(false);
    setNewGoodColorId(+event.target.value);
  };

  return (
    <form
      method="POST"
      action="#"
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="newGoodName">
        {'Name: '}
        <input
          type="text"
          id="newGoodName"
          placeholder="Input name"
          value={newGoodName}
          onChange={handleNameChange}
          className={cn({ 'with-error': hasNameError })}
        />
      </label>

      <label htmlFor="newGoodColor">
        {' Color: '}
        <select
          id="newGoodColor"
          value={newGoodColorId}
          onChange={handleColorChange}
          className={cn({ 'with-error': hasColorError })}
        >
          <option value={0}>
            Choose color
          </option>

          {colorOptions.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">
        Submit
      </button>
    </form>
  );
};
