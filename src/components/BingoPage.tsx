import { useEffect, useState } from 'react';
import { Quest } from '../models/Quest';
import { QuestCard } from './QuestCard';
import { freeSquareQuest, generateQuests } from '../utils/questGeneration';
import { BingoBoard } from './bingoStyles';
import { todayRNG } from '../utils/randomUtils';
import { getStoredXP, storeXP } from '../utils/storageUtils';

export const BingoPage = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [totalXP, setTotalXP] = useState<number>(getStoredXP());
  const BINGO_SIZE = 5;

  useEffect(() => {
    const newQuests = addFreeSquare((randomizeOrder(generateQuests(BINGO_SIZE ** 2 - 1))));
    setQuests(newQuests);
  }, []);

  useEffect(() => {
    storeXP(totalXP);
  }, [totalXP]);

  const randomizeOrder = (quests: Quest[]) => {
    return quests
      .map(value => ({ value, sort: todayRNG() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const addFreeSquare = (quests: Quest[]) => {
    const halfBingoSize = Math.floor(BINGO_SIZE / 2);
    const centerIndex = halfBingoSize * BINGO_SIZE + halfBingoSize;
    quests.splice(centerIndex, 0, freeSquareQuest);
    return quests;
  }

  const updateQuest = (questIndex: number, completed: boolean) => {
    const quest = quests[questIndex];
    const newXP = totalXP + (completed ? quest.xp : -quest.xp);
    setTotalXP(newXP);
    console.log(newXP);
  }

  // const getQuestChunks = (quests: Quest[]): Quest[][] => {
  //   const rows: Quest[][] = [];
  //   const halfBingoSize = Math.floor(BINGO_SIZE / 2);
  //   const centerIndex = halfBingoSize * BINGO_SIZE + halfBingoSize;
  //   for (let i = 0; i < quests.length; i++) {
  //     const rowIndex = Math.floor(i / BINGO_SIZE);
  //     if (!rows[rowIndex]) {
  //       rows[rowIndex] = [];
  //     }
  //     if (i === centerIndex) {
  //       rows[rowIndex].push({
  //         objective: 'Free Square',
  //         category: 'DAILY',
  //         xp: 5
  //       })
  //     }
  //     else {
  //       rows[rowIndex].push(quests[i]);
  //     }
  //   }
  //   return rows;
  // }

  return <main>
    <h1>Quests</h1>
    <p>Total XP: {totalXP}</p>
    <button onClick={() => {
      setTotalXP(0);
    }}>Reset XP</button>
    <button onClick={() => {
      localStorage.clear();
    }}>Clear storage</button>
    <BingoBoard>
      {quests.map((quest, idx) =>
        <QuestCard
          key={quest.objective + idx.toString()}
          index={idx}
          quest={quest}
          updateQuest={updateQuest}
        />
      )}
    </BingoBoard>
  </main>
}