async function loadEvents() {
  try {
    const res = await fetch("/api/events");
    const events = await res.json();
    const container = document.getElementById("events");
    container.innerHTML = "";

    if (!events || events.length === 0) {
      container.innerHTML = "<p>No events available.</p>";
      return;
    }

    events.forEach(e => {
      const div = document.createElement("div");
      div.className = "event-card";
      div.innerHTML = `
        <h2>${e.title || e.name}</h2>
        <p>${e.description || "No description available."}</p>
        <p><b>Date:</b> ${new Date(e.date).toLocaleString()}</p>
        <p><b>Location:</b> ${e.location}</p>
        <p><b>Seats Available:</b> ${e.availableSeats ?? e.seats}</p>
        <button onclick="bookEvent('${e._id}')">Book Now</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading events:", err);
    document.getElementById("events").innerHTML = "<p>Failed to load events.</p>";
  }
}
