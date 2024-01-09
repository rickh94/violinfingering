import { patterns } from '~/common/patterns';
import { type SingleExerciseConfig } from './common';
import { For } from 'solid-js';

type PracticeFinishedProps = {
  restart: () => void;
  regenerate: () => void;
  reconfigure: () => void;
  exerciseConfigs: SingleExerciseConfig[];
};
export default function PracticeFinished(props: PracticeFinishedProps) {
  return (
    <div class="mx-auto flex max-w-3xl flex-col gap-4">
      <h2 class="my-4 text-center text-4xl font-bold">Great Job!</h2>
      <p class="mb-2 text-lg">
        Great Job Practicing your finger patterns. Select one of the options below to practice the same exercises again,
        create new exercises for the same set of patterns, or choose new patterns to practice.
      </p>
      <div class="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <button type="button" onClick={props.restart} class="btn bg-emerald-600 text-white hover:bg-emerald-500">
          <span class="icon-[heroicons--arrow-path-solid] -ml-1 size-5" />
          Same Exercises
        </button>
        <button type="button" onClick={props.regenerate} class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500">
          <span class="icon-[heroicons--hand-raised-solid] -ml-1 size-5" />
          Same Patterns
        </button>
        <button type="button" onClick={props.reconfigure} class="btn bg-amber-600 text-white hover:bg-amber-500">
          <span class="icon-[heroicons--cog-solid] -ml-1 size-5" />
          Pick New Patterns
        </button>
      </div>
      <h3 class="text-xl font-bold">Patterns Practiced</h3>
      <ul class="flex list-none flex-col gap-2">
        <For each={props.exerciseConfigs}>
          {exercise => (
            <li class="flex items-center justify-between gap-x-6 rounded bg-white px-4 py-2 shadow">
              <div class="flex min-w-0 gap-x-4">
                <div class="min-w-0 flex-auto">
                  <p class="wrap-balance leading-6 text-gray-900">
                    <strong class="text-pretty font-sans font-bold not-italic text-fuchsia-700">
                      {patterns.normal[exercise.pattern]?.name}
                    </strong>{' '}
                    on the{' '}
                    <strong class="text-pretty font-sans font-bold not-italic text-fuchsia-700">
                      {exercise.violinString} String
                    </strong>{' '}
                    in the{' '}
                    <strong class="text-pretty font-sans font-bold not-italic text-fuchsia-700">
                      {exercise.position} position
                    </strong>
                  </p>
                </div>
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
