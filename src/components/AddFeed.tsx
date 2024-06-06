import { Show, createSignal } from "solid-js";
import { addFeed } from "../lib/feeds";
import { storage } from "../lib/storage";

export const AddFeed = () => {
  const [status, setStatus] = createSignal("");
  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    setStatus("");
    const formData = new FormData(e.target as HTMLFormElement);
    const url = String(formData.get("feed-url"));
    if (url) {
      addFeed.post({ url }).then((res) => {
        if ("data" in res) {
          storage.storage!.addSource(res.data.source);
          setStatus("Feed added successfully");
        }
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" name="feed-url" />
      <button>Add</button>
      <Show when={status()}>
        {(status) => <p>{status()}</p>}
      </Show>
    </form>
  );
};
