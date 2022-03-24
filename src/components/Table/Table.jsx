import React from "react";
import "./table.scss";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

const tableHeaders = [
  "First name",
  "Last name",
  "Gender",
  "Age",
  "Email",
  "Password",
];

export const Table = ({ data, headers = tableHeaders }) => {
  const { title, users } = data;

  if (!users || users.length === 0)
    return (
      <div>
        <caption className="table__caption">{title}</caption>
        <ErrorMessage
          text={`Sub-category '${title}' has no users`}
          size="medium"
        />
      </div>
    );

  return (
    <table className="table">
      <caption className="table__caption">{title}</caption>
      <thead>
        <tr className="table__row">
          {headers &&
            headers.map((header) => (
              <th className="table__headers" key={header}>
                {header}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => (
            <tr className="table__row" key={user.first_name + user.last_name}>
              {Object.keys(user).map((key, i) => (
                <td key={user[key]}>{user[key]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
