import {FlowmapCity, ProjectConfig} from "@flowmapcity/sdk";
import {useEffect, useRef} from "react";

const FLOWMAP_CITY_TOKEN = import.meta.env.VITE_FLOWMAP_CITY_TOKEN;

const BASE_URL =
  "https://pub-16f46c514a8e4ae7b615264c75e6a974.r2.dev/global-flights-2010";

const COLOR_SCHEME =
  "#ffffe0,#c5eddf,#a5d5d8,#8abccf,#73a2c6,#5d8abd,#4771b2,#2e59a8,#00429d";

const config: ProjectConfig = {
  dataSources: [
    {type: "url", tableName: "locations", url: `${BASE_URL}/locations.parquet`},
    {type: "url", tableName: "flows", url: `${BASE_URL}/flows.parquet`},
  ],
  views: [
    {
      id: "flowmap",
      type: "od-flowmap",
      columnMapping: {
        locations: {
          tableName: "locations",
          columns: {id: "id", name: "name", lat: "lat", lon: "lon"},
        },
        flows: {
          tableName: "flows",
          columns: {origin: "origin", dest: "dest", count: "count"},
        },
      },
      viewport: {longitude: -100, latitude: 40, zoom: 3},
      settings: {colorScheme: COLOR_SCHEME.split(",")},
    },
  ],
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowmapCityRef = useRef<FlowmapCity>();
  useEffect(() => {
    if (containerRef.current && !flowmapCityRef.current) {
      const flowmapCity = new FlowmapCity({
        accessToken: FLOWMAP_CITY_TOKEN,
        container: containerRef.current,
        config,
        options: {readOnly: true, showSidebar: true},
      });
      flowmapCityRef.current = flowmapCity;
    }
  }, []);
  return <div ref={containerRef} />;
}

export default App;
