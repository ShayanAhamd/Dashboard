import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

const getUserName = async (userId) => {
  if (!userId) return "N/A";

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().name || "Unknown User";
    } else {
      return "Unknown User";
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return "Unknown User";
  }
};

export const exportToCSV = async (data, filename = "exported_data.csv") => {
  if (!data || !data.length) {
    alert("No data available for download.");
    return;
  }

  const headers = [
    "id",
    "code",
    "created_at",
    "used_by",
    "points",
    "is_downloaded",
    "is_used",
    "status",
    "used_at",
  ];

  const userNames = {};
  await Promise.all(
    data.map(async (row) => {
      if (row.used_by && !userNames[row.used_by]) {
        userNames[row.used_by] = await getUserName(row.used_by);
      }
    })
  );

  const csvRows = data.map((row, index) => {
    return headers
      .map((header) => {
        let value = row[header];

        switch (header) {
          case "id":
            value = index + 1;
            break;
          case "used_by":
            value = row.used_by ? userNames[row.used_by] : "N/A";
            break;
          case "is_downloaded":
          case "is_used":
            value = value ? "Yes" : "No";
            break;
          case "status":
            value = value ? "Active" : "Inactive";
            break;
          case "created_at":
          case "used_at":
            value = value?.seconds
              ? new Date(value.seconds * 1000).toLocaleDateString()
              : "N/A";
            break;
          default:
            value = value !== undefined ? value : "N/A";
        }

        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",");
  });

  const csvContent =
    "data:text/csv;charset=utf-8," + [headers.join(","), ...csvRows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
