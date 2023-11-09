import {
  type LoaderFunctionArgs,
  type MetaFunction,
  type ActionFunctionArgs,
  json,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { User } from "@supabase/auth-helpers-remix";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { Nav } from "~/components/Nav";
import { Main } from "~/components/layout/Main";
import AddButton from "~/features/timer/AddButton";
import { CountdownTimer } from "~/features/timer/CountdownTimer";
import type { Env } from "~/types/Env";
import type { Database } from "~/types/database";

export const meta: MetaFunction = () => {
  return [
    { title: "タイマー" },
    {
      name: "description",
      lang: "ja",
      content:
        "自由にタイマーの数や時間を設定できるタイマーです。設定したタイマーは自動で保存されるのでブラウザを閉じて再度開いても同じタイマーを起動することが出来ます。",
    },
    {
      name: "description",
      lang: "en",
      content:
        "Countdown timer application. You can set as many timers as you want. The timers are stored, so they are not lost even if you close the browser.",
    },
  ];
};

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = new Response();
  const env = context.env as Env;
  const supabaseClient = createServerClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    { request, response }
  );
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  return {
    user,
    timerList:
      (await supabaseClient.from("timer").select("*").order("id")).data ?? [],
    url: request.url,
  };
};

export async function action({ request, context }: ActionFunctionArgs) {
  const body = await request.formData();
  const response = new Response();
  const env = context.env as Env;
  const supabaseClient = createServerClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    { request, response }
  );
  const action = body.get("action");
  switch (action) {
    case "edit-time": {
      const id = body.get("id");
      const hour = body.get("hour");
      const minute = body.get("minute");
      const second = body.get("second");
      if (!id || !hour || !minute || !second) {
        return json({
          data: null,
        });
      }
      const { data } = await supabaseClient
        .from("timer")
        .update({
          hour: Number(hour),
          minute: Number(minute),
          second: Number(second),
        })
        .eq("id", id)
        .select()
        .single();
      return json({ data });
    }
    case "edit-title": {
      const id = body.get("id");
      const name = body.get("name");
      console.log(id, name);
      if (!id || !name) {
        return json({ data: null });
      }
      const { data } = await supabaseClient
        .from("timer")
        .update({
          name: name as string,
        })
        .eq("id", Number(id))
        .select("*")
        .single();
      return json({ data });
    }
    case "add": {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (!user) {
        return json({
          data: null,
        });
      }
      const { data } = await supabaseClient
        .from("timer")
        .insert({ user_id: user.id, name: "タイマー" })
        .select("*")
        .single();
      return json({
        data,
      });
    }
    case "delete": {
      const id = body.get("id");
      if (!id) {
        return json({ data: null });
      }
      await supabaseClient.from("timer").delete().eq("id", Number(id));
      return json({ data: null });
    }
    default: {
      return json({
        data: null,
      });
    }
  }
}

export default function Index() {
  const { user, timerList, url } = useLoaderData<{
    user: User | null;
    timerList: Database["public"]["Tables"]["timer"]["Row"][];
    url: string;
  }>();

  return (
    <>
      <Nav
        isLogin={!!user}
        picture={user?.user_metadata["picture"]}
        url={url}
      />
      {user ? (
        <Main>
          <div className="grid grid-cols-1 gap-3 pt-2 xl:grid-cols-3">
            {timerList.map((timer) => (
              <CountdownTimer
                key={`timer-${timer.id}-${timer.hour}-${timer.minute}-${timer.second}-${timer.name}-${timerList.length}`}
                timerValue={timer}
              />
            ))}
          </div>
          <AddButton />
        </Main>
      ) : (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>You need to Login</span>
        </div>
      )}
    </>
  );
}
