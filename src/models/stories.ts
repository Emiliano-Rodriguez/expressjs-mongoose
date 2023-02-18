import { model, Schema, Document } from "mongoose";

interface IStories extends Document {
  name: string;
  iso2code: string;
}

const StoriesSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  iso2code: {
    type: String,
  },
});

const StoriesModel = model<IStories>("Stories", StoriesSchema);

export { CountryStories, IStories };
