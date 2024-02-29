import React, { useEffect, useState } from "react";

export function useProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<any>({});

  useEffect(() => {
    setData(true);
    fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data?.admin || false);
        setUserDetail(data);
        setLoading(false);
      });
  }, []);

  return { loading, data, userDetail };
}
