import { Router } from "express";
import { StoriesModel, IStories } from "../models/stories";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const countries: IStories[] = await StoriesModel.find().exec();
    return res.json(countries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});


routes.get("/stories", async (req: Request, res: Response) => {
  try {
    const stories = await StoriesModel.find();
    const storiesData = stories.map(story => {
      return {
        title: story.title,
        content: story.content
      }
    });
    res.json(storiesData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


routes.post("/", async (req, res) => {
  try {
    const stories: IStories = req.body;

    const storiesExists = await StoriesModel.findOne({
      name: stories.date,
    }).exec();

    if (storiesExists) {
      return res
        .status(409)
        .json({ error: "There is already another stories with this date" });
    }

    const newStory = await StoriesModel.create(stories);
    return res.status(201).json(newStory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
