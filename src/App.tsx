import { useEffect, useState } from 'react';
import './App.css';
import { Quest } from './models/Quest';
import { QuestCard } from './QuestCard';
import { generateQuests } from './utils/QuestGeneration';

const App = () => {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    setQuests(generateQuests({
      'EXERCISE': 5,
      'WALK': 1,
      'HYDRATION': 3
    }));
  }, []);

  const completeQuest = (questIndex: number) => {
    const quest = quests[questIndex];
    const currentXP = Number(localStorage.getItem('xp')) ?? 0;
    localStorage.setItem('xp', (currentXP + quest.xp).toString());
    const newQuests = quests.filter((_, idx) => idx !== questIndex);
    setQuests(newQuests);
  }

  const skipQuest = (questIndex: number) => {
    const newQuests = quests.filter((_, idx) => idx !== questIndex);
    setQuests(newQuests);
  }

  return <main>
    <h1>Quests</h1>
    <p>Total XP: {localStorage.getItem('xp') ?? 0}</p>
    {quests.map((quest, idx) =>
      <QuestCard
        quest={quest}
        completeQuest={() => completeQuest(idx)}
        skipQuest={() => skipQuest(idx)}
      />)}
  </main>

}

export default App;
