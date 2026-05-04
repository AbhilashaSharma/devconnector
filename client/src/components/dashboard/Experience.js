import React, { Fragment } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../actions/profile";

function Experience({ experience }) {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience &&
            experience.map((exp) => {
              return (
                <tr key={exp._id}>
                  <td>{exp.company}</td>
                  <td className="hide-sm">{exp.title}</td>
                  <td>
                    {moment(exp.from).format("YYYY/MM/DD")} -{" "}
                    {(exp.to && moment(exp.to).format("YYYY/MM/DD")) || " Now"}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(deleteExperience(exp._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Experience;
