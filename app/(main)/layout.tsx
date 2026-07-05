import { PersistentPanel } from "@/components/persistent-panel";
import { TopNav } from "@/components/top-nav";

/* Standard chrome: the persistent Blue Ink panel and top navigation.
   The About page lives outside this group and deliberately omits both. */
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PersistentPanel />
      <div className="flex flex-1 flex-col lg:mr-72">
        <TopNav />
        {children}
      </div>
    </>
  );
}
