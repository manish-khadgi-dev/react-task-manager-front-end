import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Title } from "./components/Title";
import { Form } from "./components/Form";
import { ListArea } from "./components/ListArea";
import { useEffect, useState } from "react";
import {
  deleteTask,
  fetchAllTask,
  patchTask,
  postTask,
} from "./helpers/axiosHelpers";

const hrPerWeek = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [itemToDelete, setItemToDelete] = useState([]);
  const [response, setResponse] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);

  const totalHrs = taskList.reduce((subTtl, item) => subTtl + +item.hr, 0);

  useEffect(() => {
    //run code
    getTasks();
  }, []);
  //call axios to fetch all data
  const getTasks = async () => {
    const { status, tasks } = await fetchAllTask();
    status === "success" && setTaskList(tasks);
  };

  const addTask = async (data) => {
    if (hrPerWeek < totalHrs + +data.hr) {
      return alert("Sorry La");
    }
    //send data to the api
    const result = await postTask(data);
    console.log(result);

    result?.status === "success" && getTasks();
    setResponse(response);
  };

  const switchTask = async (_id, type) => {
    const result = await patchTask(_id, type);
    console.log(result);

    result?.status === "success" && getTasks();

    // console.log(_id);
    // const temArg = taskList.map((item) => {
    //   if (item._id === _id) {
    //     item.type = type;
    //   }
    //   return item;
    // });
    // setTaskList(temArg);
  };

  const handleOnSelect = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);

    if (checked) {
      setItemToDelete([...itemToDelete, value]);
      setIsAllSelected(taskList.length === itemToDelete.length + 1);
    } else {
      setItemToDelete(itemToDelete.filter((item) => item !== value));
      setIsAllSelected(false);
    }
  };

  const handleOnAllclick = (e) => {
    const { checked } = e.target;
    if (checked) {
      setIsAllSelected(true);
      setItemToDelete(taskList.map(({ _id }) => _id));
    } else {
      setItemToDelete([]);
      setIsAllSelected(false);
    }
  };
  const handleOnDelete = async (_id) => {
    if (!window.confirm("Sorry La")) {
      return;
    }
    const result = await deleteTask(itemToDelete);
    console.log(result);
    setResponse(result);
    setItemToDelete([]);

    result.status === "success" && getTasks();

    //   if (!window.confirm("Are you sure you want to delete")) {
    //     return;
    //   }
    //   setTaskList(taskList.filter((item) => !itemToDelete.includes(item._id)));
    //   setItemToDelete([]);
    // };
    // console.log(itemToDelete);

    // const handleSelectAll = () => {
    //   return addTask();
  };

  return (
    <div className="wrapper">
      <div className="container">
        {/* <!-- top title --> */}
        <Title />
        {response.message && (
          <div
            className={
              response.status === "success" ? "alert-success" : "alert-danger"
            }
          >
            {response.message}
          </div>
        )}

        <Form addTask={addTask} />
        {/* <!-- form area --> */}

        {/* <button onClick={handleSelectAll} className="mt-5 btn btn-warning">
          {" "}
          Select All{" "}
        </button> */}

        <ListArea
          itemToDelete={itemToDelete}
          taskList={taskList}
          switchTask={switchTask}
          handleOnSelect={handleOnSelect}

          // handleSelectAll={handleSelectAll}
        />
        {taskList.length ? (
          <div className="fw-bolder">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={handleOnAllclick}
              onClick={handleOnDelete}
              name="accept"
              id="accept"
            />{" "}
            <label for="accept">Select All the Tasks</label>
          </div>
        ) : null}
        {/* <!-- list area --> */}

        {/* <!-- total hr area --> */}
        <div className="row fw-bold">
          <div className="col">
            The total hours allocated ={" "}
            {taskList.reduce((subTtl, item) => subTtl + +item.hr, 0)} Hrs
          </div>
        </div>
        {itemToDelete.length > 0 && (
          <div className="d-grid">
            <button onClick={handleOnDelete} className="btn btn-danger">
              Delete Selected ({itemToDelete.length}) Task (s)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
