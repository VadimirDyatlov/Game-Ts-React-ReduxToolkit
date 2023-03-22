/* eslint-disable import/no-unresolved */
import {
  IBaullet, IEnemies, IGold, IHero,
} from './types/ReducerTypes/game';
import { IConstObj, IUpgradeHeroValue } from './types/ReducerTypes/upgrade';

export function formatTime(milesSeconds: number | undefined): string {
  if (!milesSeconds) {
    return '0'
  }
  const seconds: string = ((milesSeconds / 1000) % 60).toFixed(0);
  const minutes: string = Math.floor(((milesSeconds / 1000 / 60) % 60)).toString();
  const hours: string = Math.floor((milesSeconds / (1000 * 60 * 60))).toString();
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}

export function radianceNumbers(classN: string): void {
  this.current.classList.remove(classN);
  this.current.classList.add(classN);
  setTimeout(() => {
    this.current.classList.remove(classN);
  }, 700);
}

export function calcUpgrade<HTMLDivElement>(
  direction: string,
  constObj: IConstObj,
  heroValue: IUpgradeHeroValue,
  skill: string,
  activeGold?: number | null,
  ref?: HTMLDivElement,
  defGold?: number,
  heroObj: IHero | null = null,
) {
  let workingArray = null;
  let startValue = null;
  let startPrice = null;
  let PriceCoef = null;
  let maxlengthArray = null;
  let indicatorUpOrDown = 1;
  let lastGold = null;
  let lastValue: number | null = null;
  let nextPrice = null;
  switch (skill) {
    case 'hp':
      workingArray = constObj.hpUpdateArray;
      startPrice = constObj.hpStartPrice;
      lastValue = heroValue.hp;
      PriceCoef = constObj.hpPriceCoefficient;
      if (heroObj) {
        startValue = heroObj.hp;
      }
      break;
    case 'damage':
      workingArray = constObj.damageUpdateArray;
      startPrice = constObj.damageStartPrice;
      lastValue = heroValue.damage;
      PriceCoef = constObj.damagePriceCoefficient;
      if (heroObj) {
        startValue = heroObj.damage;
      }
      break;
    case 'speed':
      workingArray = constObj.speedUpdateArray;
      startPrice = constObj.speedStartPrice;
      lastValue = heroValue.speed;
      PriceCoef = constObj.speedPriceCoefficient;
      if (heroObj) {
        startValue = heroObj.speed;
      }
      break;
    default:
      return null;
  }
  maxlengthArray = workingArray.length - 1;
  if (direction === 'down') {
    maxlengthArray += 1;
    indicatorUpOrDown = -1;
  }
  const index = workingArray.findIndex((el) => el === lastValue);
  nextPrice = (Math.floor(startPrice * PriceCoef ** index));
  if (direction === 'price') {
    if (index === maxlengthArray) return 'max';
    return nextPrice;
  }
  if (index === maxlengthArray) return { [skill]: workingArray[index], gold: activeGold };
  if (startValue === workingArray[index]) return { [skill]: startValue, gold: activeGold };
  if (direction === 'up') {
    if (typeof activeGold === 'number') {
      if (activeGold < nextPrice) {
        return { [skill]: lastValue, gold: activeGold };
      }
    }
    if (typeof activeGold === 'number') {
      lastGold = activeGold - nextPrice;
    }
  }
  if (defGold !== activeGold && direction === 'down') {
    if (typeof activeGold === 'number') {
      lastGold = activeGold + Math.round(nextPrice / PriceCoef);
    }
  }
  radianceNumbers.call(ref, direction);
  return {
    [skill]: index === -1
      ? lastValue : workingArray[index + indicatorUpOrDown],
    gold: lastGold,
  };
}

export function getLvl(num: number): number[] {
  const lvlStack = [180, 460, 790, 1220, 1810, 2600, 3920, 6380, 10000];
  if (num < 180) return [1, lvlStack[0]];
  if (lvlStack[0] <= num && num < lvlStack[1]) return [2, lvlStack[1], lvlStack[0]];
  if (lvlStack[1] <= num && num < lvlStack[2]) return [3, lvlStack[2], lvlStack[1]];
  if (lvlStack[2] <= num && num < lvlStack[3]) return [4, lvlStack[3], lvlStack[2]];
  if (lvlStack[3] <= num && num < lvlStack[4]) return [5, lvlStack[4], lvlStack[3]];
  if (lvlStack[4] <= num && num < lvlStack[5]) return [6, lvlStack[5], lvlStack[4]];
  if (lvlStack[5] <= num && num < lvlStack[6]) return [7, lvlStack[6], lvlStack[5]];
  if (lvlStack[6] <= num && num < lvlStack[7]) return [8, lvlStack[7], lvlStack[6]];
  if (lvlStack[8] <= num && num < lvlStack[9]) return [9, lvlStack[8], lvlStack[7]];
  if (num > lvlStack[9]) return [10, lvlStack[9], lvlStack[8]];
  return [0, 0];
}

export function findNum(max:number, value:number): number {
  return (value / max) * 100;
}

export function objectsCollision(first: IHero | IBaullet, second: IEnemies | IGold, correction?: string): boolean {
  // if (correction === 'bullet') {
  //   return (first.x + first.w >= second.x * 1.2
  //     && first.x <= second.x + second.w * 0.8
  //     && first.y + first.h >= second.y * 1.2
  //     && first.y <= second.y + second.h * 0.8); 
  // }
  const coefficient1 = second.w > 300 ? 1.1 : 1.07
  const coefficient2 = second.w > 300 ? 0.9 : 0.8

    if (correction === 'bullet') {
    return (first.x + first.w >= second.x * coefficient1
      && first.x <= second.x + second.w * coefficient2
      && first.y + first.h >= second.y * coefficient1
      && first.y <= second.y + second.h * coefficient2); 
  }
  return (first.x + first.w >= second.x
    && first.x <= second.x + second.w
    && first.y + first.h >= second.y
    && first.y <= second.y + second.h);
}
