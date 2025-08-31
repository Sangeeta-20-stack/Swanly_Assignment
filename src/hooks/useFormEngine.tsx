import { useMemo, useState } from "react";
import type { FormConfig, AnswersMap, ValidationErrors, Question, Screen } from "../types";

export function useFormEngine(config: FormConfig) {
  // flatten screens for linear navigation
  const sequence = useMemo(() => {
    const items: { chapterIndex: number; screenIndex: number; screen: Screen }[] = [];
    config.chapters.forEach((ch, ci) => {
      ch.screens.forEach((sc, si) => items.push({ chapterIndex: ci, screenIndex: si, screen: sc }));
    });
    return items;
  }, [config]);

  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const current = sequence[cursor];
  const isFirst = cursor === 0;
  const isLast = cursor === sequence.length - 1;

  function setAnswer(questionId: string, value: any) {
    setAnswers((p) => ({ ...p, [questionId]: value }));
    setErrors((p) => ({ ...p, [questionId]: undefined }));
  }

  function validateQuestion(q: Question, value: any): string | undefined {
    if (!q.required) return undefined;
    if (q.type === "text") {
      if (!value || String(value).trim().length === 0) return "This field is required.";
    } else if (q.type === "radio") {
      if (!value || String(value).trim().length === 0) return "Please select an option.";
    } else if (q.type === "checkbox") {
      if (!Array.isArray(value) || value.length === 0) return "Choose at least one.";
    }
    return undefined;
  }

  function validateScreen(): boolean {
    const sc = current.screen;
    const nextErrors: ValidationErrors = {};
    sc.questions.forEach((q) => {
      nextErrors[q.id] = validateQuestion(q, answers[q.id]);
    });
    setErrors(nextErrors);
    return Object.values(nextErrors).every((e) => !e);
  }

  function canContinue(): boolean {
    const sc = current.screen;
    return sc.questions.every((q) => !validateQuestion(q, answers[q.id]));
  }

  function goNext() {
    if (!validateScreen()) return;
    if (!isLast) setCursor((c) => c + 1);
  }

  function goBack() {
    if (!isFirst) setCursor((c) => c - 1);
  }

  function submit() {
    if (!validateScreen()) return;
    console.log("FINAL_PAYLOAD", answers);
    alert("Submitted — check console for payload.");
  }

  return {
    config,
    sequence,
    cursor,
    current,
    isFirst,
    isLast,
    answers,
    errors,
    setAnswer,
    canContinue,
    goNext,
    goBack,
    submit,
  } as const;
}
