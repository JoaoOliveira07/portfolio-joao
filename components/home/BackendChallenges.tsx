"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { Trophy, Timer, CheckCircle2, XCircle, ChevronRight, RotateCcw, Cpu, Bug, BarChart2, GitFork } from "lucide-react";

type ChallengeType = "architecture" | "debug" | "complexity" | "tradeoff";

interface Challenge {
  id: string;
  type: ChallengeType;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  context?: string;
  options: string[];
  order: number;
}

interface AnswerResult {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  createdAt: string;
}

type GameState = "idle" | "playing" | "answered" | "finished" | "submitting";

const TYPE_META: Record<ChallengeType, { label: string; icon: React.ReactNode; color: string }> = {
  architecture: { label: "Arquitetura", icon: <Cpu className="w-3.5 h-3.5" />, color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  debug: { label: "Debug", icon: <Bug className="w-3.5 h-3.5" />, color: "text-orange-400 bg-orange-500/10 border-orange-500/30" },
  complexity: { label: "Complexidade", icon: <BarChart2 className="w-3.5 h-3.5" />, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
  tradeoff: { label: "Trade-off", icon: <GitFork className="w-3.5 h-3.5" />, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" },
};

const DIFFICULTY_POINTS: Record<string, number> = { easy: 100, medium: 200, hard: 300 };
const TIMER_SECONDS = 45;

function getSessionId(): string {
  if (typeof window === "undefined") return uuidv4();
  let id = sessionStorage.getItem("game_session");
  if (!id) {
    id = uuidv4();
    sessionStorage.setItem("game_session", id);
  }
  return id;
}

export function BackendChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [nickname, setNickname] = useState("");
  const [sessionAnswers, setSessionAnswers] = useState<object[]>([]);
  const [rank, setRank] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data.leaderboard);
      }
    } catch { /* non-critical */ }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const loadChallenges = useCallback(async () => {
    try {
      const res = await fetch("/api/challenges");
      if (res.ok) {
        const data = await res.json();
        setChallenges(data.challenges);
      }
    } catch { /* non-critical */ }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleAnswer = useCallback(async (chosen: number) => {
    if (gameState !== "playing") return;
    stopTimer();
    setSelectedOption(chosen);
    setGameState("answered");

    const challenge = challenges[currentIndex];
    try {
      const res = await fetch(`/api/challenges/${challenge.id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chosen }),
      });
      if (res.ok) {
        const result: AnswerResult = await res.json();
        // Apply time bonus: up to 50% of base points for fast answers
        const timeBonus = result.correct ? Math.round(result.points * 0.5 * (timeLeft / TIMER_SECONDS)) : 0;
        const totalPoints = result.points + timeBonus;
        if (result.correct) setScore((s) => s + totalPoints);
        setAnswerResult({ ...result, points: totalPoints });
        setSessionAnswers((prev) => [
          ...prev,
          { challengeId: challenge.id, chosen, correct: result.correct, timeMs: (TIMER_SECONDS - timeLeft) * 1000 },
        ]);
      }
    } catch { /* non-critical */ }
  }, [gameState, challenges, currentIndex, timeLeft, stopTimer]);

  // Auto-submit on timeout
  useEffect(() => {
    if (gameState !== "playing") return;
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          handleAnswer(-1); // -1 = timed out, always wrong
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return stopTimer;
  }, [currentIndex, gameState, stopTimer]); // eslint-disable-line react-hooks/exhaustive-deps

  const startGame = useCallback(async () => {
    await loadChallenges();
    setCurrentIndex(0);
    setScore(0);
    setSessionAnswers([]);
    setGameState("playing");
    setSelectedOption(null);
    setAnswerResult(null);
    setRank(null);
    setSubmitError("");
    // Reset session
    if (typeof window !== "undefined") {
      const id = uuidv4();
      sessionStorage.setItem("game_session", id);
    }
  }, [loadChallenges]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= challenges.length) {
      setGameState("finished");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setAnswerResult(null);
      setGameState("playing");
    }
  }, [currentIndex, challenges.length]);

  const submitScore = useCallback(async () => {
    if (!nickname.trim() || nickname.trim().length < 2) {
      setSubmitError("Nickname precisa ter ao menos 2 caracteres");
      return;
    }
    setSubmitError("");
    setGameState("submitting");
    try {
      const sessionId = getSessionId();
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim(), score, sessionId, answers: sessionAnswers }),
      });
      if (res.ok) {
        const data = await res.json();
        setRank(data.rank);
        await fetchLeaderboard();
      } else {
        const err = await res.json();
        setSubmitError(err.error || "Erro ao enviar score");
      }
    } catch {
      setSubmitError("Erro de conexão");
    } finally {
      setGameState("finished");
    }
  }, [nickname, score, sessionAnswers, fetchLeaderboard]);

  const currentChallenge = challenges[currentIndex];
  const progress = challenges.length > 0 ? ((currentIndex) / challenges.length) * 100 : 0;
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;

  return (
    <section className="py-20 md:py-32" id="challenges">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">Interactive</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 md:mt-4">
            Backend Challenges
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl">
            Teste seu conhecimento em arquitetura de sistemas, debugging e decisões de engenharia.
            Responda rápido para ganhar bônus de pontos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* IDLE */}
              {gameState === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-neutral-900/80 border border-white/10 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                    <Trophy className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pronto para o desafio?</h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                    13 questões sobre arquitetura, debugging, complexidade e trade-offs. Você tem{" "}
                    <span className="text-emerald-400 font-medium">{TIMER_SECONDS}s por questão</span>.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {(Object.entries(TYPE_META) as [ChallengeType, typeof TYPE_META[ChallengeType]][]).map(([type, meta]) => (
                      <span key={type} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${meta.color}`}>
                        {meta.icon} {meta.label}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={startGame}
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors duration-200 text-sm"
                  >
                    Começar
                  </button>
                </motion.div>
              )}

              {/* PLAYING / ANSWERED */}
              {(gameState === "playing" || gameState === "answered") && currentChallenge && (
                <motion.div
                  key={`question-${currentIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden"
                >
                  {/* Progress bar */}
                  <div className="h-1 bg-neutral-800">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="p-6 md:p-8">
                    {/* Meta */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${TYPE_META[currentChallenge.type].color}`}>
                          {TYPE_META[currentChallenge.type].icon}
                          {TYPE_META[currentChallenge.type].label}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          currentChallenge.difficulty === "easy"
                            ? "text-green-400 bg-green-500/10"
                            : currentChallenge.difficulty === "medium"
                            ? "text-yellow-400 bg-yellow-500/10"
                            : "text-red-400 bg-red-500/10"
                        }`}>
                          +{DIFFICULTY_POINTS[currentChallenge.difficulty]}pts
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs font-mono">{currentIndex + 1}/{challenges.length}</span>
                    </div>

                    {/* Timer */}
                    {gameState === "playing" && (
                      <div className="flex items-center gap-2 mb-5">
                        <Timer className={`w-4 h-4 ${timeLeft <= 10 ? "text-red-400" : "text-gray-500"}`} />
                        <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full transition-colors ${timeLeft <= 10 ? "bg-red-500" : "bg-emerald-500"}`}
                            style={{ width: `${timerPercent}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>
                        <span className={`text-xs font-mono w-6 text-right ${timeLeft <= 10 ? "text-red-400" : "text-gray-500"}`}>
                          {timeLeft}
                        </span>
                      </div>
                    )}

                    {/* Question */}
                    <h3 className="text-base md:text-lg font-semibold text-white mb-3 leading-snug">
                      {currentChallenge.question}
                    </h3>

                    {/* Context */}
                    {currentChallenge.context && (
                      <pre className="bg-neutral-950/80 border border-white/5 rounded-lg p-4 text-xs text-gray-400 font-mono mb-5 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {currentChallenge.context}
                      </pre>
                    )}

                    {/* Options */}
                    <div className="flex flex-col gap-2.5">
                      {currentChallenge.options.map((option, idx) => {
                        let variant = "default";
                        if (gameState === "answered" && answerResult) {
                          if (idx === answerResult.correctAnswer) variant = "correct";
                          else if (idx === selectedOption && !answerResult.correct) variant = "wrong";
                        }
                        return (
                          <button
                            key={idx}
                            onClick={() => gameState === "playing" && handleAnswer(idx)}
                            disabled={gameState === "answered"}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 font-medium flex items-start gap-3 ${
                              variant === "correct"
                                ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                                : variant === "wrong"
                                ? "border-red-500/60 bg-red-500/15 text-red-300"
                                : gameState === "playing"
                                ? "border-white/10 bg-neutral-800/40 text-gray-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-white cursor-pointer"
                                : "border-white/5 bg-neutral-800/20 text-gray-600 cursor-default"
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                              variant === "correct" ? "bg-emerald-500/30 text-emerald-400" :
                              variant === "wrong" ? "bg-red-500/30 text-red-400" :
                              "bg-neutral-700 text-gray-400"
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-relaxed pt-0.5">{option}</span>
                            {variant === "correct" && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-auto mt-0.5" />}
                            {variant === "wrong" && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 ml-auto mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                      {gameState === "answered" && answerResult && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-5"
                        >
                          <div className={`rounded-xl p-4 border text-sm leading-relaxed ${
                            answerResult.correct
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                              : "bg-neutral-800/50 border-white/10 text-gray-300"
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              {answerResult.correct ? (
                                <><CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span className="font-bold text-emerald-400">Correto! +{answerResult.points} pts</span></>
                              ) : (
                                <><XCircle className="w-4 h-4 text-red-400" />
                                <span className="font-bold text-red-400">Incorreto</span></>
                              )}
                            </div>
                            {answerResult.explanation}
                          </div>

                          <button
                            onClick={nextQuestion}
                            className="mt-4 w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            {currentIndex + 1 >= challenges.length ? "Ver resultado" : "Próxima questão"}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* FINISHED */}
              {(gameState === "finished" || gameState === "submitting") && (
                <motion.div
                  key="finished"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-900/80 border border-white/10 rounded-2xl p-8"
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {score >= 2000 ? "Excelente!" : score >= 1000 ? "Muito bom!" : "Boa tentativa!"}
                    </h3>
                    <p className="text-4xl font-bold font-mono text-emerald-400 mt-2">{score} pts</p>
                    {rank && (
                      <p className="text-gray-400 text-sm mt-1">
                        Você ficou em <span className="text-white font-bold">#{rank}</span> no ranking
                      </p>
                    )}
                  </div>

                  {!rank && (
                    <div className="mb-6">
                      <label className="block text-sm text-gray-400 mb-2 font-medium">
                        Nickname para o leaderboard
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value.slice(0, 20))}
                          placeholder="seu_nick"
                          maxLength={20}
                          className="flex-1 px-4 py-2.5 bg-neutral-800 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50"
                          onKeyDown={(e) => e.key === "Enter" && submitScore()}
                        />
                        <button
                          onClick={submitScore}
                          disabled={gameState === "submitting"}
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold rounded-xl text-sm transition-colors"
                        >
                          {gameState === "submitting" ? "..." : "Enviar"}
                        </button>
                      </div>
                      {submitError && <p className="text-red-400 text-xs mt-1.5">{submitError}</p>}
                    </div>
                  )}

                  <button
                    onClick={startGame}
                    className="w-full py-2.5 border border-white/10 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-400 text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Jogar novamente
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Leaderboard Panel */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-bold text-white">Top 10</h3>
            </div>

            {leaderboard.length === 0 ? (
              <p className="text-gray-600 text-xs text-center py-4">Seja o primeiro!</p>
            ) : (
              <ol className="flex flex-col gap-2">
                {leaderboard.map((entry, idx) => (
                  <li
                    key={entry.id}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className={`w-6 text-center font-bold text-xs ${
                      idx === 0 ? "text-yellow-400" : idx === 1 ? "text-gray-300" : idx === 2 ? "text-orange-400" : "text-gray-600"
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className="flex-1 text-gray-300 truncate font-medium">{entry.nickname}</span>
                    <span className="font-mono text-emerald-400 text-xs font-bold">{entry.score}</span>
                  </li>
                ))}
              </ol>
            )}

            <div className="mt-5 pt-4 border-t border-white/5">
              <p className="text-gray-600 text-xs leading-relaxed">
                Pontuação: easy +100, medium +200, hard +300. Bônus de velocidade até +50%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
