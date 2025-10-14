import path from "path";

const rootDir = path.dirname(require.main!.filename);

export const getDataPath = (fileName: string) => {
  return path.join(rootDir, "data", fileName);
};

export default rootDir;
