export const today = new Date().toLocaleDateString();

const xpKey = 'xp';
const dateKey = 'date';
const completedKey = 'completedIndices';

export const updateStorageByDay = () => {
  const lastDate = localStorage.getItem(dateKey);
  if (lastDate !== today) {
    localStorage.clear();
    localStorage.setItem(dateKey, today);
    localStorage.setItem(completedKey, '');
  }
}

const questCompletedKey = (questIndex: number) => `quest ${questIndex}`;
const subtaskCompletedKey = (questIndex: number, subtaskIndex: number) =>
  `${questCompletedKey(questIndex)} subtask ${subtaskIndex}`;

export const storeCompleteQuest = (questIndex: number, completed: boolean) => {
  localStorage.setItem(questCompletedKey(questIndex), String(completed));
}

export const getStoredQuestCompleted = (questIndex: number) => {
  return localStorage.getItem(questCompletedKey(questIndex)) === 'true';
}

export const storeXP = (xp: number) => {
  localStorage.setItem(xpKey, xp.toString());
}

export const getStoredXP = () => {
  return Number(localStorage.getItem(xpKey)) ?? 0;
}

export const storeCompleteSubtask = (questIndex: number, subtaskIndex: number, completed: boolean) => {
  localStorage.setItem(subtaskCompletedKey(questIndex, subtaskIndex), String(completed));
}

export const getStoredSubtaskCompleted = (questIndex: number, subtaskIndex: number) => {
  return localStorage.getItem(subtaskCompletedKey(questIndex, subtaskIndex)) === 'true';
}