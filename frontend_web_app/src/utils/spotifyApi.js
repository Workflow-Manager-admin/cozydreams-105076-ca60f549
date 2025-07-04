//
// Spotify API Utility for CozyDreams (auth & search for matching tracks)
// Reads credentials from environment variables or prompts for user input if not found
// Exposes: getSpotifyAccessToken, searchTracksForVibe
//

// PUBLIC_INTERFACE
/**
 * Fetches a Spotify API access token using client credentials flow
 * (client id/secret taken from env or prompted from user).
 */
export async function getSpotifyAccessToken() {
  let clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  let clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  // Fallback: prompt user if not set
  if (!clientId || !clientSecret) {
    clientId = window.prompt(
      "Enter your Spotify Client ID (store as REACT_APP_SPOTIFY_CLIENT_ID for reuse):"
    );
    clientSecret = window.prompt(
      "Enter your Spotify Client Secret (store as REACT_APP_SPOTIFY_CLIENT_SECRET for reuse):"
    );
    if (!clientId || !clientSecret)
      throw new Error("Spotify credentials missing.");
  }
  const creds = btoa(`${clientId}:${clientSecret}`);
  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!resp.ok) {
    throw new Error("Spotify auth failed (check ClientID/Secret).");
  }
  const data = await resp.json();
  return data.access_token;
}

// PUBLIC_INTERFACE
/**
 * Searches the Spotify web API for tracks matching quiz results (color, mood, aesthetic).
 * @param {Object} quizResults - { color, mood, aesthetic }
 * @param {string} accessToken - Valid Spotify API Bearer token
 * @returns {Array} - Array of Spotify track objects
 */
export async function searchTracksForVibe(quizResults, accessToken) {
  // Map quiz choices to Spotify-friendly keywords
  const colorMap = {
    pink: "pastel calm lofi",
    lavender: "lofi chill lavender",
    blue: "dream pop soft+blue",
    mint: "mint ambient relaxation minimal",
    peach: "peach softcore vibe",
  };
  const moodMap = {
    dreamy: "dreamy ambient chill",
    cozy: "cozy lofi slow",
    chill: "chillhop",
    energized: "happy pop",
    tender: "gentle soul warm",
  };
  const aestheticMap = {
    lofi: "lofi study beats",
    fairycore: "fairycore ethereal",
    cottagecore: "cottagecore acoustic nature",
    pastelpop: "pastel pop kawaii",
    nightsky: "night sky dreamy ambient",
  };

  let query =
    (colorMap[quizResults.color] || "") +
    " " +
    (moodMap[quizResults.mood] || "") +
    " " +
    (aestheticMap[quizResults.aesthetic] || "");
  query = query.replace(/\s\s+/g, " ").trim();

  const params = new URLSearchParams({
    q: query,
    type: "track",
    limit: 30,
    market: "US",
  });

  const result = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!result.ok) {
    if (result.status === 401) throw new Error("Spotify token expired.");
    throw new Error("Spotify search failed.");
  }
  const json = await result.json();
  return json.tracks?.items || [];
}
