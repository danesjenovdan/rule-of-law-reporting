export function formatDate(dateString) {
  if (!dateString) {
    return '';
  }
  const d = new Date(dateString);
  if (Number.isNaN(d.valueOf())) {
    return '';
  }
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}
