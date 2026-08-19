/*
 * One fictional invoice, mapped field by field into a table row. No
 * network call — every value below is read straight off the DOM text
 * already sitting in demo-invoice.html; this file only times the
 * highlight-then-copy animation.
 */
(function () {
  "use strict";

  var FIELDS = [
    { fromId: "f-number", toId: "c-number" },
    { fromId: "f-vendor", toId: "c-vendor" },
    { fromId: "f-date",   toId: "c-date" },
    { fromId: "f-due",    toId: "c-due" },
    { fromId: "f-amount", toId: "c-amount" }
  ];

  var STEP_MS = 420;

  function mapOne(i) {
    if (i >= FIELDS.length) {
      finish();
      return;
    }
    var field = FIELDS[i];
    var from = document.getElementById(field.fromId);
    var to = document.getElementById(field.toId);
    if (from) from.classList.add("on");
    if (to) {
      to.textContent = from ? from.textContent : "";
      to.classList.add("on");
      setTimeout(function () { to.classList.remove("on"); }, STEP_MS - 60);
    }
    setTimeout(function () { mapOne(i + 1); }, STEP_MS);
  }

  function finish() {
    document.getElementById("map-status").textContent =
      "Mapped " + FIELDS.length + " fields into one row.";
    document.getElementById("run-map").disabled = true;
  }

  function runMap() {
    var btn = document.getElementById("run-map");
    btn.disabled = true;
    document.getElementById("map-status").textContent = "Reading the invoice…";
    mapOne(0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("run-map");
    if (btn) btn.addEventListener("click", runMap);
  });
})();
