import { Menu } from "@ark-ui/solid";
import { ScalePicker } from "./ScalePicker";
import { Link } from "./Link";

export default function Nav() {
  return (
    <div class="fixed right-0 top-0 z-10 mr-4 mt-2">
      <Menu.Root>
        <Menu.Trigger class="flex gap-1 rounded p-1 text-black focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white">
          Menu
          <span class="icon-[heroicons--bars-3-solid] size-6 text-fuchsia-600"></span>
          <div class="sr-only">Open Nav Menu</div>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content class="z-30 w-56 origin-top-right rounded-lg bg-white px-2 pb-4 pt-2 shadow-md focus:outline-none">
            <div class="flex h-full flex-col gap-y-2">
              <Menu.Item
                id="scales"
                class="flex justify-end focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-700 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
              >
                <ScalePicker text="Scales" />
              </Menu.Item>
              <Menu.Item id="quiz" class="flex justify-end">
                <Link href="/quiz">Test Your Knowledge</Link>
              </Menu.Item>
              <Menu.Item id="practice" class="flex justify-end">
                <Link href="/practice">Practice Playing</Link>
              </Menu.Item>
              <Menu.Item id="about" class="flex justify-end">
                <Link href="/about">About</Link>
              </Menu.Item>
            </div>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </div>
  );
}
