import { For, Show, createSignal, onMount } from "solid-js";
import {
  type SingleExerciseConfig,
  createShareLink,
  decodeShareLink,
  generateExerciseConfigsFromQuery,
} from "./common";
import { patterns } from "~/common/patterns";
import { ExerciseForm } from "./ExerciseForm";
import { createAutoAnimate } from "@formkit/auto-animate/solid";
import "./practice.css";

type PracticeSetupProps = {
  startPracticing: (exerciseConfigs: SingleExerciseConfig[]) => void;
};

// TODO: add ability to optionally show fingering. Always show 4s and opens.

export default function PracticeSetup(props: PracticeSetupProps) {
  const [link, setLink] = createSignal("");
  const [exerciseConfigs, setExerciseConfigs] = createSignal<SingleExerciseConfig[]>([]);
  let shareLinkRef;
  let copyButtonContentRef: HTMLButtonElement | undefined;

  function addExerciseConfig(exercise: SingleExerciseConfig) {
    exercise.id = Math.floor(Math.random() * 1000000);
    setLink("");
    setExerciseConfigs(configs => [...configs, exercise]);
  }

  function deleteExerciseConfig(deleteId: number | undefined) {
    if (deleteId === undefined) {
      return;
    }
    setExerciseConfigs(configs => configs.filter((ex: SingleExerciseConfig) => ex.id !== deleteId));
    setLink("");
  }

  function share() {
    setLink(createShareLink(exerciseConfigs()));
  }

  function clear() {
    if (window.location.search) {
      window.history.pushState({}, document.title, window.location.pathname);
    }
    setExerciseConfigs([]);
  }

  async function copyLink() {
    if (link()) {
      await navigator.clipboard.writeText(link());
      if (copyButtonContentRef) {
        copyButtonContentRef.innerText = "Copied!";
        setTimeout(() => {
          if (copyButtonContentRef) {
            copyButtonContentRef.innerText = "Copy Link";
          }
        }, 1000);
      }
    }
  }

  onMount(() => {
    if (exerciseConfigs().length === 0) {
      const shareConfigs = decodeShareLink();
      const idConfigs = generateExerciseConfigsFromQuery();
      if (shareConfigs && shareConfigs.length > 0) {
        for (const config of shareConfigs) {
          addExerciseConfig(config);
        }
      } else if (idConfigs) {
        for (const config of idConfigs) {
          addExerciseConfig(config);
        }
      }
    }
  });

  const [parent] = createAutoAnimate();

  return (
    <>
      <div class="flex flex-col gap-4 sm:mx-auto sm:max-w-4xl">
        <ExerciseForm save={addExerciseConfig} />
        <div class="min-h-[32rem] pb-12 md:col-span-2">
          <h2 class="text-2xl font-bold">Exercises</h2>
          <ul class="my-2 flex flex-col gap-2" ref={parent}>
            <For each={exerciseConfigs()}>
              {exercise => (
                <ExerciseConfigItem exercise={exercise} onDelete={() => deleteExerciseConfig(exercise.id)} />
              )}
            </For>
          </ul>
          <Show when={exerciseConfigs().length > 0}>
            <div class="mt-4 flex w-full flex-row-reverse flex-wrap justify-start gap-2">
              <button
                type="button"
                onClick={() => props.startPracticing(exerciseConfigs())}
                class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500"
              >
                <span class="icon-[heroicons--play-circle-solid] -ml-1 size-5" />
                Start Practicing
              </button>
              <button type="button" onClick={share} class="btn bg-sky-500 text-white hover:bg-sky-400">
                <span class="icon-[heroicons--share-solid] -ml-1 size-5" />
                Share
              </button>
              <button type="button" onClick={clear} class="btn btn bg-rose-600 text-white hover:bg-rose-500">
                <span class="icon-[heroicons--trash-solid] -ml-1 size-5" />
                Delete All Exercises
              </button>
            </div>
          </Show>
          <Show when={!!link()}>
            <div class="mt-4 flex w-full flex-wrap items-center justify-center gap-2">
              <label for="share-link-input" class="flex-grow-0">
                Shareable Link:
              </label>
              <input
                ref={shareLinkRef}
                readOnly={true}
                type="text"
                value={link()}
                class="flex-grow rounded border border-gray-300 bg-white p-2"
              />
              <button type="button" onClick={copyLink} class="btn w-40 bg-sky-500 text-white">
                <span ref={copyButtonContentRef}>Copy Link</span>
                <span class="icon-[heroicons--document-duplicate-solid] -mr-1 size-5" />
              </button>
            </div>
          </Show>
        </div>
      </div>
    </>
  );
}

function ExerciseConfigItem(props: { exercise: SingleExerciseConfig; onDelete: () => void }) {
  return (
    <li class="flex items-center justify-between gap-x-6 rounded bg-white px-4 py-2 shadow">
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="wrap-balance leading-6 text-gray-900">
            I will practice the{" "}
            <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
              {patterns.normal[props.exercise.pattern]?.name}
            </strong>{" "}
            on the{" "}
            <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
              {props.exercise.violinString} String
            </strong>{" "}
            with a{" "}
            <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
              {props.exercise.position} first finger
            </strong>{" "}
            for{" "}
            <strong class="whitespace-nowrap font-sans font-bold not-italic text-fuchsia-700">
              {props.exercise.numOfMeasures} measures
            </strong>
          </p>
        </div>
      </div>
      <button type="button" onClick={props.onDelete} class="btn-sm bg-rose-600  text-white hover:bg-rose-500">
        Delete
        <span class="icon-[heroicons--trash-solid] -mr-1 size-4" />
      </button>
    </li>
  );
}
