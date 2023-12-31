import puppeteer from "puppeteer";

const html = `
<html>
  <head>
    <title>Leaflet Polyline Example</title>

    <link
      rel="stylesheet"
      crossorigin="anonymous"
      href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
    />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet-src.min.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>

    <style>
      .leaflet-container {
        background: none !important;
      }
    </style>

    <script language="javascript">
      function init() {
        var map = new L.Map("map", {
          preferCanvas: true,
          zoomControl: false,
        });

        L.tileLayer("", {
          maxZoom: 40,
        }).addTo(map);
        map.attributionControl.setPrefix(""); // Don't show the 'Powered by Leaflet' text.

        //Define an array of Latlng objects (points along the line)
        var data = [
          ["12.93361", "77.62102"],
          ["12.93359", "77.62035"],
          ["12.93372", "77.61939"],
          ["12.93351", "77.61845"],
          ["12.93374", "77.61754"],
          ["12.93408", "77.61671"],
          ["12.93472", "77.61604"],
          ["12.93549", "77.61554"],
          ["12.93555", "77.61487"],
          ["12.93514", "77.61404"],
          ["12.93469", "77.61312"],
          ["12.93408", "77.61269"],
          ["12.93333", "77.61313"],
          ["12.93253", "77.61356"],
          ["12.93174", "77.61391"],
          ["12.93083", "77.61434"],
          ["12.93002", "77.61478"],
          ["12.92947", "77.61464"],
          ["12.92966", "77.61375"],
          ["12.93010", "77.61296"],
          ["12.93060", "77.61214"],
          ["12.93092", "77.61115"],
          ["12.93102", "77.61022"],
          ["12.93089", "77.60941"],
          ["12.93095", "77.60851"],
          ["12.93129", "77.60774"],
          ["12.93098", "77.60699"],
          ["12.93084", "77.60610"],
          ["12.93071", "77.60511"],
          ["12.93073", "77.60419"],
          ["12.93079", "77.60319"],
          ["12.93093", "77.60228"],
          ["12.93107", "77.60136"],
          ["12.93077", "77.60070"],
          ["12.92987", "77.60063"],
          ["12.92889", "77.60060"],
          ["12.92828", "77.60024"],
          ["12.92830", "77.59933"],
          ["12.92832", "77.59837"],
          ["12.92834", "77.59742"],
          ["12.92758", "77.59720"],
          ["12.92673", "77.59719"],
          ["12.92574", "77.59715"],
          ["12.92479", "77.59712"],
          ["12.92384", "77.59710"],
          ["12.92310", "77.59680"],
          ["12.92311", "77.59581"],
          ["12.92267", "77.59526"],
          ["12.92218", "77.59386"],
        ];
        var polylinePoints = [];
        for (var i = 0; i < data.length; i++) {
          polylinePoints.push(new L.LatLng(data[i][0], data[i][1]));
        }

        var polylineOptions = {
          color: "white",
          weight: 3,
        };

        var polyline = new L.Polyline(polylinePoints, polylineOptions);

        map.addLayer(polyline);

        // zoom the map to the polyline
        map.fitBounds(polyline.getBounds());
      }
    </script>
  </head>
  <body onLoad="javascript:init();">
    <div id="map" style="height: 300px; width: 300px"></div>
  </body>
</html>

`;

(async () => {
  let args = [];
  args.push("--no-sandbox");
  args.push("--disable-setuid-sandbox");
  args.push("--font-render-hinting=none");
  args.push("--force-color-profile=srgb");

  const browser = await puppeteer.launch({
    args: args,
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    );

    await page.setContent(html, { timeout: 30000, waitUntil: "load" });

    const leafletCanvasImage = await page.evaluate(() =>
      Array.from(document.getElementsByTagName("canvas"), (e) => e.toDataURL())
    );
    console.log(leafletCanvasImage[0]);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
