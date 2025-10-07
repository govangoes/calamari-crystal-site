export function upsertJSONLD(id, data) {
  if (typeof document === "undefined") return;
  if (!id) throw new Error("structured data requires an id");
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

export function removeJSONLD(id) {
  if (typeof document === "undefined") return;
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}
