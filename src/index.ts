import "./lib/db";
import express from "express";
import countryRoutes from "./routes/country";
import storiesRoutes from "./routes/stories";


const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));



app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

app.get("/stories", async (req, res) => {
  const title = "Stories Section";

  // Build an HTML string with the title and stories
  const html = `
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <ul>
           TEST
        </ul>
      </body>
    </html>
  `;

  res.send(html);
});

app.use("/stories", storiesRoutes);
app.use("/countries", countryRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
