import { patterns, type PatternId } from "~/common/patterns";
import { FingerDisplay } from "../FingerDisplay";
import NotesDisplay from "../NotesDisplay";
import type { QuestionInfo, QuizSettings } from "~/components/quiz/common";
import { For, Match, Switch } from "solid-js";

type QuizQuestionProps = {
  question: QuestionInfo;
  quizSettings: QuizSettings;
  recordAnswer: (answer: PatternId) => void;
  questionNumber: number;
  canAdvance: boolean;
  advanceQuestion: () => void;
  selected: PatternId | null;
  setSelected: (answer: PatternId | null) => void;
};

export default function QuizQuestion(props: QuizQuestionProps) {
  function handleAnswer(answer: string) {
    props.setSelected(answer as PatternId);
    props.recordAnswer(answer as PatternId);
  }

  function answerClasses(key: string) {
    if (!props.selected) {
      return "";
    }
    if (key === props.question.patternId) {
      return " ring-2 ring-emerald-700 border-emerald-700";
    }
    if (props.selected === key) {
      return " ring-2 ring-rose-700 border-rose-700";
    }
  }

  function responseText(key: string) {
    if (!props.selected) {
      return "";
    }
    if (props.selected === key && key === props.question.patternId) {
      return <span class="font-bold text-emerald-700"> — Correct!</span>;
    }
    if (props.selected === key) {
      return <span class="font-bold text-rose-700"> — Incorrect</span>;
    }
    if (key === props.question.patternId) {
      return <span class="italic text-emerald-700"> — Correct Answer</span>;
    }
  }

  const questionNotes = () =>
    props.quizSettings.inOrder
      ? `K: Cmaj
L: 1/4
${props.question.notes} |]`
      : `K: Cmaj
L: 1/4
${shuffle(props.question.notes.split(" ")).join(" ")} |]`;

  // TODO: implement note scrambling
  // TODO: fix notes display width
  return (
    <>
      <h2 class="mb-2 text-center text-2xl font-bold">Which Pattern matches these notes?</h2>
      <div class="mx-auto max-w-4xl">
        <div class="my-4 flex w-full justify-center">
          <NotesDisplay notes={questionNotes()} offset={0} disabled={true} />
        </div>
        <div class="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Switch>
            <Match when={props.question.patternPosition === "low"}>
              <For each={Object.keys(patterns.low)}>
                {(key) => {
                  if (
                    key !== "oneTwo" &&
                    key !== "twoThree" &&
                    key !== "threeFour" &&
                    key !== "wholeSteps" &&
                    key !== "halfSteps"
                  ) {
                    return null;
                  }
                  const name = patterns.low[key]?.name;
                  const widths = patterns.low[key]?.widths;
                  if (!name || !widths) {
                    return null;
                  }
                  return (
                    <button
                      type="button"
                      class={`relative flex cursor-pointer flex-col rounded-lg border bg-white p-2 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700 ${answerClasses(
                        key,
                      )}`}
                      disabled={!!props.selected}
                      onClick={() => handleAnswer(key)}
                    >
                      <h2 class="text-xl tracking-wide">
                        {name}
                        {responseText(key)}
                      </h2>
                      <FingerDisplay radius={2} widths={widths} disabled={true} />
                    </button>
                  );
                }}
              </For>
            </Match>
            <Match when={props.question.patternPosition === "normal"}>
              <For each={Object.keys(patterns.normal)}>
                {(key) => {
                  if (
                    key !== "oneTwo" &&
                    key !== "twoThree" &&
                    key !== "threeFour" &&
                    key !== "wholeSteps" &&
                    key !== "halfSteps"
                  ) {
                    return null;
                  }
                  const name = patterns.normal[key]?.name;
                  const widths = patterns.normal[key]?.widths;
                  if (!name || !widths) {
                    return null;
                  }
                  return (
                    <button
                      type="button"
                      class={`relative flex cursor-pointer flex-col rounded-lg border bg-white p-2 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700 ${answerClasses(
                        key,
                      )}`}
                      disabled={!!props.selected}
                      onClick={() => handleAnswer(key)}
                    >
                      <h2 class="text-xl tracking-wide">
                        {name}
                        {responseText(key)}
                      </h2>
                      <FingerDisplay radius={2} widths={widths} disabled={true} />
                    </button>
                  );
                }}
              </For>
            </Match>
            <Match when={props.question.patternPosition === "high"}>
              <For each={Object.keys(patterns.high)}>
                {(key) => {
                  if (
                    key !== "oneTwo" &&
                    key !== "twoThree" &&
                    key !== "threeFour" &&
                    key !== "wholeSteps" &&
                    key !== "halfSteps"
                  ) {
                    return null;
                  }
                  const name = patterns.high[key]?.name;
                  const widths = patterns.high[key]?.widths;
                  if (!name || !widths) {
                    return null;
                  }
                  return (
                    <button
                      type="button"
                      class={`relative flex cursor-pointer flex-col rounded-lg border bg-white p-2 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-700 ${answerClasses(
                        key,
                      )}`}
                      disabled={!!props.selected}
                      onClick={() => handleAnswer(key)}
                    >
                      <h2 class="text-xl tracking-wide">
                        {name}
                        {responseText(key)}
                      </h2>
                      <FingerDisplay radius={2} widths={widths} disabled={true} />
                    </button>
                  );
                }}
              </For>
            </Match>
          </Switch>
          <button
            type="button"
            class="btn-lg justify-center text-white"
            classList={{
              "pointer-events-auto bg-fuchsia-600 shadow-lg hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600":
                props.canAdvance,
              "pointer-events-none bg-gray-600": !props.canAdvance,
            }}
            disabled={!props.canAdvance}
            onClick={props.advanceQuestion}
          >
            Next Question
            <span class="icon-[heroicons--chevron-right-solid] -mr-2 size-6"></span>
          </button>
        </div>
      </div>
    </>
  );
}

function shuffle(array: (string | undefined)[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// TODO: change above to object.entries
// TODO: make text not selectable
