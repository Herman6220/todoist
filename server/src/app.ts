import express from "express";
import cors, { type CorsOptions } from "cors";
import type { Request } from "express";
import cookieParser from "cookie-parser";

const app = express();

// const dynamicCorsOptions = (req: Request, callback: (err: Error | null, options?: CorsOptions) => void) => {
//     let corsOptions;
//     // console.log(req.path);

//     if (req.path.startsWith("/api/v1/user/auth")) {
//         corsOptions = {
//             origin: process.env.CLIENT_URL,
//             credentials: true
//         };
//     }else{
//         corsOptions = {origin: "*"}
//     }

//     callback(null, corsOptions);
// }

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import taskRouter from "./routes/task.routes";
import tableRouter from "./routes/table.routes";
import userRouter from "./routes/user.routes";

app.use("/api/v1/task", taskRouter)
app.use("/api/v1/table", tableRouter)
app.use("/api/v1/user", userRouter)

export default app;