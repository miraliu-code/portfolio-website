import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { ResumeLibrary } from "@/components/resume-library";

export const metadata: Metadata = { title: "Resume Library" };

export default function ResumesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>Resume Library</SectionLabel>
      <h1 className="mt-8 font-serif text-4xl leading-tight text-information">
        Four resumes, four conversations.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        The work is the same body; the emphasis changes. Each resume is
        tailored to a different kind of role — choose the one that matches the
        conversation you&apos;d like to have.
      </p>
      <div className="mt-14">
        <ResumeLibrary />
      </div>
    </main>
  );
}
