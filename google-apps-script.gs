// =====================================================================
//  Google Apps Script — RSVP жауаптарын кестеге жазады
//  Бұл кодты Google Sheet → Extensions → Apps Script ішіне қой.
// =====================================================================
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Тақырып жолы бос болса — қосып қоямыз
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Уақыты", "Аты-жөні", "Жауабы"]);
  }

  sheet.appendRow([
    new Date(),
    e.parameter.name || "",
    e.parameter.attend || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
