const express = require("express");
const routes = require("./routes/user");

const app = express();
const port = 3000;

const path = require("path");

// Set 'views' directory for any views files
app.set("views", path.join(__dirname, "views"));

// Set EJS as the template engine
app.set("view engine", "ejs");
app.use(express.json());

app.use(routes);

// Custom error-handling middleware
app.use((err, req, res, next) => {


  // Check if it's an EJS rendering error
  if (err.message && err.message.includes("Failed to lookup view")) {
    return res.status(404).json({ error: "Template not found." });

  }
 
  // Check if it's a custom string error
  if (typeof err === "string") {
    return res.status(400).json({ Error: err });
  } else {
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
  return  res.status(404).render("404")
});

// Route for handling "Not Found" (404) cases
app.use((req, res, next) => {
  res.status(404).render("404"); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
