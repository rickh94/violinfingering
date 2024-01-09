import { For } from "solid-js";
import { patterns } from "~/common/patterns";
import { Link } from "~/components/Link";
import { PatternCard } from "~/components/PatternCard";
import { ScalePicker } from "~/components/ScalePicker";

export default function Home() {
  return (
    <>
      <div class="container mx-auto px-2 pt-2 font-serif">
        <header class="mb-4 mt-12 flex w-full justify-center sm:mt-8">
          <h1 class="border-b-2 border-fuchsia-600 px-2 pb-1 text-xl font-bold sm:text-3xl">Violin Finger Patterns</h1>
        </header>
        <div class="sm:mx-auto sm:max-w-4xl">
          <p class="mb-4 px-2">
            Here are the five basic finger patterns on the violin. Click one to read more about each one,{" "}
            <ScalePicker text="Learn a Scale" /> or <Link href="/practice">Create Some Exercises</Link> to see how they
            work in action, or <Link href="/quiz">Quiz Yourself</Link>.
          </p>
        </div>
        <div class="mx-auto grid grid-cols-1 gap-4 sm:max-w-4xl sm:grid-cols-2">
          <For each={Object.entries(patterns.normal)}>
            {([key, pattern]) => <PatternCard patternId={key} pattern={pattern} />}
          </For>
        </div>
      </div>
    </>
  );
}
