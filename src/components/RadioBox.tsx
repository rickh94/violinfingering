type RadioBoxProps = {
  key?: string;
  value: string | number;
  text: string;
  name: string;
  checked: boolean;
  setChecked: () => void;
};

export default function RadioBox(props: RadioBoxProps) {
  const id = () => props.key ?? `${props.name}-${props.value}`;
  return (
    <label
      for={id()}
      class="relative flex cursor-pointer items-center justify-center rounded-lg border bg-white p-3 shadow-sm focus:outline-none"
      classList={{
        "border-fuchsia-700 ring-2 ring-fuchsia-700": props.checked,
        "border-pink-100": !props.checked,
      }}
    >
      <input
        type="radio"
        name={props.name}
        id={id()}
        value={props.value}
        class="sr-only"
        checked={props.checked}
        onChange={(e) => e.currentTarget.checked && props.setChecked()}
        aria-labelledby={`${id}-label`}
      />
      <span class="flex flex-1">
        <span class="flex-col">
          <span class="block text-sm font-medium text-gray-900" id={`${id()}-label`}>
            {props.text}
          </span>
        </span>
      </span>
      <span
        class="icon-[heroicons--check-circle-solid] -mr-1 size-5 text-fuchsia-700"
        classList={{
          invisible: !props.checked,
        }}
      />
      <span
        class="pointer-events-none absolute -inset-px rounded-lg border-2"
        classList={{
          "border-fuchsial-700": props.checked,
          "border-pink-100": !props.checked,
        }}
        aria-hidden="true"
      />
    </label>
  );
}
