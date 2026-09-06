import app from "./src/app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`your server is running on localhost:${port}`);
});
