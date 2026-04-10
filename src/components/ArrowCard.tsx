import { formatDate, readingTime } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog">
}

export default function ArrowCard({ entry }: Props) {
  return (
    <a
      href={`/${entry.collection}/${entry.slug}`}
      class="group grid grid-cols-[1fr_3rem] gap-4 items-start py-4 border-b border-white/[0.07] hover:border-[#d4a8bc]/20 transition-colors duration-300 ease-in-out"
    >
      <div>
        <div class="text-sm text-white group-hover:text-[#d4a8bc] transition-colors duration-300 ease-in-out line-clamp-2">
          {entry.data.title}
        </div>
        <div class="text-xs text-white/40 mt-0.5">
          {formatDate(entry.data.date)} &middot; {readingTime(entry.body)}
        </div>
        {entry.data.tags && entry.data.tags.length > 0 && (
          <div class="flex flex-wrap gap-1 mt-2">
            {entry.data.tags.map((tag: string) => (
              <span class="text-[9px] text-white/25 border border-white/[0.1] px-1.5 py-0.5 uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <span class="text-xs text-white/35 text-right tabular-nums mt-0.5">
        {entry.data.date.getFullYear()}
      </span>
    </a>
  )
}
