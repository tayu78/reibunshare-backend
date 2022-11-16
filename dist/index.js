"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`This app is running on port ${PORT} !!`);
});
