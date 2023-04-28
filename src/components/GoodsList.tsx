import { FC, useState } from 'react';
import { Color, GoodWithColor } from '../app.typedefs';
import { GoodInfo } from './GoodInfo';
import { GoodForm } from './GoodForm';

interface Props {
  goods: GoodWithColor[];
  handleGoodUpdate: (
    selectedGoodId: number,
    name: string,
    colorId: number,
  ) => void;
  handleGoodDeletion: (goodId: number) => void;
  colorOptions: Color[];
}

export const GoodsList: FC<Props> = ({
  goods,
  handleGoodDeletion,
  colorOptions,
  handleGoodUpdate,
}) => {
  const [selectedGoodId, setSelectedGoodId] = useState<number | null>(null);

  const handleGoodSelection = (goodId: number) => {
    setSelectedGoodId(goodId);
  };

  const processGood = (name: string, colorId: number) => {
    if (selectedGoodId === null) {
      return;
    }

    handleGoodUpdate(selectedGoodId, name, colorId);
    setSelectedGoodId(null);
  };

  return (
    <ul>
      {goods.map((good) => (
        <li
          key={good.id}
          style={{ color: good.color?.name || 'black' }}
        >
          {selectedGoodId === good.id
            ? (
              <GoodForm
                processGoodCallback={processGood}
                colorOptions={colorOptions}
                good={good}
              />
            )
            : (
              <GoodInfo
                good={good}
                handleGoodDeletion={handleGoodDeletion}
                handleGoodSelection={handleGoodSelection}
              />
            )}
        </li>
      ))}
    </ul>
  );
};
