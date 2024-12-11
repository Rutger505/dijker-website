import { useTranslations } from "next-intl";
import Image from "next/image";
import { FeatureImage } from "@/components/Features/FeatureImage";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <main className={"mx-auto w-full max-w-screen-2xl space-y-20 p-20"}>
      <section className={"space-y-20"}>
        <div className={"flex flex-wrap gap-20"}>
          <div className={"space-y-5"}>
            <h1 className={"text-5xl font-semibold"}>{t("title")}</h1>
            <p className={"max-w-md font-semibold"}>{t("section1")}</p>
            <p className={"max-w-md font-semibold text-text-secondary"}>
              {t("section2")}
            </p>
          </div>

          <div className={"aspect-video min-h-72 max-w-xl grow"}>
            <div className={"aspect-video"}>
              <iframe
                className={"h-full w-full"}
                src="https://www.youtube.com/embed/m3ZI0HB3BCs?si=daGCnNEEwgGR0P8u"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </div>
        </div>

        <Image
          src={"/design.webp"}
          alt="design"
          className={"max-w-xl"}
          width={600}
          height={800}
        />
      </section>
      <section className={"space-y-20"}>
        <FeatureImage src={"/features/boot.webp"} alt={"boot"} />
        <FeatureImage src={"/features/comfort.webp"} alt={"comfort"} />
        <FeatureImage src={"/features/fast.webp"} alt={"fast"} />
        <FeatureImage src={"/features/free.webp"} alt={"free"} />
        <FeatureImage src={"/features/protects.webp"} alt={"protects"} />
      </section>
    </main>
  );
}
