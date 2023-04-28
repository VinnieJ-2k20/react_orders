import './App.scss';

import { useState } from 'react';
import goodsFromServer from './api/goods.json';
import colorsFromServer from './api/colors.json';
import { Color, Good, GoodWithColor } from './app.typedefs';
import { GoodForm, GoodsList } from './components';

const findColorById = (
  colors: Color[],
  colorId: number,
): Color | null => (
  colors.find(({ id }) => colorId === id) || null
);

const prepareGoods = (
  goods: Good[],
  colors: Color[],
): GoodWithColor[] => {
  return goods.map((good) => ({
    ...good,
    color: findColorById(colors, good.colorId),
  }));
};

const preparedGoods = prepareGoods(
  goodsFromServer,
  colorsFromServer,
);

const App = () => {
  const [goods, setGoods] = useState<GoodWithColor[]>(preparedGoods);

  const addGood = (name: string, colorId: number) => {
    const newGood: GoodWithColor = {
      id: Date.now() + Math.random(),
      name,
      colorId,
      color: findColorById(colorsFromServer, colorId),
    };

    setGoods((prevGoods) => ([newGood, ...prevGoods]));
  };

  const updateGood = (
    selectedGoodId: number,
    name: string,
    colorId: number,
  ) => {
    setGoods((prevGoods) => (
      prevGoods.map((good) => {
        if (good.id !== selectedGoodId) {
          return good;
        }

        return {
          ...good,
          name,
          colorId,
          color: findColorById(colorsFromServer, colorId),
        };
      })
    ));
  };

  const deleteGood = (goodId: number) => {
    setGoods((prevGoods) => (
      prevGoods.filter(({ id }) => id !== goodId)
    ));
  };

  return (
    <div>
      <h1>Add Good Form</h1>

      <GoodForm
        processGoodCallback={addGood}
        colorOptions={colorsFromServer}
      />

      <GoodsList
        goods={goods}
        handleGoodUpdate={updateGood}
        handleGoodDeletion={deleteGood}
        colorOptions={colorsFromServer}
      />
    </div>
  );
};

export default App;
