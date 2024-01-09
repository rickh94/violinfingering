import { For } from "solid-js";
import type { Scale } from "~/common/scales";
import NotesDisplay from "~/components/NotesDisplay";
import { FingerDisplay } from "../FingerDisplay";
import { createStore } from "solid-js/store";
import type { ActiveFinger } from "~/common/patterns";

type ScalePageProps = {
  scale: Scale;
};

export default function ScalePage(props: ScalePageProps) {
  const [activeFinger, setActiveFinger] = createStore<ActiveFinger>({ violinString: null, finger: null });
  return (
    <div class="mx-auto flex max-w-4xl flex-col">
      <p class="mb-4 italic">
        This shows all the finger patterns for all the strings and the notes of the {props.scale.name} scale. If
        clicking on a finger doesn't highlight a note, it's either an open G or not in the scale.
      </p>
      <div class="flex w-full justify-center rounded-lg bg-white p-4 shadow">
        <NotesDisplay
          activeFinger={activeFinger}
          setActiveFinger={setActiveFinger}
          notes={props.scale.notes}
          offset={props.scale.offset}
        />
      </div>
      <div class="mx-auto mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
        <For each={props.scale.patterns}>
          {(pattern) => (
            <div
              class="flex flex-col justify-center rounded-lg px-6 py-4"
              classList={{
                "bg-zinc-50 shadow-sm shadow-black/20": activeFinger.violinString !== pattern.violinString,
                "bg-white shadow shadow-fuchsia-500": activeFinger.violinString === pattern.violinString,
              }}
            >
              <h2 class="text-xl">
                <span
                  class="font-bold transition-all duration-200"
                  classList={{
                    "text-fuchsia-700": activeFinger.violinString === pattern.violinString,
                  }}
                >
                  {pattern.violinString} String
                </span>{" "}
                — <em class="italic">{pattern.pattern.name}</em>
              </h2>
              <FingerDisplay
                violinString={pattern.violinString}
                activeFinger={activeFinger}
                setActiveFinger={setActiveFinger}
                radius={2}
                widths={pattern.pattern.widths}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
