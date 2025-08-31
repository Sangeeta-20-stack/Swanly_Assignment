export type Choice = { value: string; label: string };

export type QuestionBase = {
  id: string;
  type: "text" | "radio" | "checkbox";
  label: string;
  required?: boolean;
  helperText?: string;
};

export type TextQuestion = QuestionBase & { type: "text"; placeholder?: string };
export type RadioQuestion = QuestionBase & { type: "radio"; options: Choice[] };
export type CheckboxQuestion = QuestionBase & { type: "checkbox"; options: Choice[] };

export type Question = TextQuestion | RadioQuestion | CheckboxQuestion;

export type Screen = {
  id: string;
  title?: string;
  description?: string;
  questions: Question[];
};

export type Chapter = {
  id: string;
  title: string;
  screens: Screen[];
};

export type FormConfig = {
  title?: string;
  chapters: Chapter[];
};

export type AnswersMap = Record<string, string | string[] | undefined>;
export type ValidationErrors = Record<string, string | undefined>;
