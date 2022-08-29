import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckV from "../components/CheckV";
import NotCheckV from "../components/NotCheckV";
import { useAppSelector } from "../store/hooks";


interface User {
  uid: string;
  username: string;
  email: string;
  password: string;
  role: boolean;
}
const AdminScreen = () => {
  const user = useAppSelector((state: any) => state.user.user);

  const [allUsers, setAllUsers] = useState<User[] | []>([]);

  const getAllUsers = async () => {
    //console.log(user.token)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user!.token}`,
      },
    };

    const response = await axios.get(
      `http://localhost:5000/api/users/getAllUser`,
      config
    );
    setAllUsers(response.data);
  };
  useEffect(() => {
    getAllUsers();
  });
  return (
    <>
      <div className="w-full mt-6">
        <p className="text-xl pb-3 flex items-center">
          <i className="fas fa-list mr-3"></i> Active users
        </p>
        <div className="bg-white overflow-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Is admin
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Phone
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {allUsers ? (
                <>
                  {allUsers.map((user) => (
                    <tr key={user.uid}>
                      <td className="w-1/3 text-left py-3 px-4">
                        {user.uid}  {user.username} 
                      </td>
                      <td className="text-left py-3 px-4">
                        {user.role ? (<CheckV />) : (<NotCheckV />)}
                      </td>
                      <td className="text-left py-3 px-4">
                        <a className="hover:text-blue-500" href="tel:622322662">
                          622322662
                        </a>
                      </td>
                      <td className="text-left py-3 px-4">
                        <a
                          className="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          {user.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className="pt-3 text-gray-600">
          Source:{" "}
          <a
            className="underline"
            href="https://tailwindcomponents.com/component/striped-table"
          >
            https://tailwindcomponents.com/component/striped-table
          </a>
        </p>
      </div>

      <div className="w-full mt-12">
        <p className="text-xl pb-3 flex items-center">
          <i className="fas fa-list mr-3"></i> Table Example
        </p>
        <div className="bg-white overflow-auto">
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Name
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Last Name
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Phone
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Lian</td>
                <td className="py-4 px-6 border-b border-grey-light">Smith</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  622322662
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  jonsmith@mail.com
                </td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Lian</td>
                <td className="py-4 px-6 border-b border-grey-light">Smith</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  622322662
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  jonsmith@mail.com
                </td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Lian</td>
                <td className="py-4 px-6 border-b border-grey-light">Smith</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  622322662
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  jonsmith@mail.com
                </td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Lian</td>
                <td className="py-4 px-6 border-b border-grey-light">Smith</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  622322662
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  jonsmith@mail.com
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="pt-3 text-gray-600">
          Source:{" "}
          <a
            className="underline"
            href="https://tailwindcomponents.com/component/table"
          >
            https://tailwindcomponents.com/component/table
          </a>
        </p>
      </div>
    </>
  );
};

export default AdminScreen;
