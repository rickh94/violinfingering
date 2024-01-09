import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { For, createSignal, createUniqueId } from "solid-js";
import { createStore } from "solid-js/store";

export default function AhhhPage() {
  const [items, setItems] = createStore<string[]>([]);

  const [parent] = createAutoAnimate();

  function addItem() {
    const item = createUniqueId();
    setItems([...items, `item-${item}`]);
  }
  return (
    <div>
      <button onClick={addItem} class="btn bg-fuchsia-600 text-white hover:bg-fuchsia-500">
        Add Item
      </button>
      <ul ref={parent}>
        <For each={items}>{item => <li>{item}</li>}</For>
      </ul>
    </div>
  );
}
