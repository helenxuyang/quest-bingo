import styled from "styled-components";
import { Quest, QuestCategory } from "./models/Quest";

type Props = {
  quest: Quest;
  completeQuest: () => void;
  skipQuest: () => void;
}

const getCardColor = (questCategory: QuestCategory) => {
  switch (questCategory) {
    case 'EXERCISE':
      return 'darkslateblue';
    case 'HYDRATION':
      return 'navy';
    case 'WALK':
      return 'seagreen';
    default:
      return 'black';
  }
}
const StyledCard = styled.div<{ $questCategory: QuestCategory }>`
  display: inline-block;
  background: ${props => getCardColor(props.$questCategory)};
  color: white;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;

  button {
    margin: 4px;
  }
`;

export const QuestCard = (props: Props) => {
  const { quest, completeQuest, skipQuest } = props;
  return <StyledCard $questCategory={quest.category}>
    <p>{quest.objective}</p>
    <p>Reward: {quest.xp} XP</p>
    <button onClick={skipQuest}>Skip</button>
    <button onClick={completeQuest}>Complete</button>
  </StyledCard>
}
