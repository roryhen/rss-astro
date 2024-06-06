import { For, type Component, onMount, createSignal, createEffect } from "solid-js";
import { setStorage, storage } from "../lib/storage";
import type { FeedSource } from "../lib/feeds";

export const FeedList: Component = (props) => {
  const [sources, setSources] = createSignal<FeedSource[]>([]);
  onMount(() => {
    storage.storage!
      .getSources()
      .then((sources) => setSources(sources || []));
  });

  return (
    <ul>
      <For each={sources()}>
        {(source) => (
          <li>
            <h3>{source.title}</h3>
            <p>
              <a href={source.link}>{source.link}</a>
            </p>
          </li>
        )}
      </For>
    </ul>
  );
};
