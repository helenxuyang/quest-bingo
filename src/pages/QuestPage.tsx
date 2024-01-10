import { useParams } from 'react-router-dom';

export const QuestPage = () => {
  const { id } = useParams();
  return <div>
    quest {id}
  </div>
}