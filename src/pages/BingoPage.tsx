import { useSelector } from 'react-redux';
import { BingoBoard } from '../components/BingoBoard';
import { generateAndSetNewQuests } from '../features/quests/questSlice';
import { RootState, useAppDispatch } from '../store';

export const BingoPage = () => {
  const bingoSize = useSelector((state: RootState) => state.quests.bingoSize);
  const dispatch = useAppDispatch();
  return <main>
    <h1>Quests</h1>
    <button onClick={async () => {
      await dispatch(generateAndSetNewQuests(bingoSize));
    }}>Generate quests</button>
    <BingoBoard />
  </main>
}