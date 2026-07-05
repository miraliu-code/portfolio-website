import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

/* Gallery: large images, minimal UI — an exhibition, not a feed. */
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
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <Breadcrumbs
        crumbs={[
          { label: "Photography", href: "/photography" },
          { label: category.name, href: `/photography/${category.slug}` },
          { label: gallery.name },
        ]}
      />
      <h1 className="mt-12 font-serif text-4xl leading-tight text-information">
        {gallery.name}
      </h1>
      <p className="mt-6 max-w-xl font-serif text-base leading-[1.85] text-information/80">
        {gallery.statement}
      </p>
      <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
        {gallery.location} · {gallery.date} · {gallery.camera}
      </p>

      <div className="mt-16 space-y-16">
        {gallery.images.map((image) => (
          <figure key={image.src + image.caption}>
            {/* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */}
            <img
              src={image.src}
              alt={image.caption}
              className="w-full border border-structure/10"
            />
            <figcaption className="mt-3 font-sans text-xs tracking-wide text-information/50">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
