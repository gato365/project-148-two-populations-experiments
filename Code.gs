// =====================================================================
// STAT 252 Experiments — Google Apps Script Backend
// =====================================================================
// HOW TO INSTALL:
// 1. Create a new Google Sheet (any name, e.g. "stat252-experiments").
// 2. In the Sheet, click Extensions → Apps Script.
// 3. Delete any boilerplate code in the editor and paste THIS entire file.
// 4. Click the disk icon to save (project name doesn't matter).
// 5. Click Deploy → New deployment.
//      - Click the gear icon next to "Select type" → choose "Web app".
//      - Description: "stat252 endpoint"
//      - Execute as: ME (your account)
//      - Who has access: ANYONE
//      - Click Deploy.
//      - Authorize when prompted (it'll warn you the app is unverified —
//        click Advanced → Go to [project] (unsafe). It's your own script.)
// 6. Copy the resulting Web App URL.
// 7. Paste it into index.html where it says PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE
// 8. Done. The first time a student submits, this script will create the
//    appropriate sheet tab and headers automatically.
//
// IF YOU EVER UPDATE THIS SCRIPT: you must Deploy → Manage deployments →
// edit the existing deployment → bump the version → Deploy. Otherwise the
// old version stays live.
// =====================================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var experiment = data.experiment || "unknown";

    // Define schema per experiment
    var schemas = {
      "reaction": ["timestamp", "session", "group", "avg_rt_ms",
                   "trial1_ms", "trial2_ms", "trial3_ms", "trial4_ms", "trial5_ms"],
      "memory":   ["timestamp", "session", "score_before", "score_after",
                   "difference", "digits_round1", "digits_round2"],
      "framing":  ["timestamp", "session", "group", "choice"]
    };

    var headers = schemas[experiment];
    if (!headers) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "unknown experiment: " + experiment })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Get-or-create sheet tab
    var sheet = ss.getSheetByName(experiment);
    if (!sheet) {
      sheet = ss.insertSheet(experiment);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Build row in schema order
    var row = headers.map(function(h) { return data[h] !== undefined ? data[h] : ""; });
    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "STAT 252 experiments endpoint is live. POST data here."
  );
}
