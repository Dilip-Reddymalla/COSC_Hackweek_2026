let fileInput = document.getElementById("fileInput");
let preview = document.getElementById("preview");

fileInput.addEventListener("change", function (e) {
  preview.removeAttribute("src");

  document.querySelector(".meta-data-container").innerHTML = "";
  const file = e.target.files[0];

  if (!file) return;
  const fileInfo = {
    name: file.name,
    size: `${(file.size / 1024).toFixed(2)} KB`,
    type: file.type,
    lastModified: new Date(file.lastModified).toLocaleString(),
  };
  try {
    if (file.type.startsWith("image/")) {
      getImageData(file, fileInfo);
    } else if (file.type === "application/pdf") {
      getPdfData(file, fileInfo);
    } else {
      displayGenericMetadata(file, fileInfo);
    }
  } catch (error) {
    console.error(error);
    alert("Unable to process the selected file.");
  }
});

function getImageData(file, fileInfo) {
  const reader = new FileReader();

  reader.onerror = function () {
    alert("Unable to read image.");
  };

  reader.onload = function (event) {
    preview.src = event.target.result;

    preview.onload = function () {
      const dimensions = {
        width: this.naturalWidth,
        height: this.naturalHeight,
      };

      EXIF.getData(this, function () {
        const data = EXIF.getAllTags(this);

        displayImgMetadata(data, fileInfo, dimensions);
      });
    };

    preview.onerror = function () {
      alert("Unable to load image.");
    };
  };

  reader.readAsDataURL(file);
}

function displayImgMetadata(data, fileInfo, dimensions) {
  const container = document.querySelector(".meta-data-container");

  const metadata = {
    Camera: `${data.Make || "Unknown"} ${data.Model || ""}`,
    "Taken On": data.DateTimeOriginal || data.DateTime || "Unknown",
    Resolution: `${dimensions.width} × ${dimensions.height}`,
    ISO: data.ISOSpeedRatings || "-",
    Aperture: data.FNumber ? `f/${data.FNumber}` : "-",
    "Shutter Speed": data.ExposureTime
      ? `1/${Math.round(1 / data.ExposureTime)} sec`
      : "-",
    "Focal Length": data.FocalLength ? `${data.FocalLength} mm` : "-",
    "35mm Equivalent": data.FocalLengthIn35mmFilm
      ? `${data.FocalLengthIn35mmFilm} mm`
      : "-",
    Flash: data.Flash || "Unknown",
    "White Balance": data.WhiteBalance || "Unknown",
    "Exposure Mode": data.ExposureMode || "Unknown",
    Brightness: data.BrightnessValue || "-",
    Orientation: data.Orientation || "-",
    "GPS Date": data.GPSDateStamp || "Not Available",
    "GPS Time": data.GPSTimeStamp
      ? data.GPSTimeStamp.join(":")
      : "Not Available",
    Altitude: data.GPSAltitude ? `${data.GPSAltitude} m` : "Not Available",
    Latitude: data.GPSLatitude ? data.GPSLatitude.join(", ") : "Not Available",

    Longitude: data.GPSLongitude
      ? data.GPSLongitude.join(", ")
      : "Not Available",
  };

  let html = "<h2 id='heading'>Image Metadata</h2> <table>";
  for (const [key, value] of Object.entries(fileInfo)) {
    html += `
            <tr>
                <td><strong>${key}</strong></td>
                <td>${value}</td>
            </tr>
        `;
  }

  for (const [key, value] of Object.entries(metadata)) {
    html += `
            <tr>
                <td><strong>${key}</strong></td>
                <td>${value}</td>
            </tr>
        `;
  }

  html += "</table>";

  container.innerHTML = html;
}

async function getPdfData(file, fileInfo) {
  try {
    const arrayBuffer = await file.arrayBuffer();

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
    });

    const pdf = await loadingTask.promise;

    const metadata = await pdf.getMetadata();

    displayPdfMetadata(pdf, metadata, fileInfo);
  } catch (error) {
    console.error(error);

    alert("Invalid or corrupted PDF.");
  }
}

function displayPdfMetadata(pdf, metadata, fileInfo) {
  const container = document.querySelector(".meta-data-container");

  const info = metadata.info || {};

  const pdfMetadata = {
    Pages: pdf.numPages,
    "PDF Version": info.PDFFormatVersion || "Unknown",
    Title: info.Title || "Not Available",
    Author: info.Author || "Not Available",
    Subject: info.Subject || "Not Available",
    Keywords: info.Keywords || "Not Available",
    Creator: info.Creator || "Not Available",
    Producer: info.Producer || "Not Available",
    "Created On": info.CreationDate || "Not Available",
    "Modified On": info.ModDate || "Not Available",
    Linearized: info.IsLinearized ? "Yes" : "No",
    AcroForm: info.IsAcroFormPresent ? "Yes" : "No",
    "XFA Form": info.IsXFAPresent ? "Yes" : "No",
    Collection: info.IsCollectionPresent ? "Yes" : "No",
  };

  let html = "<h2 id='heading'>PDF Metadata</h2><table>";

  // File information
  for (const [key, value] of Object.entries(fileInfo)) {
    html += `
            <tr>
                <td><strong>${key}</strong></td>
                <td>${value}</td>
            </tr>
        `;
  }

  // PDF information
  for (const [key, value] of Object.entries(pdfMetadata)) {
    html += `
            <tr>
                <td><strong>${key}</strong></td>
                <td>${value}</td>
            </tr>
        `;
  }

  html += "</table>";

  container.innerHTML = html;
}

function displayGenericMetadata(file, fileInfo) {
  const container = document.querySelector(".meta-data-container");

  const genericMetadata = {
    "File Name": file.name,
    "File Size": fileInfo.size,
    "MIME Type": file.type || "Unknown",
    "Last Modified": fileInfo.lastModified,
    Extension: file.name.includes(".")
      ? file.name.split(".").pop().toUpperCase()
      : "Unknown",
  };

  let html = "<h2 id='heading'>File Metadata</h2><table>";

  for (const [key, value] of Object.entries(genericMetadata)) {
    html += `
        <tr>
            <td><strong>${key}</strong></td>
            <td>${value}</td>
        </tr>
        `;
  }

  html += "</table>";

  container.innerHTML = html;

  preview.removeAttribute("src");
}
