import DefaultLayout from '../../components/layouts/default';
import Filer from '@cloudcannon/filer';
import PostSummary from '../../components/posts/summary';
import data from '../../lib/data';
import { ArticleJsonLd } from 'next-seo';
const filer = new Filer({ path: 'content' });
const { DateTime } = require("luxon");
import * as fs from 'node:fs';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import ButtonSnippet from '../../components/snippets/button'
import allComponents from '../../components/snippets/**/*.*';


const components = { ButtonSnippet }
console.log({components})

console.log({allComponents})

// let componentsAutoImporting = {}
// const allComponentKeys = Object.keys(allComponents);
// allComponentKeys.map((componentKey) => {
// 	const componentFunction = allComponents[componentKey].default ?? allComponents[componentKey]
// 	const functionName = componentFunction.name;

// 	componentsAutoImporting[functionName] = componentFunction
// })

// console.log({componentsAutoImporting})

export default function Post({ page, posts, mdxSource }) {
	const wordCount = page.content.split(" ").length;
	const readingTime  = Math.floor(wordCount / 183)

	return (
		<DefaultLayout page={page}>
			<ArticleJsonLd
				type="BlogPosting"
				url={`${data.site.baseurl}${page.data.seo?.canonical_url || page.slug}`}
				title={page.data.title}
				images={[page.data.seo?.featured_image || page.data.featuredImg.image || null]}
				datePublished={page.data.date}
				dateModified={page.data.date}
				authorName={page.data.author}
				description={page.data.seo?.page_description}
			/>
			<section className="blog-details">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<article className="blog-single">
							<div className="inner-blog-details">
								<h2 className="w-xxl-70 w-xl-80 w-100">{page.data.title}</h2>
								<div className="inner-blog-details-meta">
									<ul className="list-unstyled">
										<li className="list-inline-item">
										<p>{DateTime.fromISO(page.data.date, 'string').toLocaleString(DateTime.DATE_FULL)}</p>
										</li>
										<li className="list-inline-item">
											<p>{ page.data.author}</p>
										</li>
										<li className="list-inline-item">
											<p>{ readingTime } <span>minutes read</span></p>
										</li>
										<li className="list-inline-item">
											<p>{ wordCount } <span>words</span></p>
										</li>
									</ul>
								</div>
							</div>
							<MDXRemote {...mdxSource} components={components} />
							<div className="rounded-box mb-xxl-11 mb-8">
								<img
									src={page.data.featuredImg.image}
									className="w-100"
									alt={page.data.featuredImg.image_alt}
								/>
							</div>
						</article>
					</div>
				</div>
			</div>
			</section>

			<section className="blog-related position-relative">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="blog-section">
						<h2 className="blog-section-title">Recent Blog</h2>
						</div>
					</div>
				</div>
				<div className="row">
					{posts.map((post, i) => (
						<PostSummary post={post} key={i}></PostSummary>
					))}
				</div>
			</div>
			</section>
		</DefaultLayout>
	);
}

export async function getStaticPaths() {
	const slugs = (await filer.listItemSlugs('posts')).map((slug) => ({ params: { slug } }));
	const ignored = {
	};

	return {
		paths: slugs.filter(({ params }) => !ignored[params.slug]),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const page = await filer.getItem(`${params.slug}.mdx`, { folder: 'posts' });
	const paginatedPosts = await filer.getPaginatedItems('posts', { sortKey: 'date', pagination: {size: 3, page: 1} });
	const mdxText = fs.readFileSync(`content/posts/${params.slug}.mdx`);
	const mdxSource = await serialize(mdxText, { parseFrontmatter: true })

	return {
		props: {
			page: {data: mdxSource.frontmatter, content: page.content},
			posts: JSON.parse(JSON.stringify(paginatedPosts.data)),
			mdxSource,
		}
	};
}
