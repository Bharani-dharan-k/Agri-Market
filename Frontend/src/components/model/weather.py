import requests

API_KEY = "e03312c0b0fcd4347e4c83c430b827ff"  # Replace with your OpenWeather API key

def get_weather(city):
    """
    Fetches real-time weather data from OpenWeather API.
    """
    if not city:
        return None  # No city provided

    URL = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(URL)
        data = response.json()

        if response.status_code == 200:
            return {
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "pressure": data["main"]["pressure"],
                "wind_speed": data["wind"]["speed"]
            }
        else:
            print(f"❌ Weather API Error: {data}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
        return None
