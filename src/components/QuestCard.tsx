import { useState } from "react";
import { Quest } from "../models/Quest";
import { StyledButtonCard, StyledCard } from "./cardStyles";
import { freeSquareQuest } from "../utils/questGeneration";

type Props = {
  quest: Quest;
  completeQuest: () => void;
  undoCompleteQuest: () => void;
}


export const QuestCard = (props: Props) => {
  const { quest, completeQuest, undoCompleteQuest } = props;
  const [isComplete, setComplete] = useState(quest === freeSquareQuest);

  const complete = () => {
    if (isComplete) {
      setComplete(false);
      undoCompleteQuest();
    }
    else {
      setComplete(true);
      completeQuest();
    }
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
        {quest.subgoals.map((subgoal => {
          return <div>
            <input type="checkbox" />
            <span>{subgoal.goal}</span>
          </div>;
        }))}
      </div>
      <button onClick={complete}>COMPLETE</button>
    </StyledCard>
    : <StyledButtonCard {...commonProps} role="button" onClick={complete}>
      {QuestInfo}
    </StyledButtonCard>;
}
