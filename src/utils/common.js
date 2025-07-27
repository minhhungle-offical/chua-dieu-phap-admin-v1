export function maskEmail(email) {
  const [user, domain] = email.split("@");
  if (user.length <= 3) return `*****@${domain}`;
  return `${user.slice(0, 3)}*****@${domain}`;
}
