export const getUrls = () => {
  return fetch("http://localhost:3001/api/v1/urls").then((response) =>
    response.json()
  );
};

export const postUrls = async (newUrl) => {
  const response = await fetch("http://localhost:3001/api/v1/urls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUrl),
  });
  const data = await response.json();
  return data;
};
