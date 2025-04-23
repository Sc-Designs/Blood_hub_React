import React from 'react'
import Axios from "../config/Axois"
const PdfDownloader = (id) => {
    const handleDownload = async () => {
      const response = await Axios.post("/pdf/generatePdf", id, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "blood-request.pdf";
      a.click();
      URL.revokeObjectURL(url);
    };
  return (
    <button
    onClick={handleDownload}
    className="w-full py-2 font-Satoshi uppercase text-xl font-semibold rounded bg-blue-600 drop-shadow-[0px_0px_20px_rgba(0,50,255,0.9)] cursor-pointer hover:bg-blue-700 transition-all duration-200">
      Document
    </button>
  );
}

export default PdfDownloader