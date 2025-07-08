# Sendit

Blog posts on this demo use `.mdx` pages for the blog posts and are set up to allow [Snippets](https://cloudcannon.com/documentation/articles/snippets-using-mdx-components/) amongst the body content on those pages.

@next/mdx does not support frontmatter by default, but we use `next-mdx-remote` to allow it in this demo, and also support the importing of components to use as Snippets.

Most of the logic for this lives in `pages/blog/[slug].jsx`, and an example Snippet lives on the page `content/posts/email-delivery-tips.mdx`.

## Develop

Sendit is built with [Next.js](https://nextjs.org/) (version `13.0.4`).

~~~bash
$ npm install
$ npm run dev
~~~
