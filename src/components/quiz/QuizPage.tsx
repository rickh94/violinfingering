import { Match, Switch, createSignal } from "solid-js";
import {
  QuizMode,
  quizDefaults,
  type QuizSettings,
  type QuestionInfo,
  type QuizResultsInfo,
  quizResultsBlank,
} from "./common";
import { createStore } from "solid-js/store";
import QuizSetup from "./QuizSetup";
import TakingQuiz from "./TakingQuiz";
import QuizResults from "./QuizResults";
import QuizSplash from "./QuizSplash";

export default function QuizPage() {
  const [mode, setMode] = createSignal(QuizMode.Splash);
  const [quizSettings, setQuizSettings] = createStore<QuizSettings>(quizDefaults);
  const [quizQuestions, setQuizQuestions] = createSignal<QuestionInfo[]>([]);
  const [results, setResults] = createStore<QuizResultsInfo>({
    ...quizResultsBlank,
  });

  function clearResults() {
    setResults({
      correct: 0,
      incorrect: 0,
      missed: {
        violinString: {
          E: 0,
          A: 0,
          D: 0,
          G: 0,
        },
        patternId: {
          oneTwo: 0,
          twoThree: 0,
          threeFour: 0,
          wholeSteps: 0,
          halfSteps: 0,
        },
        patternPosition: {
          low: 0,
          normal: 0,
          high: 0,
        },
      },
    });
  }

  return (
    <Switch fallback={<div>Invalid Mode</div>}>
      <Match when={mode() === QuizMode.Setup}>
        <QuizSetup
          setMode={setMode}
          quizSettings={quizSettings}
          setQuizSettings={setQuizSettings}
          setQuizQuestions={setQuizQuestions}
          clearResults={clearResults}
        />
      </Match>
      <Match when={mode() === QuizMode.Taking}>
        <TakingQuiz setMode={setMode} questions={quizQuestions()} quizSettings={quizSettings} setResults={setResults} />
      </Match>
      <Match when={mode() === QuizMode.Results}>
        <QuizResults
          setMode={setMode}
          results={results}
          quizSettings={quizSettings}
          setQuizQuestions={setQuizQuestions}
          clearResults={clearResults}
        />
      </Match>
      <Match when={mode() === QuizMode.Splash}>
        <QuizSplash
          setMode={setMode}
          quizSettings={quizSettings}
          setQuizQuestions={setQuizQuestions}
          clearResults={clearResults}
        />
      </Match>
    </Switch>
  );
}
