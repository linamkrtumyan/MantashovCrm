export default async function request(
  url,
  method = "GET",
  body = null,
  headers = {}
) {
  // url = "https://mantashov.herokuapp.com" + url;
  if (body) {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(url, { method, body, headers });

  const data = await response.json();
  if (response.status === 401) {
    if (window.location.pathname !== "/login") {
      //logout();
    }
    throw new Error("Auth error");
  }
  if (!response.ok) {
    throw new Error(data?.message ? `${data.message}` : "Error");
  }
  return data;
}
