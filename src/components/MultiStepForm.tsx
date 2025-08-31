import React, { useState } from "react";
import { formConfig } from "../config/formConfig";
import {
  CheckCircle,
  GraduationCap,
  Briefcase,
  Smile,
  Check,
  Circle,
  Square,
} from "lucide-react";

type AnswerState = Record<string, any>;

// Map chapter "icon" keys from config to lucide icons
const iconMap: Record<string, JSX.Element> = {
  education: <GraduationCap className="w-7 h-7 text-blue-500" />,
  work: <Briefcase className="w-7 h-7 text-purple-500" />,
  feedback: <Smile className="w-7 h-7 text-pink-500" />,
};

// Map chapter "icon" keys to emojis for progress bar
const emojiMap: Record<string, string> = {
  education: "📚",
  work: "💼",
  feedback: "😄",
};

const MultiStepForm = () => {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentChapter = formConfig.chapters[chapterIndex];
  const currentScreen = currentChapter.screens[screenIndex];

  const totalScreens = formConfig.chapters.reduce(
    (sum, c) => sum + c.screens.length,
    0
  );
  const currentStep =
    formConfig.chapters
      .slice(0, chapterIndex)
      .reduce((sum, c) => sum + c.screens.length, 0) +
    screenIndex +
    1;

  const handleChange = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const validateScreen = () => {
    const newErrors: Record<string, string> = {};
    currentScreen.questions.forEach((q) => {
      if (q.required) {
        if (
          !answers[q.id] ||
          (Array.isArray(answers[q.id]) && answers[q.id].length === 0)
        ) {
          newErrors[q.id] = "This field is required.";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateScreen()) return;

    if (screenIndex < currentChapter.screens.length - 1) {
      setScreenIndex(screenIndex + 1);
    } else if (chapterIndex < formConfig.chapters.length - 1) {
      setChapterIndex(chapterIndex + 1);
      setScreenIndex(0);
    } else {
      setIsSubmitted(true);
      console.log("Final submission:", answers);
    }
  };

  const handleBack = () => {
    if (screenIndex > 0) {
      setScreenIndex(screenIndex - 1);
    } else if (chapterIndex > 0) {
      const prevChapter = formConfig.chapters[chapterIndex - 1];
      setChapterIndex(chapterIndex - 1);
      setScreenIndex(prevChapter.screens.length - 1);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
          <p className="text-gray-700">
            Your responses have been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium mb-2 items-center">
            <span className="flex items-center gap-2">
              {/* Lucide icon */}
              {iconMap[currentChapter.icon] || null}
              {/* Emoji beside title */}
              <span>{emojiMap[currentChapter.icon]}</span>
              {currentChapter.title}
            </span>
            <span>
              {currentStep} / {totalScreens}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${(currentStep / totalScreens) * 100}%` }}
            />
          </div>
        </div>

        {/* Screen Title */}
        <h2 className="text-xl font-semibold mb-6">{currentScreen.title}</h2>

        {/* Questions */}
        <form className="space-y-6">
          {currentScreen.questions.map((q) => (
            <div key={q.id} className="flex flex-col">
              <label className="font-medium mb-2">
                {q.label}
                {q.required && <span className="text-red-500">*</span>}
              </label>

              {/* Text Input */}
              {q.type === "text" && (
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-green-400 outline-none"
                />
              )}

              {/* Radio Options */}
              {q.type === "radio" && (
                <div className="grid grid-cols-1 gap-3">
                  {q.options?.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => handleChange(q.id, opt)}
                      className={`cursor-pointer flex items-center justify-between border rounded-xl p-4 transition ${
                        answers[q.id] === opt
                          ? "bg-green-500 text-white border-green-500 shadow-lg"
                          : "bg-white hover:border-green-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {answers[q.id] === opt ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <span>{opt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Checkbox Options */}
              {q.type === "checkbox" && (
                <div className="grid grid-cols-1 gap-3">
                  {q.options?.map((opt) => {
                    const selected = answers[q.id]?.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => {
                          const prev = answers[q.id] || [];
                          if (selected) {
                            handleChange(
                              q.id,
                              prev.filter((v: string) => v !== opt)
                            );
                          } else {
                            handleChange(q.id, [...prev, opt]);
                          }
                        }}
                        className={`cursor-pointer flex items-center justify-between border rounded-xl p-4 transition ${
                          selected
                            ? "bg-green-500 text-white border-green-500 shadow-lg"
                            : "bg-white hover:border-green-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {selected ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                          <span>{opt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {errors[q.id] && (
                <span className="text-red-500 text-sm mt-1">{errors[q.id]}</span>
              )}
            </div>
          ))}
        </form>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={chapterIndex === 0 && screenIndex === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            {chapterIndex === formConfig.chapters.length - 1 &&
            screenIndex === currentChapter.screens.length - 1
              ? "Submit"
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
