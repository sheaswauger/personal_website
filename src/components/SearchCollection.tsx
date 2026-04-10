import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For, onMount } from "solid-js"
import Fuse from "fuse.js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"
import SearchBar from "@components/SearchBar"

type Props = {
  entry_name: string
  tags: string[]
  data: CollectionEntry<"blog">[]
}

export default function SearchCollection({ entry_name, data, tags }: Props) {
  const coerced = data;

  const [query, setQuery] = createSignal("");
  const [filter, setFilter] = createSignal(new Set<string>())
  const [collection, setCollection] = createSignal<CollectionEntry<'blog'>[]>([])
  const [descending, setDescending] = createSignal(false);

  const fuse = new Fuse(coerced, {
    keys: ["slug", "data.title", "data.description", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  })

  createEffect(() => {
    const filtered = (query().length < 2
      ? coerced
      : fuse.search(query()).map((result) => result.item)
    ).filter((entry) =>
      Array.from(filter()).every((value) =>
        entry.data.tags.some((tag: string) =>
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
    );
    setCollection(descending() ? filtered.toReversed() : filtered)
  })

  function toggleDescending() {
    setDescending(!descending())
  }

  function toggleTag(tag: string) {
    setFilter((prev) =>
      new Set(prev.has(tag)
        ? [...prev].filter((t) => t !== tag)
        : [...prev, tag]
      )
    )
  }

  function clearFilters() {
    setFilter(new Set<string>());
  }

  const onSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value)
  }

  onMount(() => {
    const wrapper = document.getElementById("search-collection-wrapper");
    if (wrapper) {
      wrapper.style.minHeight = "unset";
    }
  })

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Control Panel */}
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24 mt-7">
          <SearchBar onSearchInput={onSearchInput} query={query} setQuery={setQuery} placeholderText={`Search ${entry_name}`} />
          <div class="relative flex flex-row justify-between w-full">
            <p class="text-xs font-semibold uppercase tracking-widest my-4 text-white/40">Tags</p>
            {filter().size > 0 && (
              <button
                onClick={clearFilters}
                class="absolute flex justify-center items-center h-full w-10 right-0 top-0 text-white/30 hover:text-[#d4a8bc] transition-colors duration-200"
              >
                <svg class="size-5">
                  <use href={`/ui.svg#x`} />
                </svg>
              </button>
            )}
          </div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li class="sm:w-full">
                  <button
                    onClick={() => toggleTag(tag)}
                    class={cn(
                      "w-full px-2 py-1",
                      "flex gap-2 items-center text-sm",
                      "border border-white/10",
                      "hover:border-[#d4a8bc]/40 hover:text-[#d4a8bc]",
                      "transition-colors duration-200",
                      filter().has(tag) ? "text-[#d4a8bc] border-[#d4a8bc]/40" : "text-white/50"
                    )}
                  >
                    <svg
                      class={cn(
                        "shrink-0 size-4",
                        "transition-colors duration-200",
                        filter().has(tag) ? "fill-[#d4a8bc]" : "fill-white/30"
                      )}
                    >
                      <use
                        href={`/ui.svg#square`}
                        class={cn(!filter().has(tag) ? "block" : "hidden")}
                      />
                      <use
                        href={`/ui.svg#square-check`}
                        class={cn(filter().has(tag) ? "block" : "hidden")}
                      />
                    </svg>
                    <span class="truncate block min-w-0 pt-[2px]">
                      {tag}
                    </span>
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      {/* Posts */}
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          {/* Info Bar */}
          <div class='flex justify-between flex-row mb-2'>
            <div class="text-xs uppercase tracking-widest text-white/40">
              Showing {collection().length} of {data.length} {entry_name}
            </div>
            <button onClick={toggleDescending} class='flex flex-row gap-1 text-white/30 hover:text-[#d4a8bc] transition-colors duration-200'>
              <div class="text-xs uppercase tracking-widest">
                {descending() ? "Descending" : "Ascending"}
              </div>
              <svg class="size-4 mt-px">
                <use href={`/ui.svg#sort-descending`} class={descending() ? "block" : "hidden"}></use>
                <use href={`/ui.svg#sort-ascending`} class={descending() ? "hidden" : "block"}></use>
              </svg>
            </button>
          </div>
          <ul class="border-t border-white/[0.07]">
            {collection().map((entry) => (
              <li>
                <ArrowCard entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
