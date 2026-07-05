import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  photoCategories,
  getPhotoCategory,
  getGalleries,
} from "@/lib/content/photography";

export function generateStaticParams() {
  return photoCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = getPhotoCategory(category);
  return { title: meta ? `${meta.name} · Photography` : "Photography" };
}

export default async function PhotoCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getPhotoCategory(slug);
  if (!category) notFound();
  const galleries = getGalleries(slug);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <Breadcrumbs
        crumbs={[
          { label: "Photography", href: "/photography" },
          { label: category.name },
        ]}
      />
      <h1 className="mt-12 font-serif text-4xl leading-tight text-information">
        {category.name}
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-information/70">
        {category.description}
      </p>
      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2">
        {galleries.map((gallery) => (
          <Link
            key={gallery.slug}
            href={`/photography/${slug}/${gallery.slug}`}
            className="group block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */}
            <img
              src={gallery.images[0]?.src}
              alt=""
              className="aspect-[3/2] w-full border border-structure/10 object-cover"
            />
            <h2 className="mt-5 font-serif text-xl text-information transition-colors group-hover:text-interaction">
              {gallery.name}
            </h2>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
              {gallery.location} · {gallery.date}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
