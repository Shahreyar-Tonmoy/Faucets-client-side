import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";

const useAdmin = () => {
  const axiosSecure = UseAxios();

  const { data: isAdmin = false, isLoading, isError } = useQuery({
    queryKey: ['adminVerification'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/auth/profile/verifyadmin');
        return response?.data?.admin;
      } catch (error) {
        throw new Error(error?.response?.data.admin);
      }
    },
  });

  

  return {
    isAdmin,
    isLoading,
    isError,
  };
};

export default useAdmin;
