import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { createServerClient } from "@supabase/auth-helpers-remix";
import type { Env } from "~/types/Env";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const response = new Response();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const env = context.env as Env;

  if (code) {
    const supabaseClient = createServerClient(
      env.SUPABASE_URL,
      env.SUPABASE_ANON_KEY,
      { request, response }
    );
    await supabaseClient.auth.exchangeCodeForSession(code);
  }

  return redirect("/", {
    headers: response.headers,
  });
};
