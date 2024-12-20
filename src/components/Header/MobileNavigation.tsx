"use client";

import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@/i18n/routing";
import clsx from "clsx";
import { ReactNode, useEffect } from "react";

type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  navItems: NavItem[];
  localeSwitcher: ReactNode;
};

export function MobileNavigation({
  navItems,
  localeSwitcher,
}: Readonly<MobileNavProps>) {
  const [opened, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    if (opened) {
      // When dropdown opens, disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // When dropdown closes, re-enable scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [opened]);

  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        color="white"
        className="lg:hidden"
      />

      <div
        className={clsx(
          "absolute left-0 top-0 flex h-[calc(100vh-80px)] w-screen flex-col overflow-y-scroll bg-primary",
          "-z-10 transition-all duration-100 ease-in-out",
          opened
            ? "translate-y-20 opacity-100"
            : "pointer-events-none translate-y-16 opacity-0",
        )}
      >
        {navItems.map((item) => (
          <Link
            className="p-6 text-center font-semibold text-white hover:opacity-80"
            key={item.href}
            href={item.href}
            onClick={close}
          >
            {item.label}
          </Link>
        ))}

        <div className="flex justify-center p-6 text-center text-2xl font-semibold text-white hover:opacity-80">
          {localeSwitcher}
        </div>
      </div>
    </>
  );
}
