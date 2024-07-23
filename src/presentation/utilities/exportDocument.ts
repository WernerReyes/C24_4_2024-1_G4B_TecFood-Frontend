import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, writeFile } from "xlsx";

export const exportTableToPdf = (
  title: string,
  columns: { field: string; header: string }[],
  data: Record<string, any>[],
  fileName: string,
) => {
  const doc = new jsPDF();
  doc.text(title, 14, 10, { align: "center" });
  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: data.map((row) => columns.map((col) => row[col.field])),
    theme: "striped",
    styles: {
      font: "helvetica",
      fontStyle: "normal",
      overflow: "linebreak",
    },
  });
  doc.save(fileName);
};

export const exportTableToExcel = (
  columns: { field: string; header: string }[],
  data: Record<string, any>[],
  fileName: string,
) => {
  data = data.map((row) =>
    columns.reduce(
      (acc, col) => ({
        ...acc,
        [col.header]: row[col.field],
      }),
      {},
    ),
  );
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(data, {
    header: columns.map((col) => col.header),
  });
  utils.book_append_sheet(wb, ws, "Sheet1");
  writeFile(wb, fileName);
};
