import DOMPurify from "dompurify";

export function maskEmail(email) {
  const [user, domain] = email.split("@");
  if (user.length <= 3) return `*****@${domain}`;
  return `${user.slice(0, 3)}*****@${domain}`;
}

export const formatDateInput = (date) =>
  date instanceof Date ? date.toISOString().split("T")[0] : date || "";

export function truncateHtmlText(html, maxLength = 150) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = DOMPurify.sanitize(html || "");
  const textContent = tempDiv.textContent || tempDiv.innerText || "";
  if (textContent.length <= maxLength) return textContent;
  return textContent.substring(0, maxLength).trim() + "...";
}
