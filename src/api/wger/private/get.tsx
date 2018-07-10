import { apiUrl, getOptions } from '../utils';

/* Private endpoints
See https://wger.de/de/software/api for more information
*/

export const day = async () => fetch(apiUrl + 'day', getOptions());
export const meal = async () => fetch(apiUrl + 'meal', getOptions());
export const mealItem = async () => fetch(apiUrl + 'mealitem', getOptions());
export const nutritionPlan = () => fetch(apiUrl + 'nutritionplan', getOptions());
export const schedule = async () => fetch(apiUrl + 'schedule', getOptions());
export const scheduleStep = async () => fetch(apiUrl + 'schedulestep', getOptions());
export const set = async () => fetch(apiUrl + 'set', getOptions());
export const setting = async () => fetch(apiUrl + 'setting', getOptions());
export const userProfile = async () => fetch(apiUrl + 'userprofile', getOptions());
export const weightEntry = async () => fetch(apiUrl + 'weightentry', getOptions());
export const workout = async () => {
  try {
    const response = await fetch(apiUrl + 'workout', getOptions());
    return response.json();
  } catch (error) {
    return error;
  }
};
export const workoutLog = async () => fetch(apiUrl + 'workoutlog', getOptions());
