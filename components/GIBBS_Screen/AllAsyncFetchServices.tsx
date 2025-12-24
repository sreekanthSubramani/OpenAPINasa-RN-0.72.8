import { axiosapi } from "../../axios/configAxios";
import type { ArrayFields } from "../../Types/component-types";
import { SecureKeychain } from "../../src/config/secureStorage";

const mapillaryToken = "MLY|25179013605115819|ec37b75e7d602866f88ebe91a74ef354"
const openWeatherAPIKEY = '9a8ca5fdddbd3327a4aa57a4802540f4'
const openReverseGeoCoding = 'a0956970c3c70a1386c38c58e1fe9bd7'


export async function reverseGeo(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=${openReverseGeoCoding}`
  );
  return res.json();
}

export async function fetchWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAPIKEY}`
  );
  return res.json();
}

export async function fetchMapillary(minLat : number, minLon : number, maxLat : number, maxLon : number) {
  const res = await fetch(
    `https://graph.mapillary.com/images?` +
      `access_token=${mapillaryToken}` +
      `&fields=thumb_256_url` +
      `&bbox=${minLon},${minLat},${maxLon},${maxLat}` +
      `&limit=5`
  );
  const json = await res.json();
  return json?.data?.map((d : any) => d.thumb_256_url) ?? [];
}

export async function locationServiceArray(data : ArrayFields){

  const acc = await SecureKeychain.getAccessToken()
  const ref = await SecureKeychain.getRefreshToken()


    const dbLocationUpdater = await axiosapi.post('/location/arr/places',{
      lat : data.lat,
      long : data.long,
      name : data.name,
      state : data.state,
      country : data.country,
    })

    const resp = dbLocationUpdater.data
    console.log(resp)

}
