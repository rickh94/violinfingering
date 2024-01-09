type ListCheckBoxProps = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  text: string;
  key: string;
};

export default function ListCheckBox(props: ListCheckBoxProps) {
  return (
    <label
      for={props.key}
      classList={{
        "border-fuchsia-700 ring-2 ring-fuchsia-700": props.isChecked,
        "border-pink-100": !props.isChecked,
      }}
      class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
    >
      <input
        id={props.key}
        type="checkbox"
        name="strings"
        class="sr-only"
        aria-labelledby={props.key + "-label"}
        checked={props.isChecked}
        onChange={(e) => props.setIsChecked(e.currentTarget.checked)}
      />
      <span class="flex flex-1">
        <span class="flex flex-col">
          <span id={props.key + "-label"} class="block text-sm font-medium text-gray-900">
            {props.text}
          </span>
        </span>
      </span>
      <span
        class="icon-[heroicons--check-circle-solid] size-5 text-fuchsia-700"
        classList={{ invisible: !props.isChecked }}
      />
      <span
        class="pointer-events-none absolute -inset-px rounded-lg border-2"
        classList={{
          "border-fuchsia-700": props.isChecked,
          "border-pink-100": !props.isChecked,
        }}
        aria-hidden="true"
      ></span>
    </label>
  );
}
