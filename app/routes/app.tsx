import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import UserContext from "~/UserContext";
import type { AuthUserType } from '~/utils/auth.server'
import authenticator from '~/utils/auth.server'

type LoaderData = {
    user: AuthUserType
}

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request)
    if (!user) { // 未ログインのユーザはログインページにリダイレクト
        return redirect('/login')
    }
    return json<LoaderData>({
        user
    })
};

export const App: React.FC = () => {
    const { user } = useLoaderData() as LoaderData;
    // コンテキスト等使うことで、user情報をapp配下の各コンポーネントで参照できるようになる
    return (
        <UserContext.Provider value={user}>
            <Outlet />
            <Form action='/logout' method='post'>
                <button>Logout</button>
            </Form>
        </UserContext.Provider>
    )
}

export default App