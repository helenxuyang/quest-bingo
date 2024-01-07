import { useEffect, useState } from 'react';
import { Quest } from '../models/Quest';
import { QuestCard } from './QuestCard';
import { freeSquareQuest, generateQuests } from '../utils/questGeneration';
import { BingoBoard } from './bingoStyles';

export const QuestsPage = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [totalXP, setTotalXP] = useState<number>(Number(localStorage.getItem('xp')) ?? 0);
  const BINGO_SIZE = 5;

  useEffect(() => {
    const newQuests = addFreeSquare((randomizeOrder(generateQuests(BINGO_SIZE ** 2 - 1))));
    setQuests(newQuests);
  }, []);

  useEffect(() => {
    localStorage.setItem('xp', totalXP.toString());
  }, [totalXP]);

  // const setSortedQuests = (newQuests: Quest[]) => {
  //   const sortedQuests = newQuests.sort((q1, q2) => q1.category < q2.category ? 1 : -1);
  //   setQuests(sortedQuests);
  // }

  const randomizeOrder = (quests: Quest[]) => {
    return quests
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const addFreeSquare = (quests: Quest[]) => {
    const halfBingoSize = Math.floor(BINGO_SIZE / 2);
    const centerIndex = halfBingoSize * BINGO_SIZE + halfBingoSize;
    quests.splice(centerIndex, 0, freeSquareQuest);
    return quests;
  }

  const completeQuest = (questIndex: number) => {
    const quest = quests[questIndex];
    setTotalXP(totalXP + quest.xp);
  }

  const undoCompleteQuest = (questIndex: number) => {
    const quest = quests[questIndex];
    setTotalXP(totalXP - quest.xp);
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
    <BingoBoard>
      {quests.map((quest, idx) =>
        <QuestCard
          quest={quest}
          completeQuest={() => completeQuest(idx)}
          undoCompleteQuest={() => undoCompleteQuest(idx)}
        />
      )}
    </BingoBoard>
  </main>
}