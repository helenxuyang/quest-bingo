import { Quest } from "../models/Quest";
import { StyledBingoButtonCard, StyledBingoCard } from "./bingoStyles";

type Props = {
  quest: Quest;
  index: number;
}

export const BingoCard = (props: Props) => {
  const { quest } = props;
  const { completed } = quest;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const complete = () => {
    // TODO
    console.log('complete');
  }

  const completeSubtask = (subtaskIndex: number) => {
    // TODO
    console.log('completeSubtask', subtaskIndex);
  }

  const QuestInfo = <div>
    <p className='quest-info'>{`${quest.category} - ${quest.xp} XP`}</p>
    <p className='quest-objective'>{quest.objective}</p>
  </div>

  const commonProps = {
    $questCategory: quest.category,
    $complete: completed
  }

  return quest.subgoals ?
    <StyledBingoCard {...commonProps} >
      {QuestInfo}
      <div className='subgoals-list'>
        {quest.subgoals.map(((subgoal, idx) => {
          return <div key={subgoal.goal + idx}>
            <input type="checkbox" value={String(quest.subgoals![idx].completed)} onClick={() => { completeSubtask(idx) }} />
            <span>{subgoal.goal}</span>
          </div>;
        }))}
      </div>
      <button onClick={complete}>DONE</button>
    </StyledBingoCard>
    : <StyledBingoButtonCard {...commonProps} role="button" onClick={complete}>
      {QuestInfo}
    </StyledBingoButtonCard>;
}
