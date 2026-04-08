document.addEventListener("DOMContentLoaded", () => {

  // 🔑 Supabase Config
  const supabaseUrl = "https://oaxfetshttoqkyawshym.supabase.co";
  const supabaseKey = "sb_publishable_dym0yx0TeDIbeFMnBnO5qQ_Q5quxUNx";

  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const form = document.getElementById("form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (name.length < 3) {
      return showMessage("Name must be at least 3 characters", "red");
    }

    if (!email.includes("@")) {
      return showMessage("Invalid email", "red");
    }

    if (password.length < 6) {
      return showMessage("Password must be at least 6 characters", "red");
    }

    showMessage("Saving...", "orange");

    try {
      const { error } = await supabase
        .from("users")
        .insert([{ name, email, password }]);

      if (error) {
        showMessage("Error: " + error.message, "red");
      } else {
        showMessage("✅ Data saved successfully", "#00ffcc");
        form.reset();
      }

    } catch (err) {
      showMessage("Unexpected error", "red");
    }
  });

  function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
  }

});
