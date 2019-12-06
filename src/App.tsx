import React, { useState, useCallback } from "react";
import "./App.css";
import { DofusMapViewer } from "./components/MapViewer";
import { MapChangeDirections } from "./utils/MapChangeDirections";
import { getMapData } from "./utils/GetMap";

interface WayPoint {
  date: Date;
  pos: string;
  mapId: number;
  direction: MapChangeDirections;
  path: string;
}
interface MapData {
  data: any;
  path: number[];
  waypoint: WayPoint;
}

const App: React.FC = () => {
  const [data, setData] = useState<MapData[]>([]);

  const onJson = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const cometFile = files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const res = fileReader.result as string;
        const waypoints: WayPoint[] = JSON.parse(res);
        Promise.all(
          waypoints.map(e => getMapData(e.mapId)
            .then(data => ({
                data,
                path: e.path.split(",").map(e => Number(e)),
                waypoint: e
              })
            ))
        ).then(setData);
      };
      fileReader.readAsText(cometFile);
    }
  }, []);

  return (
    <div className="App">
      <input onChange={onJson} accept=".json" type="file" />
      {data.map(e => (
          <div key={String(e.waypoint.date)}>
            <h2>{` Map : ${e.waypoint.pos} - Direction : ${
              MapChangeDirections[e.waypoint.direction]
            } - MapId : ${e.waypoint.mapId}`}</h2>
            <DofusMapViewer scale={0.60} path={e.path} data={e.data} />
          </div>
        )
      )}
    </div>
  );
};

export default App;
