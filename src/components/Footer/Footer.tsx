"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { XLogo } from "@/components/icons/XLogo";
import { FacebookLogo } from "@/components/icons/FacebookLogo";
import { LinkedInLogo } from "@/components/icons/LinkedInLogo";
import { TwitterLogo } from "@/components/icons/TwitterLogo";

export function Footer() {
  const pathname = usePathname();
  const [shareUrls, setShareUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const title = document.title;
    const url = window.location.href;

    setShareUrls({
      Email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      X: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      Twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    });
  }, [pathname]);

  const shareLinks = [
    // { name: "Email", icon: Mail({ className: "h-4 w-4" }) },
    { name: "Facebook", icon: FacebookLogo({ className: "h-4 w-4" }) },
    { name: "X", icon: XLogo({ className: "h-4 w-4" }) },
    { name: "Twitter", icon: TwitterLogo({ className: "h-4 w-4" }) },
    { name: "LinkedIn", icon: LinkedInLogo({ className: "h-5 w-5" }) },
  ];

  return (
    <footer className={"bg-gray flex items-center justify-center p-10"}>
      <ul className="flex gap-5">
        {shareLinks.map(({ name, icon }) => (
          <li key={name}>
            <Link
              href={shareUrls[name] || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title={name}
            >
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
