import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronLeft, CircleAlert, Clock3, Crosshair, Gauge, RotateCcw, ShieldCheck, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { allTypeCounts, buildExam, difficultyClass, Question, QuestionType, questionBank, shuffled, topicDescriptions, topics, typeLabels, randomizeQuestion } from "@/data/questions";

type Mode = "intro" | "exam" | "results";
type Answer = number | Record<string, string>;
type Result = { answer: Answer; correct: boolean };

const iconForTopic: Record<string, string> = { "Fuel System": "01", "Air System": "02", "Lubrication System": "03", "Starting System": "04", "Ignition System": "05", "Thrust Reversal": "06", "Afterburning": "07" };

function shuffleExam(): Question[] {
  return shuffled(buildExam()).map(randomizeQuestion);
}

function Diagram({ kind }: { kind?: Question["diagram"] }) {
  const titles: Record<string, string> = { "fuel-flow": "FUEL FLOW PATH", "air-bleed": "BLEED AIR EXTRACTION", "oil-loop": "RECIRCULATORY OIL LOOP", "start-sequence": "STARTING CYCLE", ignition: "IGNITION UNIT", reverser: "CLAMSHELL REVERSER", afterburner: "AFTERBURNER CONTROL" };
  const nodes: Record<string, string[]> = {
    "fuel-flow": ["FUEL TANKS", "PUMPS", "FILTERS", "FUEL LINES", "ENGINE"],
    "air-bleed": ["COMPRESSOR", "BLEED AIR", "PROCESSING", "AIRCRAFT SYSTEMS"],
    "oil-loop": ["OIL TANK", "FEED PUMP", "LUBRICATED PARTS", "SCAVENGE PUMP"],
    "start-sequence": ["ROTATE", "AIR", "FUEL", "IGNITE"],
    ignition: ["LOW VOLTAGE", "CAPACITOR", "DISCHARGE", "IGNITER PLUG"],
    reverser: ["NORMAL EXIT", "DOORS MOVE", "DUCTS OPEN", "GAS FORWARD"],
    afterburner: ["FUEL FLOW", "P6 RISES", "NOZZLE OPENS", "P3/P6 RESTORED"],
  };
  const labels = nodes[kind ?? "fuel-flow"] ?? nodes["fuel-flow"];
  return <div className="diagram-shell"><div className="diagram-title"><span className="signal-dot" /> {titles[kind ?? "fuel-flow"]}</div><div className="diagram-track">{labels.map((label, index) => <div className="diagram-unit" key={label}><div className="diagram-node">{label}</div>{index < labels.length - 1 && <div className="diagram-arrow">→</div>}</div>)}</div><div className="diagram-foot">LECTURE RELATIONSHIP / SEQUENCE</div></div>;
}

function TypeIcon({ type }: { type: QuestionType }) {
  const text = type === "MCQ" ? "MC" : type === "MATCHING" ? "↔" : type === "FILL" ? "_" : type === "DIAGRAM" ? "⌁" : "T/F";
  return <span className="type-icon">{text}</span>;
}

function Intro({ onStart }: { onStart: () => void }) {
  return <main className="app-shell intro-shell">
    <header className="topbar"><div className="brand-lockup"><div className="brand-mark"><Crosshair size={20} /></div><div><p className="eyebrow">AERO / SYSTEMS ACADEMY</p><h1>Aircraft Engine Systems</h1></div></div><div className="topbar-status"><span className="status-pulse" /> SOURCE LOCKED <span className="status-separator">/</span> ALL.PDF</div></header>
    <section className="hero-grid">
      <div className="hero-copy"><div className="eyebrow amber">FINAL ASSESSMENT · 2026</div><h2>Test the systems<br /><em>behind the thrust.</em></h2><p className="hero-lede">A source-traceable examination built exclusively from the uploaded Aircraft Engine Systems lectures.</p><div className="hero-actions"><Button onClick={onStart} className="primary-cta">START EXAM <ArrowRight size={18} /></Button><span className="secure-note"><ShieldCheck size={16} /> Answers reveal after submission</span></div></div>
      <div className="hero-console"><div className="console-grid" /><div className="console-corner">SYS / 07</div><div className="console-ring"><div className="ring-center"><span>80</span><small>ITEM BANK</small></div></div><div className="console-readout"><span>EXAM LOAD</span><strong>38 ITEMS</strong><small>BALANCED TOPIC COVERAGE</small></div></div>
    </section>
    <section className="metrics-row"><div className="metric"><span className="metric-icon"><Gauge size={17} /></span><div><strong>38</strong><span>selected questions</span></div></div><div className="metric"><span className="metric-icon"><Clock3 size={17} /></span><div><strong>5</strong><span>question formats</span></div></div><div className="metric"><span className="metric-icon"><Sparkles size={17} /></span><div><strong>80</strong><span>source-backed items</span></div></div><div className="metric"><span className="metric-icon"><ShieldCheck size={17} /></span><div><strong>1 pt</strong><span>per correct answer</span></div></div></section>
    <section className="coverage-section"><div className="section-kicker"><span>01</span><h3>Course coverage</h3><p>Balanced selection from every lecture in the uploaded PDF.</p></div><div className="topic-grid">{topics.map((topic) => <div className="topic-tile" key={topic}><div className="topic-number">{iconForTopic[topic]}</div><div><strong>{topic}</strong><span>{topicDescriptions[topic]}</span></div><ArrowRight size={15} /></div>)}</div></section>
    <footer className="source-footer">SOURCE RESTRICTION ACTIVE <span>•</span> No outside knowledge, internet sources, or invented facts used.</footer>
  </main>;
}

function OptionList({ question, value, locked, onSelect, correct }: { question: Question; value?: number; locked: boolean; onSelect: (value: number) => void; correct?: boolean }) {
  return <div className="option-list">{question.options?.map((option, index) => { const selected = value === index; const isCorrect = locked && index === question.answer; const isWrong = locked && selected && !isCorrect; return <button key={option} type="button" disabled={locked} onClick={() => onSelect(index)} className={cn("option-button", selected && "selected", isCorrect && "correct", isWrong && "wrong")}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>{locked && isCorrect && <Check className="option-state" size={18} />}{locked && isWrong && <X className="option-state" size={18} />}</button>; })}</div>;
}

function Matching({ question, value, locked, onChange }: { question: Question; value?: Record<string, string>; locked: boolean; onChange: (value: Record<string, string>) => void }) {
  const current = value ?? {};
  const options = question.matchOptions ?? [];
  return <div className="matching-wrap"><div className="matching-head"><span>TERM / COMPONENT</span><span>SELECT THE LECTURE DESCRIPTION</span></div>{question.matches?.map((item, index) => { const selected = current[String(index)] ?? ""; const good = locked && selected === item.answer; const bad = locked && selected !== item.answer; return <div className={cn("match-row", locked && (good ? "match-good" : "match-bad"))} key={item.term}><div className="match-term"><span className="match-index">{String(index + 1).padStart(2, "0")}</span>{item.term}</div><select disabled={locked} value={selected} onChange={(event) => onChange({ ...current, [String(index)]: event.target.value })}><option value="">Choose a description…</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select>{locked && <span className="match-result">{good ? <Check size={17} /> : <X size={17} />}</span>}</div>; })}</div>;
}

function Exam({ questions, onFinish, onRestart }: { questions: Question[]; onFinish: (results: Record<string, Result>) => void; onRestart: () => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const question = questions[index];
  const locked = !!submitted[question.id];
  const current = answers[question.id];
  const score = Object.entries(submitted).filter(([id, isSubmitted]) => isSubmitted && questions.find((q) => q.id === id) && (answers[id] !== undefined) && ((questions.find((q) => q.id === id)?.type === "MATCHING") ? isMatchingCorrect(questions.find((q) => q.id === id)!, answers[id]) : answers[id] === questions.find((q) => q.id === id)?.answer)).length;
  const answered = Object.keys(submitted).length;
  const select = (value: Answer) => { if (!locked) setAnswers((prev) => ({ ...prev, [question.id]: value })); };
  const submit = () => { if (current === undefined || (question.type === "MATCHING" && Object.keys(current as Record<string, string>).length !== question.matches?.length)) return; setSubmitted((prev) => ({ ...prev, [question.id]: true })); };
  const next = () => { if (index === questions.length - 1) { const results: Record<string, Result> = {}; questions.forEach((item) => { const answer = answers[item.id]; results[item.id] = { answer, correct: item.type === "MATCHING" ? isMatchingCorrect(item, answer) : answer === item.answer }; }); onFinish(results); } else { setIndex((prev) => prev + 1); } };
  const isCorrect = question.type === "MATCHING" ? isMatchingCorrect(question, current) : current === question.answer;
  return <main className="app-shell exam-shell"><header className="exam-header"><button className="back-button" onClick={onRestart}><ChevronLeft size={17} /> EXIT</button><div className="exam-brand"><div className="brand-mark small"><Crosshair size={16} /></div><span>AIRCRAFT ENGINE SYSTEMS <b>/</b> FINAL EXAM</span></div><div className="score-chip">SCORE <strong>{score} / {questions.length}</strong></div></header><div className="exam-layout"><aside className="exam-rail"><div className="rail-label">EXAM PROGRESS</div><div className="rail-progress"><span style={{ height: `${((index + (locked ? 1 : 0)) / questions.length) * 100}%` }} /></div><div className="rail-count"><strong>{String(index + 1).padStart(2, "0")}</strong><span>/ {questions.length}</span></div><div className="rail-divider" /><div className="rail-stat"><span>ANSWERED</span><strong>{answered}</strong></div><div className="rail-stat"><span>REMAINING</span><strong>{questions.length - answered}</strong></div><div className="rail-tip"><CircleAlert size={16} /><p>Submit once you are ready. Answers lock after feedback.</p></div></aside><section className="question-area"><div className="question-topline"><div className="topic-label"><span className="topic-dot" /> {question.topic}</div><div className="question-meta"><span className={cn("difficulty", difficultyClass[question.difficulty])}>{question.difficulty}</span><span className="format-pill"><TypeIcon type={question.type} /> {typeLabels[question.type]}</span></div></div><div className="question-heading"><span>QUESTION {String(index + 1).padStart(2, "0")}</span><h2>{question.prompt}</h2></div>{question.type === "DIAGRAM" && <Diagram kind={question.diagram} />}{question.type === "MATCHING" ? <Matching question={question} value={current as Record<string, string> | undefined} locked={locked} onChange={(value) => select(value)} /> : <OptionList question={question} value={current as number | undefined} locked={locked} onSelect={(value) => select(value)} correct={isCorrect} />}<div className="question-footer">{locked ? <div className={cn("feedback", isCorrect ? "feedback-good" : "feedback-bad")}><div className="feedback-icon">{isCorrect ? <Check size={20} /> : <X size={20} />}</div><div><strong>{isCorrect ? "CORRECT" : "INCORRECT"}</strong><p>{!isCorrect && <>Correct answer: <b>{question.type === "MATCHING" ? "see highlighted matches" : question.options?.[question.answer ?? 0]}</b><br /></>}{question.explanation}</p><small>SOURCE / {question.source}</small></div></div> : <div className="submit-hint">{question.type === "MATCHING" ? "Match every item before submitting." : "Select one answer to continue."}</div>}<div className="footer-actions">{!locked ? <Button onClick={submit} disabled={current === undefined || (question.type === "MATCHING" && Object.keys(current as Record<string, string>).length !== question.matches?.length)} className="submit-button">SUBMIT ANSWER <ArrowRight size={17} /></Button> : <Button onClick={next} className="next-button">{index === questions.length - 1 ? "VIEW FINAL RESULT" : "NEXT QUESTION"} <ArrowRight size={17} /></Button>}</div></div></section></div></main>;
}

function isMatchingCorrect(question: Question, answer?: Answer) { if (!question.matches || !answer || typeof answer === "number") return false; return question.matches.every((item, index) => answer[String(index)] === item.answer); }

function Results({ questions, results, onRetake }: { questions: Question[]; results: Record<string, Result>; onRetake: () => void }) {
  const correct = questions.filter((q) => results[q.id]?.correct).length;
  const wrong = questions.length - correct;
  const percentage = Math.round((correct / questions.length) * 100);
  const performance = percentage >= 90 ? "Excellent Performance" : percentage >= 80 ? "Very Good Performance" : percentage >= 70 ? "Good Performance" : percentage >= 60 ? "Needs More Revision" : "Needs Significant Revision";
  const byTopic = topics.map((topic) => { const list = questions.filter((q) => q.topic === topic); return { topic, total: list.length, correct: list.filter((q) => results[q.id]?.correct).length }; });
  const mistakes = questions.filter((q) => !results[q.id]?.correct);
  return <main className="app-shell results-shell"><header className="topbar"><div className="brand-lockup"><div className="brand-mark"><Crosshair size={20} /></div><div><p className="eyebrow">AERO / SYSTEMS ACADEMY</p><h1>Aircraft Engine Systems</h1></div></div><div className="topbar-status"><span className="status-pulse" /> EXAM COMPLETE</div></header><section className="results-hero"><div><div className="eyebrow amber">FINAL RESULT · SOURCE VERIFIED</div><h2>Assessment<br /><em>complete.</em></h2><p>Every answer has been recorded. Use the breakdown below to identify the systems that deserve another pass.</p></div><div className="score-orbit"><div className="score-orbit-inner"><span>{correct}</span><small>/ {questions.length} POINTS</small><b>{percentage}%</b></div></div></section><section className="result-grid"><Card className="score-card"><CardHeader><CardTitle>Performance summary</CardTitle></CardHeader><CardContent><div className="result-score"><strong>{correct}</strong><span>/ {questions.length}</span></div><div className="result-band">{performance}</div><Progress value={percentage} className="result-progress" /><div className="result-counts"><div><span className="good-text">CORRECT</span><strong>{correct}</strong></div><div><span className="bad-text">INCORRECT</span><strong>{wrong}</strong></div><div><span>UNANSWERED</span><strong>0</strong></div></div><Button onClick={onRetake} className="retake-button"><RotateCcw size={16} /> RETAKE EXAM</Button></CardContent></Card><Card className="breakdown-card"><CardHeader><CardTitle>Topic breakdown</CardTitle><span className="card-note">{questions.length} selected items</span></CardHeader><CardContent><div className="breakdown-list">{byTopic.map((item) => <div className="breakdown-row" key={item.topic}><div className="breakdown-label"><span>{iconForTopic[item.topic]}</span><strong>{item.topic}</strong></div><div className="breakdown-bar"><span style={{ width: `${item.total ? (item.correct / item.total) * 100 : 0}%` }} /></div><b>{item.correct} / {item.total}</b></div>)}</div></CardContent></Card></section><section className="review-section"><div className="section-kicker"><span>02</span><h3>Review incorrect answers</h3><p>{mistakes.length ? "Revisit each missed concept with its lecture explanation." : "Perfect score — no incorrect answers to review."}</p></div>{mistakes.length > 0 && <div className="review-list">{mistakes.map((question, index) => { const result = results[question.id]; const user = typeof result.answer === "number" ? question.options?.[result.answer] : "Your matching selections"; return <article className="review-card" key={question.id}><div className="review-number">{String(index + 1).padStart(2, "0")}</div><div className="review-body"><div className="review-meta"><span>{question.topic}</span><span>{typeLabels[question.type]}</span></div><h4>{question.prompt}</h4><div className="review-answers"><div><small>YOUR ANSWER</small><p className="bad-text">{user ?? "Unanswered"}</p></div><div><small>CORRECT ANSWER</small><p className="good-text">{question.type === "MATCHING" ? "See matching feedback" : question.options?.[question.answer ?? 0]}</p></div></div><p className="review-explanation">{question.explanation}</p><small className="review-source">SOURCE / {question.source}</small></div></article>})}</div>}</section><footer className="source-footer">SOURCE RESTRICTION ACTIVE <span>•</span> Results are based only on the uploaded Aircraft Engine Systems lectures.</footer></main>;
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<Record<string, Result>>({});
  const start = () => { setQuestions(shuffleExam()); setResults({}); setMode("exam"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const finish = (finalResults: Record<string, Result>) => { setResults(finalResults); setMode("results"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (mode === "intro") return <Intro onStart={start} />;
  if (mode === "exam") return <Exam questions={questions} onFinish={finish} onRestart={() => setMode("intro")} />;
  return <Results questions={questions} results={results} onRetake={start} />;
}
