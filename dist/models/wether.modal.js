"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const weatherSchema = new mongoose_1.default.Schema({
    time: { type: Date, required: true },
    location: { latitude: Number, longitude: Number },
    locationName: String,
    values: {
        cloudBaseAvg: Number,
        cloudBaseMax: Number,
        cloudBaseMin: Number,
        cloudCeilingAvg: Number,
        cloudCeilingMax: Number,
        cloudCeilingMin: Number,
        cloudCoverAvg: Number,
        cloudCoverMax: Number,
        cloudCoverMin: Number,
        dewPointAvg: Number,
        dewPointMax: Number,
        dewPointMin: Number,
        evapotranspirationAvg: Number,
        evapotranspirationMax: Number,
        evapotranspirationMin: Number,
        humidityAvg: Number,
        humidityMax: Number,
        humidityMin: Number,
        pressureSurfaceLevelAvg: Number,
        pressureSurfaceLevelMax: Number,
        pressureSurfaceLevelMin: Number,
        rainAccumulationAvg: Number,
        rainAccumulationLweAvg: Number,
        rainAccumulationLweMax: Number,
        rainAccumulationLweMin: Number,
        rainAccumulationMax: Number,
        rainAccumulationMin: Number,
        rainIntensityAvg: Number,
        rainIntensityMax: Number,
        rainIntensityMin: Number,
        sunriseTime: Date,
        sunsetTime: Date,
        temperatureApparentAvg: Number,
        temperatureApparentMax: Number,
        temperatureApparentMin: Number,
        temperatureAvg: Number,
        temperatureMax: Number,
        temperatureMin: Number,
        visibilityAvg: Number,
        visibilityMax: Number,
        visibilityMin: Number,
        windDirectionAvg: Number,
        windGustAvg: Number,
        windGustMax: Number,
        windGustMin: Number,
        windSpeedAvg: Number,
        windSpeedMax: Number,
        windSpeedMin: Number,
    },
});
const Weather = mongoose_1.default.model("WeatherForcast", weatherSchema);
exports.default = Weather;
