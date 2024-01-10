import { Dialog } from "@ark-ui/solid";
import { For, Match, Switch, createSignal, type Component } from "solid-js";
import { Portal } from "solid-js/web";
import type { PatternId, PatternPosition, ViolinString } from "~/common/patterns";
import scales, { type Scale } from "~/common/scales";
import { type SingleExerciseConfig } from "./common";
import { allPossibleQuestions } from "../quiz/common";

export type ExerciseFormProps = {
  save: (exercise: SingleExerciseConfig) => void;
};
export const ExerciseForm: Component<ExerciseFormProps> = function (props) {
  return (
    <div class="flex flex-col gap-2">
      <h2 class="mb-1 text-2xl font-bold">Add Exercises</h2>
      <p class="mb-4 text-sm">
        Configure an exercise below and click <strong>Add Exercise</strong> to add it to the list. Then click{" "}
        <strong>Start Practicing</strong>.
      </p>
      <ManualForm save={props.save} />
      <section class="flex w-full flex-wrap items-center gap-4 rounded-lg bg-white px-4 py-2 shadow-sm">
        <span class="text-xl">OR</span>
        <SelectAKeyDialog save={props.save} /> to practice all the patterns for that key
      </section>
      <section class="flex w-full flex-wrap items-center gap-4 rounded-lg bg-white px-4 py-2 shadow-sm">
        <span class="text-xl">OR</span>
        <GenerateRandomDialog save={props.save} /> to practice all the patterns for that key
      </section>
    </div>
  );
};

function ManualForm(props: { save: (exercise: SingleExerciseConfig) => void }) {
  let formRef: HTMLFormElement | undefined;

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (!formRef) {
      return;
    }
    const data = new FormData(formRef);
    props.save({
      violinString: data.get("violin-string") as ViolinString,
      pattern: data.get("pattern") as PatternId,
      position: data.get("finger-position") as PatternPosition,
      numOfMeasures: parseInt(data.get("measures") as string),
      includeOpen: data.get("open-strings") === "with",
    });
  }

  return (
    <form action="#" onSubmit={handleSubmit} ref={formRef} class="flex flex-wrap items-center gap-2">
      <section class="flex w-full flex-wrap items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
        <fieldset class="inline-flex flex-wrap items-center gap-2" id="pattern-set">
          <label for="pattern" class="sr-only">
            Select Pattern
          </label>
          <span>I will practice the</span>
          <select
            id="pattern"
            name="pattern"
            class="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm shadow-black/20 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            style={{
              appearance: "none",
              "background-image": `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
              "background-repeat": "no-repeat",
              "background-position": "right 0.5rem top 50%",
              "background-size": "1rem auto",
              "-webkit-appearance": "none",
              "text-indent": "1",
              "text-overflow": "",
            }}
          >
            <option value="oneTwo">1-2 Pattern</option>
            <option value="twoThree" selected>
              2-3 Pattern
            </option>
            <option value="threeFour">3-4 Pattern</option>
            <option value="halfSteps">Half Steps Pattern</option>
            <option value="wholeSteps">Whole Steps Pattern</option>
          </select>
        </fieldset>
        <fieldset class="inline-flex items-center gap-2" id="string-set">
          <label for="violin-string" class="sr-only">
            Select string
          </label>
          <span>on the</span>
          <select
            id="violin-string"
            name="violin-string"
            class="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm shadow-black/20 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            style={{
              appearance: "none",
              "background-image": `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
              "background-repeat": "no-repeat",
              "background-position": "right 0.5rem top 50%",
              "background-size": "1rem auto",
              "-webkit-appearance": "none",
              "text-indent": "1",
              "text-overflow": "",
            }}
          >
            <option value="E">E String</option>
            <option value="A" selected>
              A String
            </option>
            <option value="D">D String</option>
            <option value="G">G String</option>
          </select>
        </fieldset>
        <fieldset class="inline-flex items-center gap-2" id="finger-position-set">
          <label for="finger-position" class="sr-only">
            Select Position
          </label>
          <span>with a</span>
          <select
            id="finger-position"
            name="finger-position"
            class="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm shadow-black/20 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            style={{
              appearance: "none",
              "background-image": `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
              "background-repeat": "no-repeat",
              "background-position": "right 0.5rem top 50%",
              "background-size": "1rem auto",
              "-webkit-appearance": "none",
              "text-indent": "1",
              "text-overflow": "",
            }}
          >
            <option value="low">Low</option>
            <option value="normal" selected>
              Normal
            </option>
            <option value="high">High</option>
          </select>
          <span>first finger</span>
        </fieldset>
        <fieldset class="inline-flex items-center gap-2" id="measures-set">
          <label for="measures" class="sr-only">
            Number of Measures
          </label>
          <span>that are</span>
          <input
            type="number"
            name="measures"
            id="measures"
            pattern="[0-9]*"
            inputMode="numeric"
            class="relative block w-16 rounded-lg border border-fuchsia-700 bg-white px-2 py-1 font-sans shadow-sm shadow-black/20 focus:border-fuchsia-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            value="8"
            min={1}
            max={20}
          />
          <span>measures long</span>
        </fieldset>
        <fieldset class="inline-flex items-center gap-2" id="open-strings-set">
          <label for="open-strings" class="sr-only">
            Open Strings
          </label>
          <select
            id="open-strings"
            name="open-strings"
            class="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm shadow-black/20 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            style={{
              appearance: "none",
              "background-image": `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
              "background-repeat": "no-repeat",
              "background-position": "right 0.5rem top 50%",
              "background-size": "1rem auto",
              "-webkit-appearance": "none",
              "text-indent": "1",
              "text-overflow": "",
            }}
          >
            <option value="with" selected>
              With
            </option>
            <option value="without">Without</option>
          </select>
          <span>open strings.</span>
        </fieldset>
      </section>
      <div class="mt-4 flex w-full flex-row-reverse justify-start gap-x-2">
        <button type="submit" class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500">
          <span class="icon-[heroicons--plus-solid] -ml-1 size-5"></span>
          Add Exercise
        </button>
        <button type="reset" class="btn bg-rose-600 text-white hover:bg-rose-500">
          <span class="icon-[heroicons--x-mark-solid] -ml-1 size-5"></span>
          Reset to Default
        </button>
      </div>
    </form>
  );
}

type Tab = {
  name: string;
  id: string;
};
const TABS: Tab[] = [
  { name: "Major", id: "major" },
  { name: "Minor", id: "minor" },
];

function SelectAKeyDialog(props: { save: (config: SingleExerciseConfig) => void }) {
  const [open, setOpen] = createSignal(false);
  const [currentTabId, setCurrentTabId] = createSignal(TABS[0]!.id);

  function handleClick(scale: Scale) {
    for (const scalePattern of scale.patterns) {
      props.save({
        position: scalePattern.pattern.position,
        pattern: scalePattern.pattern.id,
        violinString: scalePattern.violinString,
        includeOpen: true,
        numOfMeasures: 8,
      });
    }
    setOpen(false);
  }
  return (
    <Dialog.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger class="flex items-center gap-2 rounded-lg border border-fuchsia-700 bg-white px-4 py-1 font-sans text-xl font-semibold shadow-sm shadow-black/20 transition duration-200  hover:shadow hover:shadow-fuchsia-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white">
        <span class="-ml-1 font-sans text-3xl font-normal">♯♮♭</span> Choose a Key
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop class="overlay fixed inset-0 z-20 bg-fuchsia-200 bg-opacity-60 backdrop-blur" />
        <Dialog.Positioner class="fixed inset-0 z-30 overflow-y-auto">
          <div class="flex min-h-full w-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Content class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6">
              <div class="relative z-50 flex w-full items-center justify-between">
                <Dialog.Title class="flex items-center gap-2 text-2xl font-bold">
                  <span class="font-sans text-3xl font-normal">♯♮♭</span> Choose a Key
                </Dialog.Title>
                <Dialog.CloseTrigger class="rounded hover:text-rose-500 focus:text-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  <span class="icon-[heroicons--x-circle-solid] size-6"></span>
                </Dialog.CloseTrigger>
              </div>
              <Dialog.Description>
                <div class="sm:hidden">
                  <label for="tabs" class="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="tabs"
                    name="tabs"
                    class="block w-full rounded-md border border-gray-300 py-2 pl-3 text-base focus:border-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white sm:text-sm"
                  >
                    <For each={TABS}>
                      {(tab) => (
                        <option
                          value={tab.id}
                          selected={currentTabId() === tab.id}
                          onSelect={() => setCurrentTabId(tab.id)}
                        >
                          {tab.name}
                        </option>
                      )}
                    </For>
                  </select>
                </div>
                <div class="hidden sm:block">
                  <div class="border-b border-gray-200">
                    <div class="-mb-px flex gap-x-4" aria-label="Tabs">
                      <For each={TABS}>
                        {(tab) => (
                          <button
                            onClick={() => setCurrentTabId(tab.id)}
                            class="whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
                            classList={{
                              "border-fuchsia-500 text-fuchsia-600": currentTabId() === tab.id,
                              "border-transparent text-black hover:border-fuchsia-300 hover:text-fuchsia-500":
                                currentTabId() !== tab.id,
                            }}
                            aria-current={currentTabId() === tab.id ? "page" : undefined}
                          >
                            {tab.name}
                          </button>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
                <div class="relative z-50 mx-auto mt-4 grid w-full grid-cols-2 gap-y-4 text-left">
                  <Switch fallback={<div>Error</div>}>
                    <Match when={currentTabId() === "major"}>
                      <MajorScales onClick={handleClick} />
                    </Match>
                    <Match when={currentTabId() === "minor"}>
                      <MinorScales onClick={handleClick} />
                    </Match>
                  </Switch>
                </div>
              </Dialog.Description>
            </Dialog.Content>
          </div>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function MajorScales(props: { onClick: (scale: Scale) => void }) {
  return (
    <For each={scales}>
      {(scale: Scale) =>
        scale.mode == "major" && (
          <button
            type="button"
            onClick={() => props.onClick(scale)}
            class="rounded text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <span class="border-b-2 border-fuchsia-600 hover:text-fuchsia-800">{scale.name}</span>
          </button>
        )
      }
    </For>
  );
}

function MinorScales(props: { onClick: (scale: Scale) => void }) {
  return (
    <For each={scales}>
      {(scale: Scale) =>
        scale.mode == "minor" && (
          <button
            type="button"
            onClick={() => props.onClick(scale)}
            class="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <span class="border-b-2 border-fuchsia-600 hover:text-fuchsia-800">{scale.name}</span>
          </button>
        )
      }
    </For>
  );
}

function GenerateRandomDialog(props: { save: (config: SingleExerciseConfig) => void }) {
  const [open, setOpen] = createSignal(false);
  let formRef: HTMLFormElement | undefined;

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!formRef) {
      return;
    }
    const data = new FormData(formRef);
    const includeOpen = data.get("open-strings") === "with";
    const numOfMeasures = parseInt(data.get("measures") as string);
    if (isNaN(numOfMeasures)) {
      alert("Invalid number of measures");
      return;
    }
    const difficulty = data.get("difficulty") as unknown as number;
    console.log(difficulty);
    if (!difficulty || isNaN(difficulty)) {
      alert("Invalid difficulty");
      return;
    }
    const numOfExercises = parseInt(data.get("exercises") as string);
    if (!numOfExercises || isNaN(numOfExercises)) {
      alert("Invalid number of exercises");
      return;
    }
    const exercisePool = allPossibleQuestions.filter((q) => q.difficulty <= difficulty);
    for (let i = 0; i < numOfExercises && i < exercisePool.length; i++) {
      const randomIndex = Math.floor(Math.random() * exercisePool.length);
      const [exercise] = exercisePool.splice(randomIndex, 1);
      if (!exercise) {
        continue;
      }
      props.save({
        violinString: exercise.violinString,
        pattern: exercise.patternId,
        position: exercise.patternPosition,
        numOfMeasures,
        includeOpen,
      });
    }
    setOpen(false);
  }

  return (
    <Dialog.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger class="flex items-center gap-2 rounded-lg border border-fuchsia-700 bg-white px-4 py-1 font-sans text-xl font-semibold shadow-sm shadow-black/20 transition duration-200  hover:shadow hover:shadow-fuchsia-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white">
        {/* TODO: icon */}
        Generate Random Exercises
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop class="overlay fixed inset-0 z-20 bg-fuchsia-200 bg-opacity-60 backdrop-blur" />
        <Dialog.Positioner class="fixed inset-0 z-30 overflow-y-auto">
          <div class="flex min-h-full w-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Content class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-2xl sm:p-6">
              <div class="relative z-50 flex w-full items-center justify-between">
                <Dialog.Title class="flex items-center gap-2 text-2xl font-bold">
                  Configure Random Exercises
                </Dialog.Title>
                <Dialog.CloseTrigger class="rounded hover:text-rose-500 focus:text-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  <span class="icon-[heroicons--x-circle-solid] size-6"></span>
                </Dialog.CloseTrigger>
              </div>
              <Dialog.Description>
                <div class="z-50 mx-auto mt-4 w-full flex-col text-left">
                  <form onSubmit={handleSubmit} ref={formRef}>
                    <fieldset class="flex w-full flex-wrap items-center gap-2" id="pattern-set">
                      <label for="exercises" class="sr-only">
                        Number of Exercises
                      </label>
                      <span>I want to practice</span>
                      <input
                        type="number"
                        name="exercises"
                        id="exercises"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        class="w-16 rounded-lg border border-fuchsia-700 bg-white px-2 py-1 font-sans shadow-sm shadow-black/20 focus:border-fuchsia-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
                        value="4"
                        min={1}
                        max={20}
                      />
                      <span>exercises of</span>
                      <label for="difficulty" class="sr-only">
                        Difficulty
                      </label>
                      <select
                        id="difficulty"
                        name="difficulty"
                        class="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm shadow-black/20 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
                        style={{
                          appearance: "none",
                          "background-image": `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
                          "background-repeat": "no-repeat",
                          "background-position": "right 0.5rem top 50%",
                          "background-size": "1rem auto",
                          "-webkit-appearance": "none",
                          "text-indent": "1",
                          "text-overflow": "",
                        }}
                      >
                        <option value={1}>Trivial</option>
                        <option value={2}>Easy</option>
                        <option value={3} selected>
                          Normal
                        </option>
                        <option value={4}>Difficult</option>
                        <option value={5}>Impossible</option>
                      </select>
                      <span>difficulty that are</span>
                      <label for="measures" class="sr-only">
                        Number of Measures
                      </label>
                      <input
                        type="number"
                        name="measures"
                        id="measures"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        class="relative block w-16 rounded-lg border border-fuchsia-700 bg-white px-2 py-1 font-sans shadow-sm shadow-black/20 focus:border-fuchsia-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
                        value="8"
                        min={1}
                        max={20}
                      />
                      <span>measures long</span>
                      <label for="open-strings" class="sr-only">
                        Open Strings
                      </label>
                      <select
                        id="open-strings"
                        name="open-strings"
                        class="inline-flex rounded-lg border border-fuchsia-700 bg-white py-1 pl-2 pr-8 font-sans font-semibold shadow-sm shadow-black/20 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
                        style={{
                          appearance: "none",
                          "background-image": `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a21caf"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" /></svg>')`,
                          "background-repeat": "no-repeat",
                          "background-position": "right 0.5rem top 50%",
                          "background-size": "1rem auto",
                          "-webkit-appearance": "none",
                          "text-indent": "1",
                          "text-overflow": "",
                        }}
                      >
                        <option value="with" selected>
                          With
                        </option>
                        <option value="without">Without</option>
                      </select>
                      <span>open strings.</span>
                    </fieldset>
                    <div class="mt-4 flex w-full flex-row-reverse justify-start gap-x-2">
                      <button type="submit" class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500">
                        {/* TODO: change icon */}
                        <span class="icon-[heroicons--plus-solid] -ml-1 size-5"></span>
                        Generate
                      </button>
                      <button type="reset" class="btn bg-rose-600 text-white hover:bg-rose-500">
                        <span class="icon-[heroicons--x-mark-solid] -ml-1 size-5"></span>
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Description>
            </Dialog.Content>
          </div>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
