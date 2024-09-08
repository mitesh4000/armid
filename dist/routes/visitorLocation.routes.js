"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.IPINFO_API_KEY) {
            return res
                .status(400)
                .json({ error: "Environment variable not provided" });
        }
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        if (!ip) {
            return res.send({ data: "ip not provided" });
        }
        const response = yield axios_1.default.get(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`);
        const mailResponse = (0, sendMail_1.default)(Date.now().toString(), "5 min", `${response.data.city},${response.data.region},${response.data.country}`).then((result) => {
            return res.send({ data: result });
        });
    }
    catch (error) {
        console.error("Error fetching location data:", error);
        return res.status(500).send("Unable to retrieve location data");
    }
}));
exports.default = router;
