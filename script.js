(function () {
  "use strict";


  var year = document.getElementById("year");

  if (year) {
    var currentYear = new Date().getFullYear();

    year.textContent = currentYear;
    year.setAttribute("datetime", String(currentYear));
  }


  var page = location.pathname.split("/").pop() || "index.html";

  document
    .querySelectorAll(".site-header .primary-navigation a")
    .forEach(function (link) {
      var linkPage = link.getAttribute("href");

      if (linkPage === page) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });


  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-header .primary-navigation");

  if (toggle && nav) {
    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

   
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        setMenu(false);
        toggle.focus();
      }
    });

   
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

 
  var form = document.getElementById("contact-form");

  if (form) {
    var status = document.getElementById("form-status");

    var rules = {
      name: function (value) {
        return value.trim().length < 2
          ? "Please enter your name (at least 2 characters)."
          : "";
      },

      email: function (value) {
        if (!value.trim()) {
          return "Please enter your email address.";
        }

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ""
          : "Please enter a valid email address.";
      },

      message: function (value) {
        return value.trim().length < 10
          ? "Please write a message of at least 10 characters."
          : "";
      },
    };

   
    function check(field) {
      var error = document.getElementById(field.id + "-error");
      var rule = rules[field.id];

      if (!rule) return true;

      var message = rule(field.value);

      field.setAttribute("aria-invalid", message ? "true" : "false");

      if (error) {
        error.textContent = message;
        error.hidden = !message;
      }

      return !message;
    }

    var fields = Array.from(form.querySelectorAll("input, textarea"));

   
    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        check(field);
      });

     
      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") {
          check(field);
        }

        if (status) {
          status.textContent = "";
          status.className = "form-status";
        }
      });
    });

    
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstInvalid = null;

      fields.forEach(function (field) {
        if (!check(field) && !firstInvalid) {
          firstInvalid = field;
        }
      });

      if (status) {
        status.className = "form-status";
        status.textContent = "";
      }

      if (firstInvalid) {
        if (status) {
          status.textContent = "Please fix the errors above and try again.";

          status.classList.add("is-error");
        }

        firstInvalid.focus();
        return;
      }

      
      if (status) {
        status.textContent =
          "Your details are valid! This is a demo form. No message has been sent.";

        status.classList.add("is-success");
      }

      form.reset();

      fields.forEach(function (field) {
        field.removeAttribute("aria-invalid");
      });

      form.querySelectorAll(".error-message").forEach(function (error) {
        error.textContent = "";
        error.hidden = true;
      });
    });
  }
})();
