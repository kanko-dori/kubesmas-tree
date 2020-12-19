#include <FastLED.h>
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

#define USE_SERIAL Serial

#define NUM_LEDS 150
#define DATA_PIN 13

// Illumination Pattern
#define STATIC 0
#define WAVE 1
#define RANDOM 2

// Parameters
#define WAIT_TIME_MILLIS 30000
#define WAVE_INTERVAL 8
#define WAVE_COLOR_VARIATION_WIDTH 1
#define RANDOM_INTERVAL 100
#define BRIGHTNESS 16
#define POD_MAGNIFICATION 3

WiFiMulti wifiMulti;

CRGB leds[NUM_LEDS];

/*
const char* ca = \ 
"-----BEGIN CERTIFICATE-----\n" \  
"MIIEkjCCA3qgAwIBAgIQCgFBQgAAAVOFc2oLheynCDANBgkqhkiG9w0BAQsFADA/\n" \  
"MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\n" \  
"DkRTVCBSb290IENBIFgzMB4XDTE2MDMxNzE2NDA0NloXDTIxMDMxNzE2NDA0Nlow\n" \  
"SjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUxldCdzIEVuY3J5cHQxIzAhBgNVBAMT\n" \  
"GkxldCdzIEVuY3J5cHQgQXV0aG9yaXR5IFgzMIIBIjANBgkqhkiG9w0BAQEFAAOC\n" \  
"AQ8AMIIBCgKCAQEAnNMM8FrlLke3cl03g7NoYzDq1zUmGSXhvb418XCSL7e4S0EF\n" \  
"q6meNQhY7LEqxGiHC6PjdeTm86dicbp5gWAf15Gan/PQeGdxyGkOlZHP/uaZ6WA8\n" \  
"SMx+yk13EiSdRxta67nsHjcAHJyse6cF6s5K671B5TaYucv9bTyWaN8jKkKQDIZ0\n" \  
"Z8h/pZq4UmEUEz9l6YKHy9v6Dlb2honzhT+Xhq+w3Brvaw2VFn3EK6BlspkENnWA\n" \  
"a6xK8xuQSXgvopZPKiAlKQTGdMDQMc2PMTiVFrqoM7hD8bEfwzB/onkxEz0tNvjj\n" \  
"/PIzark5McWvxI0NHWQWM6r6hCm21AvA2H3DkwIDAQABo4IBfTCCAXkwEgYDVR0T\n" \  
"AQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAYYwfwYIKwYBBQUHAQEEczBxMDIG\n" \  
"CCsGAQUFBzABhiZodHRwOi8vaXNyZy50cnVzdGlkLm9jc3AuaWRlbnRydXN0LmNv\n" \  
"bTA7BggrBgEFBQcwAoYvaHR0cDovL2FwcHMuaWRlbnRydXN0LmNvbS9yb290cy9k\n" \  
"c3Ryb290Y2F4My5wN2MwHwYDVR0jBBgwFoAUxKexpHsscfrb4UuQdf/EFWCFiRAw\n" \  
"VAYDVR0gBE0wSzAIBgZngQwBAgEwPwYLKwYBBAGC3xMBAQEwMDAuBggrBgEFBQcC\n" \  
"ARYiaHR0cDovL2Nwcy5yb290LXgxLmxldHNlbmNyeXB0Lm9yZzA8BgNVHR8ENTAz\n" \  
"MDGgL6AthitodHRwOi8vY3JsLmlkZW50cnVzdC5jb20vRFNUUk9PVENBWDNDUkwu\n" \  
"Y3JsMB0GA1UdDgQWBBSoSmpjBH3duubRObemRWXv86jsoTANBgkqhkiG9w0BAQsF\n" \  
"AAOCAQEA3TPXEfNjWDjdGBX7CVW+dla5cEilaUcne8IkCJLxWh9KEik3JHRRHGJo\n" \  
"uM2VcGfl96S8TihRzZvoroed6ti6WqEBmtzw3Wodatg+VyOeph4EYpr/1wXKtx8/\n" \  
"wApIvJSwtmVi4MFU5aMqrSDE6ea73Mj2tcMyo5jMd6jmeWUHK8so/joWUoHOUgwu\n" \  
"X4Po1QYz+3dszkDqMp4fklxBwXRsW10KXzPMTZ+sOPAveyxindmjkW8lGy+QsRlG\n" \  
"PfZ+G6Z6h7mjem0Y+iWlkYcV4PIWL1iwBi8saCbGS5jN2p8M+X+Q7UNKEkROb3N6\n" \  
"KOqkqm57TH2H3eDJAkSnh6/DNFu0Qg==\n" \  
"-----END CERTIFICATE-----\n";
*/

void setup() {

    USE_SERIAL.begin(115200);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    wifiMulti.addAP("uzuhouse", "uzuhouse");

    FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
    randomSeed(0);
}

void loop() {
    // wait for WiFi connection
    if((wifiMulti.run() == WL_CONNECTED)) {

        HTTPClient http;

        USE_SERIAL.print("[HTTP] begin...\n");
        http.begin("http://20.194.189.218/iot"); //HTTP

        USE_SERIAL.print("[HTTP] GET...\n");
        // start connection and send HTTP header
        int httpCode = http.GET();

        // httpCode will be negative on error
        if(httpCode > 0) {
            // HTTP header has been send and Server response header has been handled
            USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

            // file found at server
            if(httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                USE_SERIAL.println(payload);

                String first_data = "";
                String second_data = "";
                for(int i = 0; i < payload.length(); i++) {
                  const char c = payload.charAt(i);
                  if(c == ',') {
                    second_data = payload.substring(i + 1);
                    break;
                  } else {
                    first_data.concat(c);
                  }
                }

                const int pod = first_data.toInt();
                const int illuminationPattern = second_data.toInt();

                USE_SERIAL.print(pod);
                USE_SERIAL.print(" ");
                USE_SERIAL.println(illuminationPattern);

                

                //illuminate(pod, illuminationPattern);
                illuminate(1, 1);

                /*for(int i = 0; i < pod; i++) {
                  leds[i] = CRGB::Aqua;
                }
                FastLED.setBrightness(31);
                FastLED.show();*/
            }
        } else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }

        http.end();
    }
}

void illuminate(const int pod, const int illuminationPattern) {
  FastLED.setBrightness(BRIGHTNESS);
  switch(illuminationPattern) {
    case STATIC:
      illuminate_static(pod);
      break;
    case WAVE:
      illuminate_wave(pod);
      break;
    case RANDOM:
      illuminate_random(pod);
      break;
  }
  reset_LED();
  FastLED.show();
}

void illuminate_static(const int pod) {
  int num_lighted_LEDs = pod * POD_MAGNIFICATION;
  if(num_lighted_LEDs > NUM_LEDS) {
    num_lighted_LEDs = NUM_LEDS;
  }
  const int led_width = NUM_LEDS / num_lighted_LEDs;
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i] =
      i % led_width == 0
        ? CRGB::Aqua
        : CRGB::Black;
  }
  FastLED.show();
  delay(WAIT_TIME_MILLIS);
}

void illuminate_wave(const int pod) {
  for(int i = 0; i < WAIT_TIME_MILLIS / WAVE_INTERVAL; i++) {
    reset_LED();
    int num_lighted_LEDs = pod * POD_MAGNIFICATION;
    if(num_lighted_LEDs > NUM_LEDS) {
      num_lighted_LEDs = NUM_LEDS;
    }
    for(int j = 0; j < num_lighted_LEDs; j++) {
      leds[(i + j) % NUM_LEDS] = CHSV(((i + j) * WAVE_COLOR_VARIATION_WIDTH) % 256, 255, 255);
    }
    FastLED.show();
    delay(WAVE_INTERVAL);
  }
}

void illuminate_random(const int pod) {
  for(int i = 0; i < WAIT_TIME_MILLIS / RANDOM_INTERVAL; i++) {
    bool led_enabled[NUM_LEDS] = {false};
    int num_lighted_LEDs = pod * POD_MAGNIFICATION;
    if(num_lighted_LEDs > NUM_LEDS) {
      num_lighted_LEDs = NUM_LEDS;
    }
    for(int i = 0; i < num_lighted_LEDs; i++) {
      led_enabled[i] = true;
    }
    shuffle(led_enabled);
    for(int j = 0; j < NUM_LEDS; j++) {
      leds[j] =
        led_enabled[j]
          ? CHSV(random(256), 255, 255)
          : CHSV(0, 0, 0);
    }
    FastLED.show();
    delay(RANDOM_INTERVAL);
  }
}

void reset_LED() {
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Black;
  }
}

void shuffle(bool arr[]) {
  for(int i = 0; i < NUM_LEDS; i++) {
    int j = random(NUM_LEDS);
    int t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
}
