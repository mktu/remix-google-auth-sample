import { GoogleStrategy } from "remix-auth-google";
import authenticator from './auth.server'
import type { AuthUserType } from './auth.server'

let googleStrategy: GoogleStrategy<AuthUserType> | null = null

export const StrategyName = 'google'

const initGoogleAuthenticator = ({
    clientID,
    clientSecret,
    callbackURL
}: {
    clientID: string,
    clientSecret: string,
    callbackURL: string
}) => {
    if (googleStrategy) {
        return authenticator // リクエストのたびに呼び出されるので、初期化済みの場合は早期リターン
    }
    googleStrategy = new GoogleStrategy<AuthUserType>(
        {
            clientID,
            clientSecret,
            callbackURL,
        },
        // 認証成功後、GoogleProfileから任意のユーザ情報を返却するためのコールバック（このデータがSessionStorageに保存される）
        async ({ profile }) => {
            return {
                name: profile.displayName,
                email: profile.emails.length > 0 ? profile.emails[0].value : '',
                id: profile.id,
            }
        }
    );
    authenticator.use(googleStrategy); // ここでStrategyを登録する
    return authenticator
}

export default initGoogleAuthenticator