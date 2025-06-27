export function fetchSession() {
  return fetch("/api/session", {
    method: "GET",
  })
    .then(checkStatus)
    .catch(handleError);
}

export function fetchLogin(username) {
  return fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  })
    .then(checkStatus)
    .catch(handleError);
}

export function fetchLogout() {
  return fetch("/api/session", {
    method: "DELETE",
  })
    .then(checkStatus)
    .catch(handleError);
}

export function fetchRegister(username) {
  return fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  })
    .then(checkStatus)
    .catch(handleError);
}

export function fetchLends() {
  return fetch("/api/lends").then(checkStatus).catch(handleError);
}

export function addLend(entry) {
  return fetch("/api/lends", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  })
    .then(checkStatus)
    .catch(handleError);
}

export function updateLend(id, updates) {
  return fetch(`/api/lends/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
    .then(checkStatus)
    .catch(handleError);
}

export function deleteLend(id) {
  return fetch(`/api/lends/${id}`, {
    method: "DELETE",
  })
    .then(checkStatus)
    .catch(handleError);
}

export function fetchReminders() {
  return fetch("/api/reminders").then(checkStatus).catch(handleError);
}

export function sendReminder(toUser, itemName) {
  return fetch("/api/reminders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toUser, itemName }),
  })
    .then(checkStatus)
    .catch(handleError);
}

function checkStatus(res) {
  if (!res.ok) {
    return res.json().then((err) => Promise.reject(err));
  }
  return res.json();
}

function handleError(err) {
  return Promise.reject(err);
}
