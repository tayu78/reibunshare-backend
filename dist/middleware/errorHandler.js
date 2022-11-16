"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    return res.json({
        message: "Something went wrong.",
        err
    });
};
exports.default = errorHandler;
