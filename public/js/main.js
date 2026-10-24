(function () {
  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // Don't allow booking dates in the past
  var today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  document.querySelectorAll('input[type="date"]').forEach(function (el) {
    el.min = today.toISOString().slice(0, 10);
  });

  // Quote forms: validate, then POST to the form endpoint (Formspree etc.)
  // or, when no endpoint is configured, open the visitor's email app.
  document.querySelectorAll(".quote-form").forEach(function (form) {
    var status = form.querySelector(".form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach(function (el) {
        var bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
        el.classList.toggle("invalid", bad);
        el.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        status.textContent = "Please fill in the highlighted fields.";
        status.classList.add("error");
        firstInvalid.focus();
        return;
      }
      if (form.querySelector(".hp").value) return; // bot

      var data = new FormData(form);
      data.delete("_gotcha");

      var mailto = form.getAttribute("data-mailto");
      if (mailto) {
        var lines = [];
        data.forEach(function (v, k) {
          if (v) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ": " + v);
        });
        var subject = "Limo quote request: " + (data.get("service") || "") + " on " + (data.get("date") || "");
        window.location.href =
          "mailto:" + mailto + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        status.textContent = "Opening your email app. Just hit send!";
        status.classList.add("ok");
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";
      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          if (window.gtag) window.gtag("event", "generate_lead", { form: "quote" });
          window.location.href = "/thank-you/";
        })
        .catch(function () {
          status.textContent = "Sorry, something went wrong. Please call us instead.";
          status.classList.add("error");
          btn.disabled = false;
          btn.textContent = "Request My Free Quote";
        });
    });
  });

  // Track phone clicks as conversions when GA4 is enabled
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.gtag) window.gtag("event", "click_to_call");
    });
  });
})();
