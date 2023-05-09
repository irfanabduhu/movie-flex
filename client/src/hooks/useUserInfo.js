import { useState } from "react";

const defaultInfo = {
  userId: "",
  token: "",
  name: "",
  email: "",
  plan: "",
};

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState(() => {
    const saved = window.localStorage.getItem("userInfo");
    if (saved) return JSON.parse(saved);
    return defaultInfo;
  });

  const setValue = (value) => {
    setUserInfo(value);
    window.localStorage.setItem("userInfo", JSON.stringify(value));
  };

  return [userInfo, setValue];
}
