import { Engine } from "./Engine.js";

let engine = new Engine("game", 800, 600, 1024, 900)
engine.load()

let interval = setInterval(engine.test.bind(engine), 33)