import type { SetStoreFunction } from "solid-js/store";
import { QuizMode, type QuestionInfo, type QuizResultsInfo, type QuizSettings } from "./common";
import { createSignal } from "solid-js";
import QuizQuestion from "./QuizQuestion";
import type { PatternId } from "~/common/patterns";

export default function TakingQuiz(props: {
  setMode: (mode: QuizMode) => void;
  quizSettings: QuizSettings;
  questions: QuestionInfo[];
  setResults: SetStoreFunction<QuizResultsInfo>;
}) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = createSignal(0);
  const [canAdvance, setCanAdvance] = createSignal(false);
  const [selected, setSelected] = createSignal<PatternId | null>(null);

  function recordAnswer(answer: PatternId) {
    setCanAdvance(true);
    if (props.questions[currentQuestionIdx()]?.patternId === answer) {
      props.setResults("correct", (correct) => correct + 1);
    } else {
      const question = props.questions[currentQuestionIdx()];
      if (!question) {
        return;
      }
      props.setResults("incorrect", (incorrect) => incorrect + 1);
      props.setResults("missed", "violinString", question.violinString, (misses) => misses + 1);
      props.setResults("missed", "patternId", question.patternId, (misses) => misses + 1);
      props.setResults("missed", "patternPosition", question.patternPosition, (misses) => misses + 1);
    }
  }

  function advanceQuestion() {
    if (!canAdvance) {
      return;
    }
    setCurrentQuestionIdx(currentQuestionIdx() + 1);
    if (currentQuestionIdx() >= props.questions.length - 1) {
      props.setMode(QuizMode.Results);
    }
    setSelected(null);
    setCanAdvance(false);
  }

  return (
    <>
      <QuizQuestion
        questionNumber={currentQuestionIdx() + 1}
        question={props.questions[currentQuestionIdx()]!}
        recordAnswer={recordAnswer}
        canAdvance={canAdvance()}
        advanceQuestion={advanceQuestion}
        quizSettings={props.quizSettings}
        selected={selected()}
        setSelected={setSelected}
      />
    </>
  );
}
