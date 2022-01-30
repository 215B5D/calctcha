/**
 * @author false <false@envs.net>
 */

// Dependencies
import express from "express";
import Calctcha from "./src/Calctcha.js";

// Variables
const app = express();

// Constants
const SHOW_ANSWER = true; // Disable this if you'd like to mask the answer, this is enabled for debugging purposes.

// Serve all files from `./public`
app.use(express.static("./public"));

app.get("/captcha", (_req, res) => {
  const captcha = new Calctcha("#FFF", 0, 20, 400, 150);

  return res.status(200).json({
    code: 200,
    captcha: captcha.create(),
    answer: (SHOW_ANSWER ? captcha.answer : null)
  });
});

app.listen(2000, () => {
  console.log(`[x] You can view Calctcha here: http://localhost:2000`);
}).once("error", e => console.log(`[x] Unable to bind (port 2000), reason: ${e.code}`));