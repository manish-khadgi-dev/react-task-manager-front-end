import React from "react";

export const BadList = ({
  badList,
  handleOnSelect,
  itemToDelete,
  switchTask,
}) => {
  return (
    <div>
      <div className="col-md">
        <h2 className="text-center">Bad List</h2>
        <hr />
        <table className="table table-striped table-hover">
          <tbody id="bad-task">
            {badList.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={item._id}
                      onChange={handleOnSelect}
                      checked={itemToDelete.includes(item._id)}
                    />
                  </td>
                  <td>{item.task}</td>
                  <td>{item.hr}</td>
                  <td class="text-end">
                    <button
                      onClick={() => switchTask(item._id, "entry")}
                      className="btn btn-warning"
                    >
                      <i class="fa-solid fa-left-long"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-end fw-bold">
          You could have saved ={" "}
          <span id="totalBadHr">
            {badList.reduce((acc, item) => acc + +item.hr, 0)}
          </span>{" "}
          Hrs
        </div>
      </div>
    </div>
  );
};
