const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api/api-routes");
const authRoutes = require("./auth/auth-routes");
const htmlRoutes = require("./html/html-routes");

// API Routes
router.use("/", htmlRoutes);
router.use("/", authRoutes);
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
// router.use((req, res) =>
//   res.sendFile(path.join(__dirname, "../client/build/index.html"))
// );

module.exports = router;