import { useSelector } from "react-redux";
import { BingoCard } from "./BingoCard";
import { StyledBingoBoard } from "./bingoStyles";
import { RootState, useAppDispatch } from "../store";
import { useEffect } from "react";
import { getQuests } from "../features/quests/questSlice";

export const BingoBoard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getQuests());
  }, []);

  const quests = useSelector((state: RootState) => state.quests.quests);

  return <StyledBingoBoard>
    {quests.map((quest, idx) =>
      <BingoCard
        key={quest.objective + idx.toString()}
        index={idx}
        quest={quest}
      />
    )}
  </StyledBingoBoard>
}