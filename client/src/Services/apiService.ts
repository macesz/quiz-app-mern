import axios, {AxiosError} from "axios";
import { IQuestion } from '../interfaces/IQuestion';
import { IUser } from '../interfaces/IUser';
import { IGame } from '../interfaces/IGame';
import { IQuestionQuery } from '../../../server/src/controllers/interfaces/IQuestionQuery';
import { ISignInBody, ISignUpBody, IUpdateUserBody } from '../../../server/src/controllers/interfaces/IUserRequest';

// Setup base instance
const api = axios.create({
  baseURL: '/api',
  headers: { "Content-Type": "application/json" }
});

// Helper for Auth Headers
const getAuthHeaders = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const fetchQuestions = async (query: IQuestionQuery): Promise<IQuestion[]> => {
  // Axios handles URLSearchParams automatically via the 'params' config
  const response = await api.get<IQuestion[]>('/questions', { params: query });
  return response.data;
};

export const postGameResult = async (token: string, gameData: Partial<IGame>): Promise<IGame> => {
  const response = await api.post<IGame>('/games', gameData, getAuthHeaders(token));
  return response.data;
};

export const fetchSignInUser = async (formData: ISignInBody) => {
  // Typing the response helps with autocomplete in your login component
  const response = await api.post<{ token: string; user: IUser }>('/users/signin', formData);
  return response.data;
};

export const fetchSignUpUser = async (formData: ISignUpBody) => {
  const response = await api.post<{ message: string }>('/users/signup', formData);
  return response.data;
};

export const fetchAndUpdateUser = async (token: string, updateData: IUpdateUserBody) => {
  const response = await api.patch<{ refreshedToken: string; user: IUser }>(
    '/users', 
    updateData, 
    getAuthHeaders(token)
  );
  return response.data;
};

export const deleteUserProfile = async (token: string) => {
  const response = await api.delete<{ message: string }>('/users', getAuthHeaders(token));
  return response.data;
};