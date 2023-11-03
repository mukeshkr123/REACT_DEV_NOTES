import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => {
  const fetchPosts = () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"], // whenever userId is changed react qery fetch post to this user // depenednecy a
    queryFn: fetchPosts,
    staleTime: 10 * 60 * 60 * 1000, // in seconds
  });
};

export default usePosts;
