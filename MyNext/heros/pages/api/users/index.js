import { connect } from "mongoose";
import heroModel from "../../../model/hero.model";

export default async function data(req, res) {
  try {
    await connect("mongodb://127.0.0.1:27017/B20");
    const data = await heroModel.find();
    return res.status(200).send(data);
  } catch (er) {
    return res.status(200).send(er.message);
  }
}
