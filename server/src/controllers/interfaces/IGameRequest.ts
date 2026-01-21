import {IGame} from "../../interfaces/IGame.js";

export interface IPostGameResultBody extends Pick<IGame, 'user_id' | 'correct' | 'question_number' | 'rate'> {}