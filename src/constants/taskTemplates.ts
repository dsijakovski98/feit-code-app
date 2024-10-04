import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from "./enums";

type TaskTemplate = (functionName: string, description: string) => string;

export const taskTemplate: Partial<Record<ProgrammingLanguage, TaskTemplate>> = {
  [PROGRAMMING_LANGUAGE.javascript]: (fname, description) => {
    return `
/* 
${description}
*/

function ${fname}(/* Define inputs here */) {
    // Your code here
}
`;
  },
};
