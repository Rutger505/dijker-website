import { Landing } from "@/components/Landing";

export default function HomePage() {
  return (
    <main
      className={
        "mx-auto w-full max-w-screen-2xl space-y-20 p-6 sm:p-10 md:p-20"
      }
    >
      <Landing />
    </main>
  );
}
