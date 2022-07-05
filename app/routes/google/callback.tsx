import type { LoaderFunction } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'
import authenticator from '~/utils/auth.server'
import { commitSession, getSession } from '~/utils/session.server'
import { StrategyName } from '~/utils/googleStrategy.server'
// ログイン成功後にリダイレクトされる
export let loader: LoaderFunction = async ({ request }) => {
    // /google/loginの時と同じインタフェースだが、ここではリダイレクトされずにURLパラメータから必要な情報素抽出しユーザ情報に変換する
    const user = await authenticator.authenticate(StrategyName, request)
    if (!user) {
        return redirect('/login')
    }

    let session = await getSession(request.headers.get("Cookie"));
    // cookie session storageに認証情報を保存
    session.set(authenticator.sessionKey, user);
    session.set(authenticator.sessionStrategyKey || "strategy", StrategyName);
    const cookie = await commitSession(session, {
        expires: new Date(Date.now() + 600_000),
    })
    const rediretOption = {
        headers: { "Set-Cookie": cookie },
    }

    return redirect('/app', rediretOption)
}