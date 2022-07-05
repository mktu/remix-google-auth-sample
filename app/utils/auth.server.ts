import { Authenticator } from "remix-auth";
import * as sessionStorage from "./session.server";

export type AuthUserType = { // 今回は簡易的に、googleの認証情報からこれらを取得する
    id: string,
    name: string,
    email: string
}

const authenticator = new Authenticator<AuthUserType>(sessionStorage)

export default authenticator