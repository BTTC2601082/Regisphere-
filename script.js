const events = [
  {id:"tech",name:"Tech & Innovation Summit",date:"DEC 12, 2026",time:"10:00 AM",place:"City Convention Centre",icon:"💡",description:"Explore new ideas, technology trends, and creative solutions."},
  {id:"music",name:"Campus Music Fest",date:"DEC 18, 2026",time:"5:00 PM",place:"College Open Ground",icon:"🎵",description:"An evening of live performances, music, and great energy."},
  {id:"art",name:"Creative Art Workshop",date:"JAN 08, 2027",time:"11:00 AM",place:"Arts & Culture Studio",icon:"🎨",description:"Learn, create, and share your ideas in a hands-on workshop."}
];

const eventList = document.getElementById("eventList");
const eventSelect = document.getElementById("event");
const form = document.getElementById("registrationForm");
const confirmation = document.getElementById("confirmation");
const registrationList = document.getElementById("registrationList");

function renderEvents() {
  events.forEach(event => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-banner" aria-hidden="true">${event.icon}</div>
      <div class="event-body">
        <span class="event-date">${event.date}</span>
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <div class="event-meta"><span>◷ ${event.time}</span><span>⌖ ${event.place}</span></div>
      </div>`;
    eventList.appendChild(card);

    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = event.name;
    eventSelect.appendChild(option);
  });
}

function getRegistrations() {
  try { return JSON.parse(localStorage.getItem("regisphereRegistrations")) || []; }
  catch { return []; }
}

function saveRegistrations(registrations) {
  localStorage.setItem("regisphereRegistrations", JSON.stringify(registrations));
}

function renderRegistrations() {
  const registrations = getRegistrations();
  registrationList.innerHTML = "";
  if (!registrations.length) {
    registrationList.innerHTML = '<p class="muted">No registrations yet.</p>';
    return;
  }
  registrations.slice().reverse().forEach(person => {
    const item = document.createElement("div");
    item.className = "registration-item";
    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = person.fullName;
    const email = document.createElement("span");
    email.textContent = person.email;
    details.append(name, email);
    const event = document.createElement("span");
    event.textContent = person.eventName;
    item.append(details, event);
    registrationList.appendChild(item);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const selectedEvent = events.find(event => event.id === eventSelect.value);
  if (!selectedEvent) return;

  const registration = {
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    eventName: selectedEvent.name,
    registeredAt: new Date().toISOString()
  };

  const registrations = getRegistrations();
  registrations.push(registration);
  saveRegistrations(registrations);

  confirmation.textContent = `Thank you, ${registration.fullName}! Your registration for ${selectedEvent.name} is confirmed.`;
  confirmation.classList.add("show");
  form.reset();
  renderRegistrations();
});

document.getElementById("clearRegistrations").addEventListener("click", function () {
  if (confirm("Delete all demo registrations saved in this browser?")) {
    localStorage.removeItem("regisphereRegistrations");
    confirmation.classList.remove("show");
    renderRegistrations();
  }
});

renderEvents();
renderRegistrations();
