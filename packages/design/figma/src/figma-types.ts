// Manifest format compatible with Microsoft figma-variables-import plugin
// See https://github.com/microsoft/figma-variables-import/blob/main/demo/manifest.json
export type FigmaManifest = {
  name: string;
  collections: FigmaManifestCollection;
};

export type FigmaManifestCollection = {
  [key: string]: {
    modes: {
      [key: string]: string[];
    };
  };
};

export type FigmaTokenMode = {
  tokens: any; // TODO: type
  outputFilename: string;
};

export type FigmaTokenModes = {
  [key: string]: FigmaTokenMode;
};

export type FigmaTokenCollection = {
  modes: {
    [key: string]: FigmaTokenMode;
  };
};

export type FigmaTokenCollections = {
  [key: string]: FigmaTokenCollection;
};
