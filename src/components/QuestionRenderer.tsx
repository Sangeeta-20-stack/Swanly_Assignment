import React from "react";
import type { Question } from "../types";

type Props = {
  q: Question;
  value: any;
  error?: string;
  onChange: (v: any) => void;
};

export const QuestionRenderer: React.FC<Props> = ({ q, value, error, onChange }) => {
  return (
    <div className="mb-6">
      {/* Question label */}
      <label className="block text-sm font-semibold mb-2">
        {q.label} {q.required && <span className="text-red-500">*</span>}
      </label>

      {/* Text input */}
      {q.type === "text" && (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={(q as any).placeholder ?? ""}
          className={`w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${
            error ? "border-red-500 shadow-sm" : "border-gray-300"
          }`}
        />
      )}

      {/* Radio options */}
      {q.type === "radio" && (
        <div className="flex flex-col gap-2 mt-2">
          {(q as any).options.map((opt: any) => (
            <div
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`cursor-pointer flex items-center gap-3 rounded-xl border px-4 py-2 transition-all hover:shadow hover:border-indigo-400 ${
                value === opt.value
                  ? "bg-indigo-500 text-white border-indigo-500 shadow"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  value === opt.value ? "bg-white" : "border-gray-400"
                }`}
              >
                {value === opt.value && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
              </div>
              <span className="text-sm">{opt.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Checkbox options */}
      {q.type === "checkbox" && (
        <div className="flex flex-col gap-2 mt-2">
          {(q as any).options.map((opt: any) => {
            const arr: string[] = Array.isArray(value) ? value : [];
            const checked = arr.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() =>
                  onChange(
                    checked ? arr.filter((v) => v !== opt.value) : [...arr, opt.value]
                  )
                }
                className={`cursor-pointer flex items-center gap-3 rounded-xl border px-4 py-2 transition-all hover:shadow hover:border-green-400 ${
                  checked
                    ? "bg-green-500 text-white border-green-500 shadow"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 border rounded flex-shrink-0 flex items-center justify-center ${
                    checked ? "bg-white" : "border-gray-400"
                  }`}
                >
                  {checked && <div className="w-2 h-2 bg-green-500" />}
                </div>
                <span className="text-sm">{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Helper text */}
      {q.helperText && <p className="mt-1 text-xs text-gray-500">{q.helperText}</p>}

      {/* Error message */}
      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};
