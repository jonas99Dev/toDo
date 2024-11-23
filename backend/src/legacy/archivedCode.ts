// ************************ koden är slut här ***********************

// ********  Prometheus

// const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
// collectDefaultMetrics();

// const httpRequestCounter = new Prometheus.Counter({
//   name: "http_requests_total",
//   help: " Total number of HTTP requests made",
//   labelNames: ["method", "route", "status"],
// });

// *********  Kanske lägger till detta igen om jag får tid

// Middleware för att räkna HTTP-förfrågningar
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.on("finish", () => {
//     httpRequestCounter.inc({
//       method: req.method,
//       route: req.route ? req.route.path : req.path,
//       status: res.statusCode,
//     });
//   });
//   next();
// });

// Exponera Prometheus metrics på en separat endpoint
// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", Prometheus.register.contentType);
//   res.end(await Prometheus.register.metrics());
// });

// app.get("/", (req, res) => {
//   res.send({ Hello: "world" });
// });
