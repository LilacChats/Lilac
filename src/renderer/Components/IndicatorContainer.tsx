import React, { useState, useEffect } from 'react';
import '../Styles/IndicatorContainer.css';
import { PAGES } from '../../objs';
import { IndicatorProps } from '../../TypeModels/IndicatorModel';

const IndicatorContainer: React.FC<IndicatorProps> = ({ activePointer }) => {
  useEffect(() => {
    let tempArr: number[] = [];
    for (let i = 0; i < PAGES; i++)
      if (activePointer == i) tempArr.push(1);
      else tempArr.push(0);
    setPoints(tempArr);
  }, [activePointer]);
  const [points, setPoints] = useState<number[]>([]);
  return (
    <div className="IndicatorContainer">
      {points.length > 0
        ? points.map((item, index) => {
            if (item == 1)
              return <div key={index} className="ActivePointer"></div>;
            else return <div key={index} className="InactivePointer"></div>;
          })
        : null}
    </div>
  );
};

export default IndicatorContainer;
