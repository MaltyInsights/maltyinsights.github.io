/*
 * The client side of nordverify.com/check. Talks to one endpoint, renders
 * the three-column receipt (CHECKED / FOUND / NOT CHECKED), never invents
 * a result if the endpoint is unreachable — an unreachable relay is shown
 * as "could not run the check," not as a clean or a broken report.
 *
 * ENDPOINT. Two are configured below and picked automatically:
 *   - devEndpoint: the loopback dev server on this machine
 *     (core/income/sitefix/site_checker_server.py). Only answers when the
 *     page itself is opened from that same machine's loopback — see
 *     MASKINER.md: "localhost" is whichever machine is asking, and this
 *     endpoint deliberately never listens on anything but 127.0.0.1.
 *   - prodEndpoint: left blank until the Cloudflare Worker is deployed.
 *     Paste the workers.dev URL here once it has been tried and works —
 *     nothing before that point talks to any cloud service.
 */
(function () {
  "use strict";

  var CHECK_CONFIG = {
    devEndpoint: "http://127.0.0.1:8791/check",
    // ------------------------------------------------------------------
    // THE ONE LINE. Paste the deployed Worker URL between the quotes below,
    // save, and the check on this page becomes automatic for everyone. It
    // looks like:
    //     https://nordverify-check.<your-subdomain>.workers.dev
    // Nothing else on this site has to change, and no key goes here: the
    // relay has none, needs none, and refuses any origin but nordverify.com.
    // Until it is filled in, the page says plainly that the check is not
    // switched on rather than pretending to have checked anything.
    // ------------------------------------------------------------------
    prodEndpoint: "https://nordverify-check.merved.workers.dev",
  };

  var CLIENT_TIMEOUT_MS = 12000; // a little above the relay's own 10s budget

  function isLocalPage() {
    var h = window.location.hostname;
    return window.location.protocol === "file:" || h === "" ||
      h === "localhost" || h === "127.0.0.1";
  }

  function endpointUrl() {
    if (isLocalPage()) return CHECK_CONFIG.devEndpoint;
    return CHECK_CONFIG.prodEndpoint;
  }

  function normalizeInput(raw) {
    var v = (raw || "").trim();
    if (!v) return "";
    if (v.indexOf("://") === -1) v = "https://" + v;
    return v;
  }

  function clear(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  function renderColumn(el, items, emptyText) {
    clear(el);
    if (!items || !items.length) {
      var p = document.createElement("p");
      p.className = "receipt-empty";
      p.textContent = emptyText;
      el.appendChild(p);
      return;
    }
    items.forEach(function (item) {
      var wrap = document.createElement("div");
      wrap.className = "receipt-item";
      var label = document.createElement("span");
      label.className = "rc-label";
      label.textContent = item.check + ": " + item.detail;
      wrap.appendChild(label);
      if (item.evidence) {
        var ev = document.createElement("span");
        ev.className = "rc-evidence";
        ev.textContent = item.evidence;
        wrap.appendChild(ev);
      }
      el.appendChild(wrap);
    });
  }

  function renderResult(result) {
    renderColumn(document.getElementById("col-checked"), result.checked, "Nothing checked.");
    renderColumn(document.getElementById("col-found"), result.found, "Nothing found.");
    renderColumn(document.getElementById("col-not-checked"), result.not_checked,
      "Everything could be checked.");
    document.getElementById("receipt").hidden = false;
  }

  function setStatus(text) {
    var el = document.getElementById("check-status");
    if (!text) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = text;
  }

  /* WHEN THE RELAY CANNOT ANSWER.

     There is no mail path here any more: the check runs on the page, on every
     device, or it says plainly that it did not run. What must never happen is
     the middle case, where a failure to reach the relay is drawn as a clean
     receipt. Nothing is found and nothing is ruled out when nothing was
     checked, and the line below says exactly that. */
  function cannotRunRightNow(why) {
    document.getElementById("receipt").hidden = true;
    setStatus(why);
  }

  function runCheck(url) {
    var endpoint = endpointUrl();
    if (!endpoint) {
      cannotRunRightNow("The check is not switched on yet. Nothing was " +
        "checked, and nothing about your site is being claimed either way.");
      return;
    }
    setStatus("Checking " + url + " …");
    document.getElementById("receipt").hidden = true;

    var controller = ("AbortController" in window) ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, CLIENT_TIMEOUT_MS) : null;

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
      signal: controller ? controller.signal : undefined,
    }).then(function (resp) {
      if (timer) clearTimeout(timer);
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      return resp.json();
    }).then(function (data) {
      setStatus("");
      renderResult(data);
    }).catch(function () {
      if (timer) clearTimeout(timer);
      /* A relay that is deployed but not answering is the same situation as
         one that was never deployed: no receipt exists, and telling a visitor
         "the check could not be run" leaves them holding nothing. Both paths
         end in the same offer, because the offer is the thing that works. */
      cannotRunRightNow("The check could not be completed just now. Nothing " +
        "was found and nothing was ruled out, because nothing was checked. " +
        "Try again in a moment.");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("check-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var url = normalizeInput(document.getElementById("check-url").value);
      if (!url) return;
      runCheck(url);
    });
  });
})();
