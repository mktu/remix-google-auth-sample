import { redirect } from '@remix-run/cloudflare'
import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare'
import authenticator from '~/utils/auth.server'
import { StrategyName } from '~/utils/googleStrategy.server'

// 直接/google/loginにブラウザでアクセスした場合、/loginにリダイレクトする
export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = ({ request }) => {
    return authenticator.authenticate(StrategyName, request)
}