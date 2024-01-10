import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Quest } from '../../models/Quest'
import { generateBingoQuests } from '../../utils/questGeneration';
import { fetchQuests, writeQuests } from '../../utils/firebaseUtils';

type QuestsState = {
  bingoSize: number,
  quests: Quest[]
}

const initialState: QuestsState = {
  bingoSize: 5,
  quests: []
}

type CompleteQuestPayload = {
  id: string,
  completed: boolean
}

export const generateAndSetNewQuests = createAsyncThunk(
  'quests/generateAndSetNewQuests',
  async (bingoSize: number) => {
    const generatedQuests = generateBingoQuests(bingoSize);
    const questsWithIDs = await writeQuests(generatedQuests);
    return questsWithIDs;
  }
);

export const getQuests = createAsyncThunk(
  'quests/getQuests',
  async () => {
    const quests = await fetchQuests();
    try {
      return { data: quests };
    } catch (e) {
      return {
        error: {
          data: `Error fetching quests: ${e}`
        }
      }
    }
  }
)

export const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    clearQuests: (state) => {
      state.quests = [];
    },
    setQuestComplete: (state, action: PayloadAction<CompleteQuestPayload>) => {
      const { id, completed } = action.payload;
      const quest = state.quests.find(quest => quest.id === id);
      if (quest) {
        quest.completed = completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateAndSetNewQuests.fulfilled, (state, action) => {
      state.quests = action.payload;
    });
    builder.addCase(getQuests.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.quests = action.payload.data;
      }
    });
  }
})

export const { clearQuests, setQuestComplete } = questSlice.actions;
export const questReducer = questSlice.reducer;