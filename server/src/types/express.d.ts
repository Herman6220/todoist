import type { HydratedDocument } from "mongoose";
import type { UserInterface } from "../models/user.model";

declare global{
    namespace Express{
        interface Request{
            user: HydratedDocument<UserInterface>
        }
    }
}