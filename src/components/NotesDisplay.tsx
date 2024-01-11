import ABCJS, { type AbcElem } from "abcjs";
import { createEffect } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import type { ActiveFinger, ViolinString } from "~/common/patterns";

type NotesDisplayProps = {
  notes: string;
  offset: number;
  disabled?: boolean;
  wrap?: {
    minSpacing: number;
    maxSpacing: number;
    preferredMeasuresPerLine: number;
  };
  staffwidth?: number;
  responsive?: "resize";
  activeFinger?: ActiveFinger;
  setActiveFinger?: SetStoreFunction<ActiveFinger>;
};

function calculateOffsetFromString(vs: ViolinString | null) {
  switch (vs) {
    case "G":
      return 0;
    case "D":
      return 1;
    case "A":
      return 2;
    case "E":
      return 3;
    case null:
      return 0;
  }
}

function calculateViolinStringFromOffset(offset: number) {
  switch (offset) {
    case 0:
      return "G";
    case 1:
      return "D";
    case 2:
      return "A";
    case 3:
      return "E";
    default:
      return null;
  }
}

function hash(s: string) {
  let i: number, h: number;
  for (i = 0, h = 0xdeadbeef; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
  }
  return (h ^ (h >>> 16)) >>> 0;
}

export default function NotesDisplay(props: NotesDisplayProps) {
  const notesId = () => `notes-${hash(props.notes)}`;

  function onNoteClick(abcElem: AbcElem) {
    if (props.disabled) {
      return;
    }
    if (!props.setActiveFinger) {
      return;
    }
    for (const el of abcElem.abselem.elemset) {
      if (!el.classList.contains("abcjs-note")) {
        continue;
      }
      const regex = /abcjs-n(\d+)/;
      const match = regex.exec(el.className.baseVal);
      if (!match?.[1]) {
        return;
      }
      const noteIdx = parseInt(match[1], 10);

      let vsOffset = Math.floor((noteIdx + props.offset) / 4);
      let fingerNumber = (noteIdx + props.offset) % 4;
      if (fingerNumber === 0) {
        vsOffset--;
        fingerNumber = 4;
      } else if (fingerNumber > 4) {
        return;
      }
      if (vsOffset < 0 || vsOffset > 3) {
        props.setActiveFinger({ violinString: null, finger: null });

        for (const el of document.querySelectorAll(`#${notesId()} .abcjs-note_selected`)) {
          el.classList.remove("abcjs-note_selected");
        }
        el.classList.add("abcjs-note_selected");
        return;
      }
      const vs = calculateViolinStringFromOffset(vsOffset);
      props.setActiveFinger({ violinString: vs, finger: fingerNumber });
    }
  }

  createEffect(() => {
    ABCJS.renderAbc(notesId(), props.notes, {
      scale: 1.1,
      add_classes: true,
      clickListener: onNoteClick,
      paddingleft: 2,
      paddingright: 2,
      paddingbottom: 8,
      paddingtop: 2,
      wrap: props.wrap,
      staffwidth: props.staffwidth,
      responsive: props.responsive,
    });
  });

  createEffect(() => {
    if (!props.activeFinger?.violinString || !props.activeFinger?.finger) {
      return;
    }
    const violinStringOffset = calculateOffsetFromString(props.activeFinger?.violinString);
    const noteNumber = violinStringOffset * 4 + props.activeFinger.finger - props.offset;
    for (const el of document.querySelectorAll(`#${notesId()} .abcjs-note_selected`)) {
      el.classList.remove("abcjs-note_selected");
    }
    const nextNote = document.querySelector(`#${notesId()} .abcjs-n${noteNumber}`);
    if (!nextNote) {
      return;
    }
    nextNote.classList.add("abcjs-note_selected");
  });

  return <div class="notes -pl-2" id={notesId()}></div>;
}
