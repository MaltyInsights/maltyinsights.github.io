/* ---------------------------------------------------------------------------
 * One made-up shop's old page, rebuilt in front of you, six steps.
 *
 * NO NETWORK CALL ANYWHERE IN THIS FILE. Both pages are already in the HTML;
 * this only reveals the right-hand one a piece at a time and lights the row
 * that explains each piece. Nothing is fetched, nothing is sent, and the
 * "before" page is invented rather than borrowed from anyone's real site.
 *
 * The six changes are the same six the free check on this site looks for, so
 * the demo and the tool cannot drift apart and tell a visitor two stories.
 * ------------------------------------------------------------------------- */
(function () {
  "use strict";

  /* Each step lights its row and reveals the piece of the rebuilt page that
     the row is about, so the words and the picture always agree. Step 5 is
     the layout itself, which is why it reveals the row of three columns:
     that is the part that folds into a column on a phone. */
  var STEPS = [
    { row: "c1", el: "n-art" },
    { row: "c2", el: "n-head" },
    { row: "c3", el: "n-body" },
    { row: "c4", el: "n-cta" },
    { row: "c5", el: "n-cols" },
    { row: "c6", el: "n-hours", also: "n-foot-in" }
  ];
  var GAP_MS = 900;
  var timers = [];

  function el(id) { return document.getElementById(id); }

  function clearTimers() {
    timers.forEach(function (t) { clearTimeout(t); });
    timers = [];
  }

  function reset() {
    clearTimers();
    STEPS.forEach(function (s) {
      var row = el(s.row);
      if (row) row.classList.remove("lit");
      if (s.el && el(s.el)) el(s.el).classList.remove("shown");
      if (s.also && el(s.also)) el(s.also).classList.remove("shown");
    });
    if (el("n-prompt")) el("n-prompt").hidden = false;
    el("note").textContent = "Six changes, in the order I would make them.";
    el("run").disabled = false;
  }

  function run() {
    reset();
    if (el("n-prompt")) el("n-prompt").hidden = true;
    el("run").disabled = true;
    STEPS.forEach(function (s, i) {
      timers.push(setTimeout(function () {
        var row = el(s.row);
        if (row) row.classList.add("lit");
        if (s.el && el(s.el)) el(s.el).classList.add("shown");
        if (s.also && el(s.also)) el(s.also).classList.add("shown");
        el("note").textContent = "Change " + (i + 1) + " of " + STEPS.length + ".";
        if (i === STEPS.length - 1) {
          el("note").textContent =
            "Six changes. The page now says what the shop does, when it is open, " +
            "what to press, and it holds together on a phone.";
          el("run").disabled = false;
        }
      }, GAP_MS * (i + 1)));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    el("run").addEventListener("click", run);
    el("reset").addEventListener("click", reset);
  });
})();
