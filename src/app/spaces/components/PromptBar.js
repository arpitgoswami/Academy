"use client";

import {
  Mic,
  X,
  SendHorizontal,
  Bot,
  Volume2,
  StopCircle,
  ChevronDown,
  Sparkles,
  AudioLines,
  Loader,
} from "lucide-react";

const VOICE_OPTIONS = [
  { name: "Sarah", label: "Sarah (US)", lang: "en-US" },
  { name: "Emma", label: "Emma (UK)", lang: "en-GB" },
  { name: "Luna", label: "Luna (AU)", lang: "en-AU" },
  { name: "Priya", label: "प्रिया (Hindi)", lang: "hi-IN" },
];

export function VoiceSelect({ selectedVoice, onVoiceChange }) {
  return (
    <div className="relative mb-3">
      <div className="relative">
        <select
          value={selectedVoice?.name || VOICE_OPTIONS[0].name}
          onChange={(e) => {
            const voice = VOICE_OPTIONS.find((v) => v.name === e.target.value);
            onVoiceChange(voice);
          }}
          className="w-full p-3 pl-10 pr-10 rounded-xl border border-indigo-500/30 bg-[#151530]/80 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/50 appearance-none shadow-lg shadow-indigo-900/20"
        >
          {VOICE_OPTIONS.map((voice) => (
            <option
              key={voice.name}
              value={voice.name}
              className="bg-[#151530] py-2"
            >
              {voice.label}
            </option>
          ))}
        </select>
        <Volume2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
      </div>
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
        placeholder="Ask any question..."
        className="w-full p-3 pl-12 pr-24 rounded-xl border border-indigo-500/30 bg-[#151530]/80 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent shadow-lg shadow-indigo-900/20 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/50"
      />
      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />

      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {value && (
          <button
            onClick={onClear}
            className="p-2 hover:bg-[#1a1a40] rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-200"
            aria-label="Clear input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onRecord}
          disabled={!recognition || isLoading}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
          className={`p-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isRecording
              ? "bg-purple-500/80 hover:bg-purple-600 scale-110 shadow-md shadow-purple-500/20"
              : "bg-[#1a1a40] hover:bg-[#252550]"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isRecording ? (
            <StopCircle className="w-4 h-4 text-white animate-pulse" />
          ) : (
            <Mic className="w-4 h-4 text-slate-200" />
          )}
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
      aria-label={isSpeaking ? "Stop speaking" : "Generate my UI file"}
      className={`px-5 py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
        isSpeaking
          ? "bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 scale-105 shadow-purple-500/20"
          : "bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:scale-105 disabled:from-purple-500/40 disabled:to-indigo-600/40 disabled:scale-100"
      } text-white font-medium disabled:cursor-not-allowed backdrop-blur-sm`}
    >
      {isLoading ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : isSpeaking ? (
        <AudioLines className="w-5 h-5 animate-pulse" />
      ) : (
        <>
          <span>Generate Answer</span>
          <SendHorizontal className="w-4 h-4" />
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
    <div className="fixed mx-auto max-w-3xl bottom-0 left-0 right-0 bg-gradient-to-t from-[#0e0e20]/95 via-[#151530]/95 to-[#1a1a40]/80 backdrop-blur-lg border-t border-indigo-500/20 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.3)] p-6 rounded-t-3xl">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-medium text-white mb-4">Virtual Guide</h2>
        <VoiceSelect
          selectedVoice={selectedVoice}
          onVoiceChange={onVoiceChange}
        />
        <div className="flex gap-3">
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
