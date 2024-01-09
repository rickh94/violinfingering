import { Show, createSignal } from 'solid-js';
import { QuizMode, type QuestionInfo, type QuizSettings, quizDefaults } from './common';
import generateQuiz from './common';
import RadioBox from '~/components/RadioBox';
import type { SetStoreFunction } from 'solid-js/store';
import ListCheckBox from '../ListCheckBox';

// TODO: fix num of questions load
type QuizSetupProps = {
  setMode: (mode: QuizMode) => void;
  quizSettings: QuizSettings;
  setQuizSettings: SetStoreFunction<QuizSettings>;
  setQuizQuestions: (quizQuestions: QuestionInfo[]) => void;
  clearResults: () => void;
};

//TODO: change this to a form and uncontrolled
export default function QuizSetup(props: QuizSetupProps) {
  const [error, setError] = createSignal<string | null>(null);
  function validateQuizSettings() {
    if (props.quizSettings.numOfQuestions < 5) {
      return 'Number of Questions must be at least 5';
    }
    if (props.quizSettings.strings.length === 0) {
      return 'You must select at least one string';
    }
    if (props.quizSettings.patterns.length === 0) {
      return 'You must select at least one pattern';
    }
    return null;
  }

  function submitQuizSettings() {
    const err = validateQuizSettings();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    const questions = generateQuiz(props.quizSettings);
    props.setQuizQuestions(questions);
    props.clearResults();
    props.setMode(QuizMode.Taking);
  }

  // TODO: change number of questions to a number input or big buttons
  return (
    <form
      action="#"
      onSubmit={e => {
        e.preventDefault();
        submitQuizSettings();
      }}
    >
      <h2 class="mb-4 text-2xl">Quiz Setup</h2>
      <p class="mb-4 italic">Click the options below to configure your quiz.</p>
      <div class="mb-4 flex flex-col gap-6">
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">Number of Questions</legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 text-center sm:grid-cols-6 sm:gap-x-4">
            <RadioBox
              value={5}
              text="5"
              key="numOfQuestions5"
              name="numOfQuestions"
              checked={props.quizSettings.numOfQuestions === 5}
              setChecked={() => props.setQuizSettings('numOfQuestions', 5)}
            />
            <RadioBox
              value={10}
              text="10"
              key="numOfQuestions10"
              name="numOfQuestions"
              checked={props.quizSettings.numOfQuestions === 10}
              setChecked={() => props.setQuizSettings('numOfQuestions', 10)}
            />
            <RadioBox
              value={15}
              text="15"
              key="numOfQuestions15"
              name="numOfQuestions"
              checked={props.quizSettings.numOfQuestions === 15}
              setChecked={() => props.setQuizSettings('numOfQuestions', 15)}
            />
            <RadioBox
              value={20}
              text="20"
              key="numOfQuestions20"
              name="numOfQuestions"
              checked={props.quizSettings.numOfQuestions === 20}
              setChecked={() => props.setQuizSettings('numOfQuestions', 20)}
            />
            <RadioBox
              value={25}
              text="25"
              key="numOfQuestions25"
              name="numOfQuestions"
              checked={props.quizSettings.numOfQuestions === 25}
              setChecked={() => props.setQuizSettings('numOfQuestions', 25)}
            />
            <RadioBox
              value={30}
              text="30"
              key="numOfQuestions30"
              name="numOfQuestions"
              checked={props.quizSettings.numOfQuestions === 30}
              setChecked={() => props.setQuizSettings('numOfQuestions', 30)}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">Select Strings to Include</legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-4 sm:gap-x-4">
            <ListCheckBox
              text="E String"
              key="e-string"
              isChecked={props.quizSettings.strings.includes('E')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('strings', strings =>
                  isChecked ? [...strings, 'E'] : strings.filter(s => s !== 'E'),
                )
              }
            />
            <ListCheckBox
              text="A String"
              key="a-string"
              isChecked={props.quizSettings.strings.includes('A')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('strings', strings =>
                  isChecked ? [...strings, 'A'] : strings.filter(s => s !== 'A'),
                )
              }
            />
            <ListCheckBox
              text="D String"
              key="d-string"
              isChecked={props.quizSettings.strings.includes('D')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('strings', strings =>
                  isChecked ? [...strings, 'D'] : strings.filter(s => s !== 'D'),
                )
              }
            />
            <ListCheckBox
              text="G String"
              key="g-string"
              isChecked={props.quizSettings.strings.includes('G')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('strings', strings =>
                  isChecked ? [...strings, 'G'] : strings.filter(s => s !== 'G'),
                )
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">Select Patterns to Include</legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-5 sm:gap-x-4">
            <ListCheckBox
              text="1-2 Pattern"
              key="one-two-pattern"
              isChecked={props.quizSettings.patterns.includes('oneTwo')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('patterns', patterns =>
                  isChecked ? [...patterns, 'oneTwo'] : patterns.filter(p => p !== 'oneTwo'),
                )
              }
            />
            <ListCheckBox
              text="2-3 Pattern"
              key="two-three-pattern"
              isChecked={props.quizSettings.patterns.includes('twoThree')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('patterns', patterns =>
                  isChecked ? [...patterns, 'twoThree'] : patterns.filter(p => p !== 'twoThree'),
                )
              }
            />
            <ListCheckBox
              text="3-4 Pattern"
              key="three-four-pattern"
              isChecked={props.quizSettings.patterns.includes('threeFour')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('patterns', patterns =>
                  isChecked ? [...patterns, 'threeFour'] : patterns.filter(p => p !== 'threeFour'),
                )
              }
            />
            <ListCheckBox
              text="Whole Steps Pattern"
              key="whole-steps-pattern"
              isChecked={props.quizSettings.patterns.includes('wholeSteps')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('patterns', patterns =>
                  isChecked ? [...patterns, 'wholeSteps'] : patterns.filter(p => p !== 'wholeSteps'),
                )
              }
            />
            <ListCheckBox
              text="Half Steps Pattern"
              key="half-steps-pattern"
              isChecked={props.quizSettings.patterns.includes('halfSteps')}
              setIsChecked={(isChecked: boolean) =>
                props.setQuizSettings('patterns', patterns =>
                  isChecked ? [...patterns, 'halfSteps'] : patterns.filter(p => p !== 'halfSteps'),
                )
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">
            Choose whether notes should be in ascending order or random (more difficult).
          </legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
            <RadioBox
              value="true"
              text="Notes in Ascending Order"
              key="ascending"
              name="order"
              checked={props.quizSettings.inOrder}
              setChecked={() => props.setQuizSettings('inOrder', true)}
            />
            <RadioBox
              value="false"
              text="Notes in Random Order"
              key="random"
              name="order"
              checked={!props.quizSettings.inOrder}
              setChecked={() => props.setQuizSettings('inOrder', false)}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-xl font-bold leading-6 text-gray-900">Difficulty</legend>
          <div class="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-5 sm:gap-x-4">
            <RadioBox
              value={1}
              text="Trivial"
              key="difficulty1"
              name="difficulty"
              checked={props.quizSettings.difficulty === 1}
              setChecked={() => props.setQuizSettings('difficulty', 1)}
            />
            <RadioBox
              value={2}
              text="Easy"
              key="difficulty2"
              name="difficulty"
              checked={props.quizSettings.difficulty === 2}
              setChecked={() => props.setQuizSettings('difficulty', 2)}
            />
            <RadioBox
              value={3}
              text="Normal"
              key="difficulty3"
              name="difficulty"
              checked={props.quizSettings.difficulty === 3}
              setChecked={() => props.setQuizSettings('difficulty', 3)}
            />
            <RadioBox
              value={4}
              text="Difficult"
              key="difficulty4"
              name="difficulty"
              checked={props.quizSettings.difficulty === 4}
              setChecked={() => props.setQuizSettings('difficulty', 4)}
            />
            <RadioBox
              value={5}
              text="Impossible"
              key="difficulty5"
              name="difficulty"
              checked={props.quizSettings.difficulty === 5}
              setChecked={() => props.setQuizSettings('difficulty', 5)}
            />
          </div>
        </fieldset>
      </div>
      <Show when={error()}>
        <p class="text-right text-xl font-bold italic text-rose-700">{error()}</p>
      </Show>
      <div class="mt-4 flex w-full justify-end space-x-2">
        <button
          type="button"
          onClick={() => props.setQuizSettings(quizDefaults)}
          class="btn bg-rose-600 text-white hover:bg-rose-500"
        >
          <span class="icon-[heroicons--x-mark-solid] -ml-1 size-5" />
          Reset to Default
        </button>
        <button type="submit" class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500">
          <span class="icon-[heroicons--list-bullet-solid] -ml-1 size-5" />
          Start Quiz
        </button>
      </div>
    </form>
  );
}
