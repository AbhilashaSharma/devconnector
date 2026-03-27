const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API Running"));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
