import React from "react";
import { BadList } from "./BadList";
import { EntryList } from "./EntryList";

export const ListArea = ({
  taskList,
  switchTask,
  handleOnSelect,
  itemToDelete,
  handleSelectAll,
  handleOnDelete,
}) => {
  const entList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");
  console.log(taskList);
  return (
    <div className="row mt-5 g-2">
      <div className="col">

      <EntryList
        taskList={entList}
        switchTask={switchTask}
        handleOnSelect={handleOnSelect}
        handleOnDelete={handleOnDelete}
        itemToDelete={itemToDelete}
        handleSelectAll={handleSelectAll}
      />
      </div>
      <div className="col">
      <BadList
        badList={badList}
        switchTask={switchTask}
        handleOnSelect={handleOnSelect}
        handleOnDelete={handleOnDelete}
        itemToDelete={itemToDelete}
        handleSelectAll={handleSelectAll}
      />
      </div>
    </div>
  );
};
