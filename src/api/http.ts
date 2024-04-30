export const API_BASE_URL = "https://star-personally-puma.ngrok-free.app/api";

const callAPI = (url, method, data = null) => {
  return fetch(`${API_BASE_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data && JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const Http = {
  get: (url) => callAPI(url, "GET"),
  post: (url, data) => callAPI(url, "POST", data),
  delete: (url, data) => callAPI(url, "DELETE", data),
};
