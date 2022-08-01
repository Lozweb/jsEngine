import { Engine } from "./Engine.js";

let loop = null
let engine = new Engine("game", 800, 600, 1200, 800)
engine.load()
engine.run()