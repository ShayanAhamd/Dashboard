export const exportToCSV = (data, filename = "exported_data.csv") => {
  if (!data || !data.length) {
    alert("No data available for download.");
    return;
  }

  const headers = Object.keys(data[0]).join(",") + "\n"; // CSV headers
  const csvRows = data.map((row) => Object.values(row).join(",")).join("\n"); // CSV rows
  const csvContent = "data:text/csv;charset=utf-8," + headers + csvRows;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
