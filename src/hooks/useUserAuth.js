import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const fetchUserProfileUrl = import.meta.env.VITE_FETCH_USER_PROFILE_URL;

export const useUserAuth = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (!user) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(fetchUserProfileUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (!response.ok) {
            if (response.status === 401) {
              localStorage.removeItem("access_token");
              navigate("/login");
              return;
            } else {
              throw new Error("Failed to fetch user profile");
            }
          }

          const data = await response.json();
          const channelData = data?.items?.[0];
          console.log("userData", channelData);
          setUserData(channelData);

          if (!channelData) {
            const userInfoRes = await fetch(
              "https://www.googleapis.com/oauth2/v1/userinfo",
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            if (!userInfoRes.ok) throw new Error("Failed to fetch user info");

            const userInfo = await userInfoRes.json();
            setUserData(userInfo);
          }
        } catch (err) {
          console.error("Error fetching user:", err);
          localStorage.removeItem("access_token");
          navigate("/login");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [navigate, user]);

  return { userData, loading };
};
