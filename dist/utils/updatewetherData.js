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
const location_modal_1 = __importDefault(require("../models/location.modal"));
const connectToDb_1 = __importDefault(require("./connectToDb"));
const saveWetherForcast_1 = __importDefault(require("./saveWetherForcast"));
const updateWetherData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connectToDb_1.default)();
    const locations = yield location_modal_1.default.find();
    for (const location of locations) {
        (0, saveWetherForcast_1.default)(location.latitude, location.longitude, location.locationName);
        console.log("yo");
    }
});
updateWetherData();
