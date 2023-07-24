const express = require("express");
const routes = require("./routes/user")

const app = express();
const port = 3000;

app.use(express.json());

app.use(routes);

// Custom error-handling middleware
app.use((err, req, res, next) => {
  console.error(err); 

 
  if (typeof err === "string") {
    return res.status(400).json({ Error: err });
  } else {
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
