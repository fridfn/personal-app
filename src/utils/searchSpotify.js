export const searchSpotify = async ({ query, limit, id }) => {
  const params = new URLSearchParams();

  if (id) {
    params.append("id", id);
  } else {
    params.append("q", query || "Nadin Amizah");
    params.append("limit", limit || 10);
  }

  const res = await fetch(
    `https://pwa-notification-phi.vercel.app/api/spotify?${params.toString()}`,
    {
      method: "POST",
    }
  );
  
  console.log(res)
  const data = await res.json();
  return data.result;
};