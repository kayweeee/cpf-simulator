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
    const auth = authenticated();
    const router = useRouter();

    useEffect(() => {
      if (!auth) {
        router.push("/");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
