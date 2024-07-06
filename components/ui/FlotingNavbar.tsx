"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import MagicButton from "./MagicButton";
import { navItems } from "@/data";

export const FloatingNav = () => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <div className="relative">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-[13px] dark:bg-gradient-to-l dark:to-[#04071D] dark:from-[#0C0E23] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000]"
          )}
        >
          <span className="absolute inset-x-0 max-w-16 mx-auto  z-50 -bottom-px bg-gradient-to-r from-transparent via-blue-100 to-transparent h-px" />
          <span
            className={`flex space-x-4 h-full w-full rounded-[13px] dark:bg-gradient-to-l dark:to-[#04071D] dark:from-[#0C0E23] backdrop-blur-3xl py-2 px-4 items-center justify-center`}
          >
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-white-200 items-center flex space-x-1 dark:hover:text-neutral-100"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="block text-sm">{navItem.name}</span>
              </Link>
            ))}
            <Link href={"#contact"}>
              <MagicButton
                buttonText="Contact"
                className="dark:text-white-200 dark:hover:text-neutral-100 text-sm lg:text-sm py-[6px] px-4 md:py-2 md:px-4"
              />
            </Link>
          </span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
