import { useSyncExternalStore } from "react";

const STORAGE_KEY = "calamari-animations";
const listeners = new Set();

let explicitPreference = false;
let preference = true;

function applyPreference(value) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.animations = value ? "on" : "off";
  }
}

function readStoredPreference() {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "on") return true;
    if (stored === "off") return false;
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

function computeInitialPreference() {
  const stored = readStoredPreference();
  if (stored !== null) {
    explicitPreference = true;
    return stored;
  }
  if (typeof window === "undefined") return true;
  try {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media && typeof media.matches === "boolean") {
      return !media.matches;
    }
  } catch {
    // Ignore matchMedia issues
  }
  return true;
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

if (typeof window !== "undefined") {
  preference = computeInitialPreference();
  applyPreference(preference);

  try {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => {
      if (explicitPreference) return;
      preference = !event.matches;
      applyPreference(preference);
      emit();
    };
    if (media?.addEventListener) {
      media.addEventListener("change", handleChange);
    } else if (media?.addListener) {
      media.addListener(handleChange);
    }
  } catch {
    // Swallow matchMedia errors silently
  }
}

export function getAnimationPreference() {
  return preference;
}

export function setAnimationPreference(value) {
  preference = Boolean(value);
  explicitPreference = true;
  applyPreference(preference);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, preference ? "on" : "off");
    } catch {
      // Ignore storage errors
    }
  }
  emit();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAnimationPreference() {
  return useSyncExternalStore(subscribe, getAnimationPreference, getAnimationPreference);
}
