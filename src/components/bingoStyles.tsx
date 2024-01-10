import styled from "styled-components";
import { QuestCategory } from "../models/Quest";

export const StyledBingoBoard = styled.div`
  max-width: 100%;
  display: grid;
  grid: repeat(5, 1fr) / repeat(5, 1fr);
`;

const getCardColor = (questCategory: QuestCategory) => {
  switch (questCategory) {
    case 'EXERCISE':
      return 'darkslateblue';
    case 'WALK':
      return 'slateblue';
    default:
      return 'steelblue';
  }
}

export const StyledBingoCard = styled.div<{ $questCategory: QuestCategory, $complete: boolean }>`
  display: inline-block;
  background: ${props => props.$complete ? 'seagreen' : getCardColor(props.$questCategory)};
  color: white;
  border-radius: 8px;
  padding: 8px 16px;
  text-align: left;
  box-sizing: border-box;
  margin: 4px;

  .quest-info {
    font-size: 11px;
    font-weight: bold;
    text-align: left;
    margin-top: 4px;
  }

  .quest-objective {
    font-size: 18px;
    margin: 0
  }

  .subgoals-list {
    padding: 0;
    margin: 8px;
  }

  button {
    &:hover {
      transform: scale(1.03);
      cursor: pointer;
    }
  
    &:active {
      transform: scale(0.97);
    }
  }
`;

export const StyledBingoButtonCard = styled(StyledBingoCard) <{ $questCategory: QuestCategory, $complete: boolean }>`
  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }

  &:active {
    transform: scale(0.97);
  }
`;