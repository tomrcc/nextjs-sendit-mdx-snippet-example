# Sendit

Blog posts on this demo use `.mdx` pages for the blog posts and are set up to allow [Snippets](https://cloudcannon.com/documentation/articles/snippets-using-mdx-components/) amongst the body content on those pages.

`@next/mdx` does not support frontmatter by default, but we use `next-mdx-remote` to allow it in this demo, and also support the importing of components to use as Snippets.

Most of the logic for this lives in `pages/blog/[slug].jsx`, and an example Snippet lives on the page `content/posts/email-delivery-tips.mdx`.

- [next-mdx-remote](https://www.npmjs.com/package/next-mdx-remote)
  
- [next/mdx frontmatter](https://nextjs.org/docs/app/guides/mdx#frontmatter)

## Adding new snippets

1. Add the snippet to the `cloudcannon.config.yaml` following the format of the placeholder ones
2. Add the snippet import to `pages/blog/[slug].jsx`, and add it to the `components` object, which passes it to the `mdx` pages in the blog section to be used.

## Develop

Sendit is built with [Next.js](https://nextjs.org/) (version `13.0.4`).

~~~bash
$ npm install
$ npm run dev
~~~
