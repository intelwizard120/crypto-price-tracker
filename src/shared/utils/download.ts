export const handleDownload = (data, path) => {
  // Create a blob with the data
  const blob = new Blob([data], { type: "text/plain" });

  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");
  link.href = url;

  // Specify the filename
  link.setAttribute("download", path);

  // Append the link to the document body
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
