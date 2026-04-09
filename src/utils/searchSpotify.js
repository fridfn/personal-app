export const searchSpotify = async (query, limit = 5) => {
  limit = Number(limit) || 20;
  const res = await fetch(`https://pwa-notification-phi.vercel.app/api/spotify?q=${encodeURIComponent(query)}&limit=${limit}`, {
   method: "POST"
  });
  const data = await res.json();
  return data.result;
};