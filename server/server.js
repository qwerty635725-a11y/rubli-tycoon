const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("../public"));

let db = { players: [] };

if (fs.existsSync("db.json")) {
  db = JSON.parse(fs.readFileSync("db.json"));
}

function save() {
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
}

app.post("/save", (req, res) => {
  const data = req.body;
  const i = db.players.findIndex(p => p.name === data.name);
  if (i >= 0) db.players[i] = data;
  else db.players.push(data);
  save();
  res.send({ ok: true });
});

app.get("/leaderboard", (req, res) => {
  res.send(
    db.players
      .sort((a,b)=>b.money-a.money)
      .slice(0,10)
  );
});

app.listen(PORT, () => console.log("Server started on", PORT));
