import { useState } from "react";
import { Quest } from "../models/Quest";
import { StyledButtonCard, StyledCard } from "./cardStyles";
import { freeSquareQuest } from "../utils/questGeneration";
import { getStoredQuestCompleted, getStoredSubtaskCompleted, storeCompleteQuest, storeCompleteSubtask } from "../utils/storageUtils";

type Props = {
  quest: Quest;
  index: number;
  updateQuest: (questIndex: number, completed: boolean) => void;
}

export const QuestCard = (props: Props) => {
  const { quest, index, updateQuest } = props;

  const initCompleted = quest === freeSquareQuest || getStoredQuestCompleted(index);
  const [isComplete, setComplete] = useState<boolean>(initCompleted);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subtasksComplete, setSubtasksComplete] = useState<boolean[]>(quest.subgoals ? quest.subgoals.map((subtask, idx) => getStoredSubtaskCompleted(index, idx)) : []);

  const complete = () => {
    storeCompleteQuest(index, !isComplete);
    updateQuest(index, !isComplete);
    setComplete(!isComplete);
  }

  const completeSubtask = (subtaskIndex: number) => {
    const completed = !subtasksComplete[subtaskIndex];
    storeCompleteSubtask(index, subtaskIndex, completed);
    setSubtasksComplete([...subtasksComplete].splice(subtaskIndex, 1, completed));
  }

  const QuestInfo = <div>
    <p className='quest-info'>{`${quest.category} - ${quest.xp} XP`}</p>
    <p className='quest-objective'>{quest.objective}</p>
  </div>

  const commonProps = {
    $questCategory: quest.category,
    $complete: isComplete
  }

  return quest.subgoals ?
    <StyledCard {...commonProps} >
      {QuestInfo}
      <div className='subgoals-list'>
        {quest.subgoals.map(((subgoal, idx) => {
          return <div key={subgoal.goal + idx}>
            <input type="checkbox" value={String(subtasksComplete[idx])} onClick={() => { completeSubtask(idx) }} />
            <span>{subgoal.goal}</span>
          </div>;
        }))}
      </div>
      <button onClick={complete}>DONE</button>
    </StyledCard>
    : <StyledButtonCard {...commonProps} role="button" onClick={complete}>
      {QuestInfo}
    </StyledButtonCard>;
}
