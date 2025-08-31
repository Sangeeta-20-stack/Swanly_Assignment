// Define a simple option type
export type Choice = string; // Use string directly for simpler config

export type QuestionBase = {
  id: string;
  type: "text" | "radio" | "checkbox";
  label: string;
  required?: boolean;
  helperText?: string;
};

export type TextQuestion = QuestionBase & {
  type: "text";
  placeholder?: string;
};
export type RadioQuestion = QuestionBase & {
  type: "radio";
  options: Choice[]; // array of strings
};
export type CheckboxQuestion = QuestionBase & {
  type: "checkbox";
  options: Choice[]; // array of strings
};

export type Question = TextQuestion | RadioQuestion | CheckboxQuestion;

export type Screen = {
  id: string;
  title?: string;
  description?: string;
  questions: Question[];
};

export type Chapter = {
  id: string;       // required id for strict TS typing
  icon?: string;    // optional icon for UI
  title: string;
  screens: Screen[];
};

export type FormConfig = {
  title?: string;
  chapters: Chapter[];
};

// Answers & Validation maps
export type AnswersMap = Record<string, string | string[] | undefined>;
export type ValidationErrors = Record<string, string | undefined>;
