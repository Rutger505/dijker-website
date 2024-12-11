import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import clsx from "clsx";

export function FeatureImage({ className, ...all }: Readonly<ImageProps>) {
  return (
    <Image
      width={352}
      height={130}
      className={clsx(className, "max-w-xl")}
      {...all}
    />
  );
}
