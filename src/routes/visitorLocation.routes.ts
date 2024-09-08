import axios from "axios";
import express from "express";
import sendVisitorMail from "../utils/sendMail";

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string; // "loc" contains latitude and longitude as a comma-separated string
  org: string;
  postal: string;
  timezone: string;
}

const router = express.Router();
router.post("/", async (req, res) => {
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
    const response = await axios.get<LocationData>(
      `https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`
    );

    const mailResponse = sendVisitorMail(
      Date.now().toString(),
      "5 min",
      `${response.data.city},${response.data.region},${response.data.country}`
    ).then((result) => {
      return res.send({ data: result });
    });
  } catch (error) {
    console.error("Error fetching location data:", error);
    return res.status(500).send("Unable to retrieve location data");
  }
});

export default router;
