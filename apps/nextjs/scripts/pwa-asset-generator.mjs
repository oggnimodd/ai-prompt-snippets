import pwaAssetGenerator from "pwa-asset-generator";
import { resolve } from "path";
import * as url from "url";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));
const r = (path) => resolve(dirname, path);

pwaAssetGenerator
  .generateImages(r("../assets/icon-round.svg"), r("../public"), {
    pathOverride: "",
    iconOnly: true,
    splashOnly: true,
    portraitOnly: true,
    favicon: true,
    maskable: false,
    log: false,
    xhtml: true,
    manifest: r("../public/manifest.json"),
    index: r("../src/components/PwaMeta.tsx"),
    opaque: false,
    type: "png",
  })
  .then(() => {
    console.log("Pwa Assets Generation Finished");
  })
  .catch((err) => {
    console.log(err);
    console.log("Pwa Assets Generation Failed");
  });
