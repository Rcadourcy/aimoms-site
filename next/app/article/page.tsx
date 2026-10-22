import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Article } from '@/lib/articles-data';
import { getArticleById, getAllArticles } from '@/lib/articles';
import ArticleView from '@/components/ArticleView';
import '../article.css';

type SearchParams = Promise<{ id?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { id } = await searchParams;
  const article = id ? await getArticleById(id) : null;
  if (!article) {
    return { title: 'The Edit — ai moms™', description: 'AI-powered insights for mothers.' };
  }
  return {
    title: `${article.title} — The Edit | ai moms™`,
    description: article.subtitle,
    alternates: { canonical: `/article?id=${article.id}` },
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: 'article',
      images: ['https://aimoms.ai/og-share.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle,
    },
  };
}

/** Pick up to 2 related articles: same category first, then fill from the rest (in order). */
function relatedFor(article: Article, all: Article[]): Article[] {
  const ids = all
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 2);
  if (ids.length < 2) {
    for (const a of all) {
      if (ids.length >= 2) break;
      if (a.id !== article.id && !ids.some((x) => x.id === a.id)) ids.push(a);
    }
  }
  return ids;
}

export default async function ArticlePage({ searchParams }: { searchParams: SearchParams }) {
  const { id } = await searchParams;
  const article = id ? await getArticleById(id) : null;

  // No id / unknown id → back to the editorial index, matching the static site.
  if (!article) redirect('/editorial');

  const all = await getAllArticles();

  return (
    <div className="page-article">
      <ArticleView article={article} related={relatedFor(article, all)} />
    </div>
  );
}
