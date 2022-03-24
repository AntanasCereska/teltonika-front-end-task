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
          {headers && headers.map((header) => <td key={header}>{header}</td>)}
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => (
            <tr className="table__row">
              {Object.keys(user).map((key) => (
                <td key={user + key}>{user[key]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
