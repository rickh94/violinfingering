// TODO: make the loading feedback a little prettier, maybe its own component

import { createSignal, onMount } from "solid-js";
import generateQuiz, { QuizMode, type QuizResultsInfo, type QuizSettings, type QuestionInfo } from "./common";

type QuizResultsProps = {
  setMode: (mode: QuizMode) => void;
  results: QuizResultsInfo;
  quizSettings: QuizSettings;
  setQuizQuestions: (quizQuestions: QuestionInfo[]) => void;
  clearResults: () => void;
};

export default function QuizResults(props: QuizResultsProps) {
  const [percentage, setPercentage] = createSignal(0);
  const [colorClass, setColorClass] = createSignal("");
  // const [message, setMessage] = createSignal('Loading Feedback...');

  onMount(() => {
    const nextPercentage = (props.results.correct / props.quizSettings.numOfQuestions) * 100;
    setPercentage(nextPercentage);
    if (nextPercentage >= 79.9) {
      setColorClass("text-emerald-500");
    } else if (nextPercentage >= 49.9) {
      setColorClass("text-amber-500");
    } else {
      setColorClass("text-rose-500");
    }
    /*
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.text();
        }
      })
      .then((text?: string) => {
        if (text) {
          setMessage(text);
        } else {
          setMessage("Something went wrong.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Something went wrong.");
      });

      <p class="wrap-balance mb-2 text-lg">{message()}</p>
    */
  });

  function itemColorClass(mistakes: number) {
    if (mistakes > 2) {
      return "text-rose-500";
    } else if (mistakes > 0) {
      return "text-amber-500";
    } else {
      return "text-emerald-500";
    }
  }

  function newQuiz() {
    const questions = generateQuiz(props.quizSettings);
    props.setQuizQuestions(questions);
    props.setMode(QuizMode.Taking);
    props.clearResults();
  }

  // TODO: call api endpoint to get ai generated text and display on the page.
  // display loading text until it's available. Needs to be in a useEffect.

  return (
    <div class="mx-auto flex max-w-3xl flex-col gap-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="my-6 text-center text-4xl font-bold">Quiz Results</h2>
        </div>
        <div class="flex gap-x-2">
          <button type="button" class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500" onClick={() => newQuiz()}>
            <span class="icon-[heroicons--arrow-path-solid] -ml-1 size-5" />
            New Quiz
          </button>
          <button
            type="button"
            class="btn bg-amber-600 text-white hover:bg-amber-500"
            onClick={() => props.setMode(QuizMode.Setup)}
          >
            <span class="icon-[heroicons--cog-solid] -ml-1 size-5" />
            Change Quiz Settings
          </button>
        </div>
      </div>
      <div class="grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        <div class="flex flex-col items-center justify-center gap-4 rounded-lg border border-pink-100 bg-white px-4 py-6 shadow-sm">
          <h3 class="text-center text-2xl font-bold">Percentage</h3>
          <div class={`-mr-4 text-center text-8xl font-bold ${colorClass}`}>{percentage().toFixed(0)}%</div>
        </div>

        <div class="flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-4 py-6 shadow-sm sm:px-12">
          <h3 class="text-left text-2xl font-bold">Breakdown</h3>
          <table>
            <tbody>
              <tr>
                <td class="text-left text-4xl font-bold text-emerald-500">{props.results.correct}</td>
                <td class="text-2xl">Correct</td>
              </tr>
              <tr>
                <td class="text-left text-4xl font-bold text-rose-500">{props.results.incorrect}</td>
                <td class="text-2xl">Incorrect</td>
              </tr>
              <tr>
                <td class="text-left text-4xl font-bold">{props.quizSettings.numOfQuestions}</td>
                <td class="text-2xl">Total</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="-mb-2 text-2xl font-bold">Mistakes By String</div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div class="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-2xl font-bold">E String</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.violinString.E)}`}>
            {props.results.missed.violinString.E}
          </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-2xl font-bold">A String</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.violinString.A)}`}>
            {props.results.missed.violinString.A}
          </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-2xl font-bold">D String</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.violinString.D)}`}>
            {props.results.missed.violinString.D}
          </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center gap-2 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-2xl font-bold">G String</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.violinString.G)}`}>
            {props.results.missed.violinString.G}
          </div>
        </div>
      </div>
      <div class="col-span-full -mb-2 text-2xl font-bold">Mistakes By Pattern</div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-5">
        <div class="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-lg font-bold">1-2 Pattern</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.patternId.oneTwo)}`}>
            {props.results.missed.patternId.oneTwo}
          </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-lg font-bold">2-3 Pattern</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.patternId.twoThree)}`}>
            {props.results.missed.patternId.twoThree}
          </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-lg font-bold">3-4 Pattern</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.patternId.threeFour)}`}>
            {props.results.missed.patternId.threeFour}
          </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-lg font-bold">Whole Steps</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.patternId.wholeSteps)}`}>
            {props.results.missed.patternId.wholeSteps}
          </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center gap-4 rounded-lg border border-pink-100 bg-white px-2 py-4 shadow-sm">
          <h3 class="text-center text-lg font-bold">Half Steps</h3>
          <div class={`text-center text-4xl font-bold ${itemColorClass(props.results.missed.patternId.halfSteps)}`}>
            {props.results.missed.patternId.halfSteps}
          </div>
        </div>
      </div>
    </div>
  );
}
