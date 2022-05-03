export function formatDate(dateString) {
  const d = new Date(dateString);
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}
