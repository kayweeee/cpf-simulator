"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function authenticated() {
  if (typeof window !== "undefined") {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    return loggedUserJSON ? true : false;
  }
  return false;
}

export default function isAuth(Component) {
  return function IsAuth(props) {
    const router = useRouter();

    useEffect(() => {
      const auth = authenticated();
      if (!auth) {
        router.push("/");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
