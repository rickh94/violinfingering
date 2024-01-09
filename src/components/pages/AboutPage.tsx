import { Link } from "~/components/Link";
import { ScalePicker } from "~/components/ScalePicker";

export default function About() {
  return (
    <>
      <main class="container mx-auto px-2 font-serif">
        <header class="mb-4 mt-12 flex w-full justify-center sm:mt-8">
          <h1 class="border-b-2 border-fuchsia-600 px-2 pb-1 text-center text-xl font-bold sm:text-3xl">About</h1>
        </header>
        <div class="mx-auto flex max-w-4xl flex-col gap-4">
          <p class="mb-4 italic">About this site and me</p>
          <p>
            Hi, I'm Rick. I'm a violin teacher and developer based in South Jersey. I built this site to help violin
            students learn and practice identifying the basic finger patterns on the violin.
          </p>
          <p>
            In order to play the violin well, you must play by feel, and so it is crucial that you learn the feel of
            these different finger patterns, and learn to identify which pattern you will need for a certain set of
            notes as quickly as possible. On this site, you can find
          </p>
          <ul class="pl-4 leading-8">
            <li>
              <Link class="pb-1" href="/">
                the five basic finger patterns (on the homepage)
              </Link>
              ,
            </li>
            <li>
              <Link href="/quiz">a customizable quiz</Link> to help you practice recognizing them, and
            </li>
            <li>
              <ScalePicker text="Scales" /> with interactive diagrams.
            </li>
          </ul>
          <p>
            If you're finding this useful, I'd love to hear from you! Especially if you have any problems or find any
            mistakes or issues. You can{" "}
            <Link external href="https://rickhenry.studio/contact">
              use the contact form
            </Link>{" "}
            on my{" "}
            <Link external href="https://rickhenry.studio/">
              personal website.
            </Link>
          </p>
        </div>
        <div class="absolute left-0 top-0 p-4">
          <Link href="/">Back Home</Link>
        </div>
      </main>
    </>
  );
}
