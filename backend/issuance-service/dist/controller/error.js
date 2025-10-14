"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (req, res, next) => {
    console.log(req.method);
    res.status(404).send("Not Found");
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map