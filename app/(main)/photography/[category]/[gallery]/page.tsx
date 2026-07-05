import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  galleries,
  getGallery,
  getPhotoCategory,
} from "@/lib/content/photography";

export function generateStaticParams() {
  return galleries.map((g) => ({ category: g.category, gallery: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; gallery: string }>;
}): Promise<Metadata> {
  const { category, gallery } = await params;
  const g = getGallery(category, gallery);
  return { title: g ? `${g.name} · Photography` : "Photography" };
}

/* Gallery: title, a short statement, then just the photographs. */
export default async function GalleryPage({
  params,
}: {
  params: Promise<{ category: string; gallery: string }>;
}) {
  const { category: categorySlug, gallery: gallerySlug } = await params;
  const category = getPhotoCategory(categorySlug);
  const gallery = getGallery(categorySlug, gallerySlug);
  if (!category || !gallery) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
      <Breadcrumbs
        crumbs={[
          { label: "Photography", href: "/photography" },
          { label: category.name, href: `/photography/${category.slug}` },
          { label: gallery.name },
        ]}
      />
      <div>
        <BackLink
          href={`/photography/${category.slug}`}
          label={`Back to ${category.name}`}
        />
      </div>
      <h1 className="mt-6 font-serif text-4xl leading-tight text-information">
        {gallery.name}
      </h1>
      <p className="mt-5 max-w-xl font-serif text-base leading-relaxed text-information/75">
        {gallery.statement}
      </p>

      <div className="mt-14 columns-2 gap-5 md:columns-3">
        {gallery.images.map((image, i) => (
          /* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */
          <img
            key={i}
            src={image.src}
            alt={image.caption}
            className="mb-5 w-full break-inside-avoid"
          />
        ))}
      </div>
    </main>
  );
}
