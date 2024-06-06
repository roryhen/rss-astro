import { onMount } from "solid-js";
import { Storage, setStorage } from "../lib/storage";
import { AddFeed } from "./AddFeed";
import { FeedList } from "./FeedList";

export const Dashboard = () => {
  onMount(() => {
    setStorage({storage: new Storage()})
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <AddFeed />
      <h2>Feeds</h2>
      <FeedList />
    </div>
  );
};
