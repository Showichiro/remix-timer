import { useOutletContext } from "@remix-run/react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { FC } from "react";

type Props = {
  isLogin: boolean;
  picture?: string;
  url: string;
};

export const Nav: FC<Props> = ({ isLogin, picture, url }) => {
  const { supabase } = useOutletContext<{
    supabase: SupabaseClient;
  }>();
  return (
    <div className="sticky top-0 z-50 px-2">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="text-xl normal-case">Timer App</div>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            {isLogin && (
              <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full">
                  <img
                    src={picture}
                    referrerPolicy="no-referrer"
                    alt="user_icon"
                  />
                </div>
              </label>
            )}
            {!isLogin && (
              <button
                className="btn btn-primary"
                onClick={() =>
                  supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: `${new URL(url).origin}/auth/callback`,
                    },
                  })
                }
              >
                Login
              </button>
            )}
            {isLogin && (
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <button onClick={() => supabase.auth.signOut()}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
