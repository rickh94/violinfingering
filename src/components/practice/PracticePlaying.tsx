import { Match, Switch, createSignal } from "solid-js";
import generateExercises, { PracticeMode, type SingleExerciseConfig } from "./common";
import { createStore } from "solid-js/store";
import PracticeSetup from "./PracticeSetup";
import PracticeDisplay from "./PracticeDisplay";
import PracticeFinished from "./PracticeFinished";

export default function Practice() {
  const [mode, setMode] = createSignal(PracticeMode.Setup);
  const [exerciseConfigs, setExerciseConfigs] = createStore<SingleExerciseConfig[]>([]);
  const [exercises, setExercises] = createSignal<string[]>([]);
  const [currentExerciseIdx, setExerciseIdx] = createSignal(0);

  function generate() {
    setExercises(generateExercises(exerciseConfigs));
  }

  function startPracticing(exerciseConfigs: SingleExerciseConfig[]) {
    setExerciseConfigs(exerciseConfigs);
    generate();
    setExerciseIdx(0);
    setMode(PracticeMode.Display);
  }

  function finish() {
    setMode(PracticeMode.Finished);
  }

  function regenerate() {
    generate();
    setExerciseIdx(0);
    setMode(PracticeMode.Display);
  }

  function restart() {
    setExerciseIdx(0);
    setMode(PracticeMode.Display);
  }

  function reconfigure() {
    setMode(PracticeMode.Setup);
  }

  function nextExercise(): void {
    console.log("next exercise");
    if (currentExerciseIdx() >= exercises().length - 1) {
      return;
    }
    setExerciseIdx(currentExerciseIdx() + 1);
  }

  const hasNextExercise = () => currentExerciseIdx() < exercises().length - 1;
  const hasPrevExercise = () => currentExerciseIdx() > 0;

  function prevExercise(): void {
    console.log("previous exercise");
    if (currentExerciseIdx() <= 0) {
      return;
    }
    setExerciseIdx(currentExerciseIdx() - 1);
  }

  const currExercise = () => exercises()[currentExerciseIdx()];
  const currExerciseConfig = () => exerciseConfigs[currentExerciseIdx()];

  return (
    // this is a jsx switch case hack. why don't i like jsx?
    <Switch fallback={<p>Something went wrong</p>}>
      <Match when={mode() === PracticeMode.Setup}>
        <PracticeSetup startPracticing={startPracticing} />
      </Match>
      <Match when={mode() === PracticeMode.Display}>
        <PracticeDisplay
          currExercise={currExercise()}
          currExerciseConfig={currExerciseConfig()}
          finish={finish}
          reconfigure={reconfigure}
          currentExerciseIdx={currentExerciseIdx()}
          nextExercise={() => nextExercise()}
          hasNextExercise={hasNextExercise()}
          prevExercise={() => prevExercise()}
          hasPrevExercise={hasPrevExercise()}
        />
      </Match>
      <Match when={mode() === PracticeMode.Finished}>
        <PracticeFinished
          restart={restart}
          regenerate={regenerate}
          reconfigure={reconfigure}
          exerciseConfigs={exerciseConfigs}
        />
      </Match>
    </Switch>
  );
}
