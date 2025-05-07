"use client";

import { Mic, X, Send } from "lucide-react";

const VOICE_OPTIONS = [
  { name: "Sarah", label: "Sarah (US)", lang: "en-US" },
  { name: "Emma", label: "Emma (UK)", lang: "en-GB" },
  { name: "Luna", label: "Luna (AU)", lang: "en-AU" },
  { name: "Priya", label: "प्रिया (Hindi)", lang: "hi-IN" },
];

export function VoiceSelect({ selectedVoice, onVoiceChange }) {
  return (
    <div className="mb-3 relative">
      <select
        value={selectedVoice?.name || VOICE_OPTIONS[0].name}
        onChange={(e) => {
          const voice = VOICE_OPTIONS.find((v) => v.name === e.target.value);
          onVoiceChange(voice);
        }}
        className="w-full p-3 pl-4 pr-10 rounded-xl border-2 border-slate-700/50 bg-slate-800/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:border-blue-500/50"
      >
        {VOICE_OPTIONS.map((voice) => (
          <option key={voice.name} value={voice.name} className="bg-slate-800">
            {voice.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PromptInput({
  value,
  onChange,
  onKeyPress,
  onClear,
  onRecord,
  isRecording,
  isLoading,
  recognition,
}) {
  return (
    <div className="flex-1 relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Type your question..."
        className="w-full p-4 pl-5 pr-24 rounded-xl border-2 border-slate-700/50 bg-slate-800/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-blue-500/50"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {value && (
          <button
            onClick={onClear}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onRecord}
          disabled={!recognition || isLoading}
          className={`p-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isRecording
              ? "bg-red-500/80 hover:bg-red-600/80 scale-110"
              : "bg-slate-700/50 hover:bg-slate-600/50"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Mic
            className={`w-4 h-4 ${
              isRecording ? "text-white animate-pulse" : "text-slate-300"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export function AskButton({ onClick, disabled, isLoading, isSpeaking }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
        isSpeaking
          ? "bg-red-500/80 hover:bg-red-600/80 scale-105"
          : "bg-blue-600/80 hover:bg-blue-700/80 hover:scale-105 disabled:bg-blue-500/40 disabled:scale-100"
      } text-white disabled:cursor-not-allowed backdrop-blur-sm`}
    >
      {isLoading ? (
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce delay-200"></div>
        </div>
      ) : isSpeaking ? (
        <div className="h-6 flex items-center space-x-0.5">
          <div className="animate-pulse w-1 h-4 bg-white/70"></div>
          <div className="animate-pulse w-1 h-6 bg-white/70 animation-delay-150"></div>
          <div className="animate-pulse w-1 h-3 bg-white/70 animation-delay-300"></div>
        </div>
      ) : (
        <>
          <span>Ask</span>
          <Send className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

export default function PromptBar({
  selectedVoice,
  onVoiceChange,
  promptInput,
  onPromptChange,
  onKeyPress,
  onRecord,
  isRecording,
  isLoading,
  isSpeaking,
  recognition,
  onAskClick,
}) {
  return (
    <div className="fixed mx-auto max-w-3xl rounded-xl border bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-slate-900/90 to-slate-900/80 backdrop-blur-md border-t border-slate-800/50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] p-6">
      <div className="max-w-3xl mx-auto">
        <VoiceSelect
          selectedVoice={selectedVoice}
          onVoiceChange={onVoiceChange}
        />
        <div className="flex gap-4">
          <PromptInput
            value={promptInput}
            onChange={onPromptChange}
            onKeyPress={onKeyPress}
            onClear={() => onPromptChange({ target: { value: "" } })}
            onRecord={onRecord}
            isRecording={isRecording}
            isLoading={isLoading}
            recognition={recognition}
          />
          <AskButton
            onClick={onAskClick}
            disabled={isLoading || (!isSpeaking && !promptInput.trim())}
            isLoading={isLoading}
            isSpeaking={isSpeaking}
          />
        </div>
      </div>
    </div>
  );
}
