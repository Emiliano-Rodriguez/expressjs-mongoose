import { model, Schema, Document } from "mongoose";

interface IStories extends Document {
  title: string;
  content: string;
  date: string;
  iso2code: string;
}

const StoriesSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
    unique: true,
  },
  date: {
    type: String,
    unique: true,
  },
  iso2code: {
    type: String,
  },
});

const StoriesModel = model<IStories>("Stories", StoriesSchema);

export { StoriesModel, IStories };
