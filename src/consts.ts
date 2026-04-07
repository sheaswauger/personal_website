import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Shea Swauger",
  DESCRIPTION: "Hi there! It's nice to meet you. I'm a researcher and writer who cares about technology, public policy, and education.",
  AUTHOR: "Shea Swauger",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Personal essays and reflections.",
}

// Writing Page
export const WRITING: Page = {
  TITLE: "Writing",
  DESCRIPTION: "Academic publications and journalism.",
}

// Presentations Page
export const PRESENTATIONS: Page = {
  TITLE: "Presentations",
  DESCRIPTION: "Talks, keynotes, and panels.",
}

// Grants Page
export const GRANTS: Page = {
  TITLE: "Grants",
  DESCRIPTION: "Funding and grant history.",
}

// Press Page
export const PRESS: Page = {
  TITLE: "Press",
  DESCRIPTION: "Media coverage and podcast appearances.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and writing by keyword.",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "Writing",
    HREF: "/writing",
  },
  {
    TEXT: "Presentations",
    HREF: "/presentations",
  },
  {
    TEXT: "Grants",
    HREF: "/grants",
  },
  {
    TEXT: "Press",
    HREF: "/press",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "shea.swauger@ucdenver.edu",
    HREF: "mailto:shea.swauger@ucdenver.edu",
  },
  {
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "@SheaSwauger",
    HREF: "https://twitter.com/SheaSwauger",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "sheaswauger",
    HREF: "https://linkedin.com/in/sheaswauger",
  },
  {
    NAME: "TikTok",
    ICON: "tiktok",
    TEXT: "@shea_swauger",
    HREF: "https://tiktok.com/@shea_swauger",
  },
]
