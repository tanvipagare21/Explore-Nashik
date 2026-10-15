// Live Weather Fetch Service for Nashik (Assignment 10)
// Uses Open-Meteo Public API for real-time meteorological JSON data

export async function fetchNashikWeather() {
  // Nashik coordinates: Latitude 20.0059, Longitude 73.7898
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=20.0059&longitude=73.7898&current_weather=true';
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API Error: HTTP status ${response.status}`);
  }
  
  const data = await response.json();
  const current = data.current_weather;
  
  return {
    location: 'Nashik, Maharashtra',
    temperature: current.temperature,
    windspeed: current.windspeed,
    weathercode: current.weathercode,
    time: current.time,
    condition: getConditionText(current.weathercode)
  };
}

function getConditionText(code) {
  if (code === 0) return 'Clear & Sunny Skies';
  if (code <= 3) return 'Partly Cloudy & Pleasant';
  if (code <= 48) return 'Foggy & Cool Breezes';
  if (code <= 67) return 'Light Monsoon Rain';
  if (code <= 82) return 'Refreshing Showers';
  return 'Overcast / Breezy';
}
