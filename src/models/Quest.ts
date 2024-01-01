export type Quest = {
  objective: string;
  category: QuestCategory;
  xp: number;
}

const QuestCategories = ['EXERCISE', 'WALK', 'HYDRATION'];

export type QuestCategory = typeof QuestCategories[number];

export type QuestCategoryCount = {
  [K in QuestCategory]: number;
};