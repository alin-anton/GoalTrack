export const formatCreationDate = (isoDateString: string): string => {
  if (!isoDateString) return 'Fără termen';
  
  const date = new Date(isoDateString);
  return date.toLocaleDateString('ro-RO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};