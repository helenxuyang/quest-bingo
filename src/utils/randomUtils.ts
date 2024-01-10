import seedrandom from 'seedrandom';
import { today } from './storageUtils';

export const todayRNG = seedrandom(today);
