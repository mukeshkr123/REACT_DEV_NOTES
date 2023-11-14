import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(" ");
  const [isloading, setisloading] = useState(false);

  //useEffect
  useEffect(() => {
    setisloading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setisloading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setisloading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isloading, setError, setUsers };
};

export default useUsers;
