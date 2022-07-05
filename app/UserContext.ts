import { createContext } from "react";
import type { AuthUserType } from "./utils/auth.server";

export default createContext<AuthUserType>({
    id: '',
    name: '',
    email: ''
});