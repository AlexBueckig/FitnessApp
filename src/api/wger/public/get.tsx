import { apiUrl, getOptions } from '../utils';

/* Public endpoints
See https://wger.de/de/software/api for more information
*/

export const daysOfWeek = () => fetch(apiUrl + 'daysofweek', getOptions());
export const equipment = () => fetch(apiUrl + 'equipment', getOptions());
export const exercise = () => fetch(apiUrl + 'exercise', getOptions());
export const exerciseInfo = () => fetch(apiUrl + 'exerciseinfo', getOptions());
export const exerciseCategory = () => fetch(apiUrl + 'exercisecategory', getOptions());
export const exerciseComment = () => fetch(apiUrl + 'exercisecomment', getOptions());
export const exerciseImage = () => fetch(apiUrl + 'exerciseimage', getOptions());
export const ingredient = () => fetch(apiUrl + 'ingredient', getOptions());
export const ingredientToWeightUnit = () => fetch(apiUrl + 'ingredienttoweightunit', getOptions());
export const language = () => fetch(apiUrl + 'language', getOptions());
export const license = () => fetch(apiUrl + 'license', getOptions());
export const muscle = () => fetch(apiUrl + 'muscle', getOptions());
export const weightUnit = () => fetch(apiUrl + 'weightunit', getOptions());
export const settingRepetitionUnit = () => fetch(apiUrl + 'settingrepetitionunit', getOptions());
export const settingWeightUnit = () => fetch(apiUrl + 'settingweightunit', getOptions());
