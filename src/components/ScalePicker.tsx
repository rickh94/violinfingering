import { Dialog } from "@ark-ui/solid";
import { type Component, For, Match, Switch, createSignal, mergeProps } from "solid-js";
import { Link } from "./Link";
import { Portal } from "solid-js/web";
import scales, { type Scale } from "../common/scales";

type Tab = {
  name: string;
  id: string;
};

const TABS: Tab[] = [
  { name: "Major", id: "major" },
  { name: "Natural Minor", id: "minor" },
  { name: "Melodic Minor", id: "melodic" },
];

export const ScalePicker: Component<{ text: string; isHeading?: boolean }> = function (props) {
  const [currentTabId, setCurrentTabId] = createSignal(TABS[0]!.id);
  const merged = mergeProps({ isHeading: false }, props);

  return (
    <Dialog.Root>
      <Dialog.Trigger class="m-0 inline rounded p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
        <span
          class="border-b-2 border-fuchsia-600 hover:text-fuchsia-800"
          classList={{ "text-2xl sm:text-3xl font-bold": merged.isHeading }}
        >
          {merged.text}
        </span>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop class="overlay fixed inset-0 z-20 bg-fuchsia-200 bg-opacity-60 backdrop-blur" />
        <Dialog.Positioner class="fixed inset-0 z-30 overflow-y-auto">
          <div class="flex min-h-full w-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Content class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6">
              <div class="relative z-50 flex w-full items-center justify-between">
                <Dialog.Title class="text-2xl font-bold">Scales</Dialog.Title>
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
                      {tab => (
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
                        {tab => (
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
                <nav class="relative z-50 mx-auto mt-4 grid w-full grid-cols-2 gap-y-4 text-left">
                  <Switch fallback={<div>Error</div>}>
                    <Match when={currentTabId() === "major"}>
                      <MajorScales />
                    </Match>
                    <Match when={currentTabId() === "minor"}>
                      <MinorScales />
                    </Match>
                    <Match when={currentTabId() === "melodic"}>
                      <MelodicScales />
                    </Match>
                  </Switch>
                </nav>
              </Dialog.Description>
            </Dialog.Content>
          </div>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const MajorScales: Component = function () {
  return (
    <For each={scales}>
      {(scale: Scale) => scale.mode == "major" && <Link href={`/scales/${scale.key}/${scale.mode}`}>{scale.name}</Link>}
    </For>
  );
};

function MinorScales() {
  return (
    <For each={scales}>
      {scale => <>{scale.mode == "minor" && <Link href={`/scales/${scale.key}/${scale.mode}`}>{scale.name}</Link>}</>}
    </For>
  );
}

function MelodicScales() {
  return (
    <For each={scales}>
      {scale => <>{scale.mode == "melodic" && <Link href={`/scales/${scale.key}/${scale.mode}`}>{scale.name}</Link>}</>}
    </For>
  );
}
