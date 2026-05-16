import { philosophies } from "../data/philosophies";

export function buildWorldviewText(selectedPrinciples) {
  const lines = ["My Worldview Code", ""];

  Object.entries(selectedPrinciples).forEach(([philosophyId, principleSet]) => {
    const enabled = Object.entries(principleSet)
      .filter(([, value]) => value)
      .map(([principle]) => principle);

    if (enabled.length) {
      lines.push(`${philosophies[philosophyId].name}`);
      enabled.forEach((principle) => lines.push(`- ${principle}`));
      lines.push("");
    }
  });

  if (lines.length === 2) lines.push("No principles selected yet.");

  return lines.join("\n").trim();
}

export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return true;
}
