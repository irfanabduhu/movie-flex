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
    const saved = localStorage.getItem("userInfo");
    if (saved) return JSON.parse(saved);
    return defaultInfo;
  });

  const setValue = (value) => {
    setUserInfo(value);
    localStorage.setItem("userInfo", JSON.stringify(value));
  };

  return [userInfo, setValue];
}
