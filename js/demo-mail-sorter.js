/*
 * Ten fictional emails, sorted client-side, in front of the reader. No
 * network call anywhere in this file — the "sorting" is a lookup table
 * (see MAILS below) walked with setTimeout for the animation, nothing more.
 *
 * Eight of the ten carry a folder I am confident about. Two do not, and
 * those two land in "Needs a person" rather than being guessed into a
 * folder that looks plausible — the same third state check.html and the
 * case study use elsewhere on this site.
 */
(function () {
  "use strict";

  var MAILS = [
    { from: "Anna, NordFragt",        subject: "Invoice #4471 attached",         folder: "invoices" },
    { from: "billing@studio-lys.dk",  subject: "Your receipt for August",        folder: "invoices" },
    { from: "faktura@vvs-nord.dk",    subject: "Faktura 2291 vedhæftet",         folder: "invoices" },
    { from: "Peter Holm",             subject: "Site is down again",             folder: "support" },
    { from: "support-ticket@kundeportal.dk", subject: "Ticket #88 follow-up",    folder: "support" },
    { from: "Maria K.",               subject: "Quick question about the quote", folder: "support" },
    { from: "Nord Newsletter",        subject: "This week in Danish tech",       folder: "newsletters" },
    { from: "digest@indiehackers.com", subject: "Your weekly digest",            folder: "newsletters" },
    { from: "Jonas",                  subject: "hey",                            folder: "unsure" },
    { from: "noreply@system-alert.net", subject: "Action required",              folder: "unsure" }
  ];

  var STEP_MS = 380;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function mailCard(mail) {
    var card = el("div", "mail-card");
    card.appendChild(el("span", "m-from", mail.from));
    card.appendChild(el("span", "m-subject", mail.subject));
    return card;
  }

  function renderInbox() {
    var list = document.getElementById("inbox-list");
    MAILS.forEach(function (mail, i) {
      var card = mailCard(mail);
      card.id = "mail-" + i;
      list.appendChild(card);
    });
  }

  function clearEmpty(folderEl) {
    var empty = folderEl.querySelector(".empty");
    if (empty) empty.remove();
  }

  function moveOne(i) {
    if (i >= MAILS.length) {
      finish();
      return;
    }
    var mail = MAILS[i];
    var card = document.getElementById("mail-" + i);
    var target = document.querySelector('.folder-col[data-folder="' + mail.folder + '"] .folder-items');
    if (card && target) {
      clearEmpty(target);
      target.appendChild(card);
      card.classList.add("landed");
    }
    setTimeout(function () { moveOne(i + 1); }, STEP_MS);
  }

  function finish() {
    var sorted = MAILS.filter(function (m) { return m.folder !== "unsure"; }).length;
    var unsure = MAILS.length - sorted;
    var status = document.getElementById("sort-status");
    status.textContent = "";
    var line1 = document.createElement("span");
    line1.textContent = sorted + " sorted, " + unsure + " flagged unsure";
    status.appendChild(line1);
    var line2 = el("span", "unsure-line", ", unsure goes to a human.");
    status.appendChild(line2);
    document.getElementById("run-sort").disabled = true;
  }

  function runSort() {
    var btn = document.getElementById("run-sort");
    btn.disabled = true;
    document.getElementById("sort-status").textContent = "Sorting…";
    moveOne(0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderInbox();
    var btn = document.getElementById("run-sort");
    if (btn) btn.addEventListener("click", runSort);
  });
})();
