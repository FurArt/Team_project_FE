import { useState } from "react";

export const useUniqueRandom = (maxValue: number) => {
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);

  const getRandomNumber = () => {
    if (usedNumbers.length >= maxValue + 1) {
      console.warn("All numbers have been used!");
      return null; 
    }

    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * (maxValue + 1));
    } while (usedNumbers.includes(randomNum));

    setUsedNumbers([...usedNumbers, randomNum]);
    return randomNum;
  };

  return { getRandomNumber, usedNumbers };
};
