"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="mx-auto flex max-w-7xl items-end justify-between px-5 pb-8 pt-10 sm:px-8">
      <div>
        <p className="eyebrow mb-2">دفتر جلد یکم — بازار زنده</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
          دفتر
        </h1>
        <p className="mt-1 max-w-md text-sm text-paper-dim">
          ثبت زنده‌ی قیمت دارایی‌های دیجیتال، برداشت‌شده از بازار و به‌روزرسانی‌شده هر
          سی ثانیه
        </p>
      </div>
      <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
        <span className="eyebrow">ساعت محلی</span>
        <span className="font-mono text-sm tabular text-paper-dim">{time || "—"}</span>
      </div>
    </header>
  );
}
