import { Engine } from "./Engine.js";

let loop = null
let engine = new Engine("game", 1200, 760)
engine.load()
engine.run()