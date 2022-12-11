import mongoose from "mongoose";
const file = {
  name: { type: String },
  powers: { type: Array },
  villains: { type: Array },
  health: { type: Number },
  metadata: { type: Object },
};
const heroSchema = new mongoose.Schema(file);
const heroModel = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
export default heroModel;
