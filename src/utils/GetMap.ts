const ASSETS_ROOT_URL =
  "https://dofustouch.cdn.ankama.com/assets/2.29.5_uEYSCGYeBgZONQA0k6VU4EPI6.0%27T)Wk";

export async function getMapData(mapId: number) {
  return fetch(`${ASSETS_ROOT_URL}/maps/${mapId}.json`).then(e => e.json());
}
