import { type Component, type JSX } from "solid-js";

export const Link: Component<{
  href: string;
  external?: boolean;
  children: JSX.Element;
  class?: string;
  onClick?: () => void;
}> = function (props) {
  return (
    <a
      href={props.href}
      class={`rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white  ${props.class}`}
      target={props.external ? "_blank" : undefined}
      rel={props.external ? "noreferrer noopener" : undefined}
    >
      <span class="border-b-2 border-fuchsia-600 hover:text-fuchsia-800">
        {props.children}
      </span>
    </a>
  );
};
