export const handleCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
  }
};
