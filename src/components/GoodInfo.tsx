import { FC } from 'react';
import { GoodWithColor } from '../app.typedefs';

interface Props {
  good: GoodWithColor;
  handleGoodSelection: (goodId: number) => void;
  handleGoodDeletion: (goodId: number) => void;
}

export const GoodInfo: FC<Props> = ({
  good, handleGoodDeletion, handleGoodSelection,
}) => (
  <>
    <span>{good.name}</span>

    <button
      type="button"
      className="deleteButton"
      onClick={() => handleGoodSelection(good.id)}
    >
      Edit
    </button>

    <button
      type="button"
      className="deleteButton"
      onClick={() => handleGoodDeletion(good.id)}
    >
      x
    </button>
  </>
);
