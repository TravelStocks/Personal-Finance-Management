"use client";

import {useEffect, useState} from "react";
import {reviewToday} from "./finance-review-model";

export function useFinanceToday() {
  const [today, setToday] = useState(() => reviewToday());
  useEffect(() => {
    const refresh = () => setToday(reviewToday());
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return today;
}
