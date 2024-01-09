import { patterns } from "~/common/patterns";
import { FingerDisplay } from "../FingerDisplay";
import { type SingleExerciseConfig } from "./common";
import { Show } from "solid-js";
import NotesDisplay from "~/components/NotesDisplay";

export type PracticeDisplayProps = {
  currExercise?: string;
  currExerciseConfig?: SingleExerciseConfig;
  finish: () => void;
  reconfigure: () => void;
  currentExerciseIdx: number;
  hasNextExercise: boolean;
  nextExercise: () => void;
  prevExercise: () => void;
  hasPrevExercise: boolean;
};

export default function PracticeDisplay(props: PracticeDisplayProps) {
  if (!props.currExercise || !props.currExerciseConfig) {
    return <p>Something went wrong</p>;
  }
  return (
    <Show when={!!props.currExercise && !!props.currExerciseConfig} fallback={<p>Something went wrong</p>}>
      <h2 class="text-lg leading-6 text-gray-900">
        Practicing the{" "}
        <strong class="font-sans font-bold text-fuchsia-700">
          {patterns.normal[props.currExerciseConfig.pattern]?.name}
        </strong>{" "}
        on the{" "}
        <strong class="font-sans font-bold text-fuchsia-700">{props.currExerciseConfig.violinString} String</strong> in
        the <strong class="font-sans font-bold text-fuchsia-700">{props.currExerciseConfig.position} position</strong>{" "}
        for {props.currExerciseConfig.numOfMeasures} measures
      </h2>
      <div class="flex w-full items-center justify-center">
        <FingerDisplay
          radius={2}
          widths={patterns[props.currExerciseConfig.position][props.currExerciseConfig.pattern]?.widths ?? [4, 4, 4, 4]}
          disabled={true}
        />
      </div>
      <NotesDisplay
        notes={props.currExercise ?? ""}
        offset={0}
        disabled={true}
        wrap={{
          minSpacing: 1.4,
          maxSpacing: 2.7,
          preferredMeasuresPerLine: 4,
        }}
        responsive="resize"
        staffwidth={720}
      />
      <div class="mt-4 flex w-full items-center justify-between gap-x-2">
        {props.hasPrevExercise ? (
          <button
            type="button"
            onClick={() => props.prevExercise()}
            class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500"
          >
            <span class="icon-[heroicons--chevron-left-solid] -ml-1 size-5" />
            Previous
          </button>
        ) : (
          <button type="button" disabled={true} class="btn bg-gray-600 text-white">
            <span class="icon-[heroicons--chevron-left-solid] -ml-1 size-5" />
            Previous
          </button>
        )}
        <div class="flex justify-center">
          <button
            type="button"
            onClick={() => props.reconfigure()}
            class="btn bg-amber-600 text-white hover:bg-amber-500"
          >
            <span class="icon-[heroicons--cog-solid] -ml-1 size-5" />
            Setup
          </button>
        </div>
        {props.hasNextExercise ? (
          <button
            type="button"
            onClick={() => props.nextExercise()}
            class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500"
          >
            Next
            <span class="icon-[heroicons--chevron-right-solid] -mr-1 size-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => props.finish()}
            class="btn bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Finish
            <span class="icon-[heroicons--check-solid] -mr-1 size-5" />
          </button>
        )}
      </div>
    </Show>
  );
}
