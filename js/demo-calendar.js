/*
 * One fictional email, one calendar entry built from it. No network call —
 * the three fields below are read straight off the DOM text already sitting
 * in demo-calendar.html; this file only times the highlight-then-fill
 * animation, it does not fetch or parse anything remote.
 */
(function () {
  "use strict";

  var FIELDS = [
    { spanId: "span-date", targetId: "v-date", cls: "hl-date", value: "Thursday" },
    { spanId: "span-time", targetId: "v-time", cls: "hl-time", value: "10:00" },
    { spanId: "span-who",  targetId: "v-who",  cls: "hl-who",  value: "Sofie Lang" }
  ];

  var STEP_MS = 550;

  function fillOne(i) {
    if (i >= FIELDS.length) {
      finish();
      return;
    }
    var field = FIELDS[i];
    var span = document.getElementById(field.spanId);
    if (span) span.classList.add("on");
    var target = document.getElementById(field.targetId);
    if (target) target.textContent = field.value;
    setTimeout(function () { fillOne(i + 1); }, STEP_MS);
  }

  function finish() {
    document.getElementById("v-title").textContent = "Meet with Sofie Lang";
    document.getElementById("entry-card").classList.add("ready");
    document.getElementById("extract-status").textContent =
      "Three details extracted from the email above.";
    document.getElementById("run-extract").disabled = true;
  }

  function runExtract() {
    var btn = document.getElementById("run-extract");
    btn.disabled = true;
    document.getElementById("extract-status").textContent = "Reading the email…";
    fillOne(0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("run-extract");
    if (btn) btn.addEventListener("click", runExtract);
  });
})();
