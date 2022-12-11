export default async function Single(req, res) {
  let x = req.query.id;
  try {
    return res.send(`SINGLE DATA ${x}`);
  } catch (er) {
    console.log(er.mesage);
  }
}
