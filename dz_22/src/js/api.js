const api = {
  create: (url, todo) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then((resp) => resp.json());
  },
  delete: (url) => {
    return fetch(url, {
      method: "DELETE",
    });
  },
  change: (url, todo) => {
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  },
  requestGet: (url) => {
    return fetch(url).then((resp) => resp.json());
  },
};
