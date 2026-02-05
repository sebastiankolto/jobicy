export function decodeHtml(text: string): string {
  const textarea = document.createElement("textarea");
  // Decode twice to handle double-encoded entities like &amp;#8211;
  textarea.innerHTML = text;
  textarea.innerHTML = textarea.value;
  return textarea.value;
}
