import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import authenticator from '~/utils/auth.server'
import { Form } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request)
    if (user) {
        return redirect('/app') // 認証済みの場合、appページへリダイレクト
    }
    return json({})
};
export const LoginPage: React.FC = () => {
    return (
        <div>
            <h1>Login Page</h1>
            {/* routes/google/login.tsxのactionが呼び出される */}
            <Form action="/google/login" method="post">
                <button>login with google</button>
            </Form>
        </div>
    )
}
export default LoginPage