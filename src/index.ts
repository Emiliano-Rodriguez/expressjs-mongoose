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

  try {
    const stories = await StoriesRoutes.find();
    const storiesData = stories.map(story => {
      return {
        title: story.title,
        content: story.content
      }
    });

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
            ${storiesData.map(story => `<li><h2>${story.title}</h2><p>${story.content}</p></li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    res.send(html);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});



app.use("/stories", storiesRoutes);
app.use("/countries", countryRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
