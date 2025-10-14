"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// external module
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// local module
const credentialRoutes_1 = __importDefault(require("./routes/credentialRoutes"));
const error_1 = require("./controller/error");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded());
app.use(credentialRoutes_1.default);
app.use(error_1.errorHandler);
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map