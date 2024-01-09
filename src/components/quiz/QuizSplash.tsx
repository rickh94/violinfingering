import generateQuiz, { QuizMode, type QuizSettings, type QuestionInfo } from "./common";

type QuizSplashProps = {
  setMode: (mode: QuizMode) => void;
  quizSettings: QuizSettings;
  setQuizQuestions: (quizQuestions: QuestionInfo[]) => void;
  clearResults: () => void;
};
export default function QuizSplash(props: QuizSplashProps) {
  function startTaking() {
    const questions = generateQuiz(props.quizSettings);
    props.setQuizQuestions(questions);
    props.clearResults();
    props.setMode(QuizMode.Taking);
  }
  return (
    <>
      <h2 class="mb-4 text-2xl">Practice Quiz</h2>
      <p class="mb-4">
        Select below to start taking the quiz immediately with the default settings or customize the length and question
        difficulty.
      </p>
      <div class="mb-4 flex flex-col gap-6 sm:flex-row-reverse">
        <button
          type="button"
          onClick={() => startTaking()}
          class="btn-lg flex-1 justify-center bg-emerald-600 text-white hover:bg-emerald-500"
        >
          Start Now
          <span class="icon-[heroicons--list-bullet-solid] -mr-1 size-6" />
        </button>
        <button
          type="button"
          onClick={() => props.setMode(QuizMode.Setup)}
          class="btn-lg flex-1 justify-center bg-fuchsia-600 text-white hover:bg-fuchsia-500"
        >
          <span class="icon-[heroicons--cog-solid] -ml-1 size-6" />
          Customize
        </button>
      </div>
    </>
  );
}
