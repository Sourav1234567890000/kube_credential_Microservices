"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataPath = void 0;
const path_1 = __importDefault(require("path"));
const rootDir = path_1.default.dirname(require.main.filename);
const getDataPath = (fileName) => {
    return path_1.default.join(rootDir, "data", fileName);
};
exports.getDataPath = getDataPath;
exports.default = rootDir;
//# sourceMappingURL=pathUtils.js.map