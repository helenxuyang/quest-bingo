// import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
// import { fetchQuests } from '../../utils/firebaseUtils'
// import { Quest } from '../../models/Quest';

// export const apiSlice = createApi({
//   baseQuery: fakeBaseQuery(),
//   endpoints: builder => ({
//     getQuests: builder.query<Quest[], void>({
//       async queryFn() {
//         const quests = await fetchQuests();
//         try {
//           return { data: quests };
//         } catch (e) {
//           return {
//             error: {
//               data: `Error fetching quests: ${e}`
//             }
//           }
//         }
//       }
//     })
//   })
// });

// export const { useGetQuestsQuery } = apiSlice; 