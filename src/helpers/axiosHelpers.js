import axios from "axios";

const rootAPIUrl = "http://localhost:8000/api/v1";
const taskEp = rootAPIUrl + "/tasks";
export const fetchAllTask = async () => {
  try {
    const { data } = await axios.get(taskEp);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTask = async (taskDt) => {
  try {
    const { data } = await axios.post(taskEp, taskDt);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const patchTask = async (_id, type) => {
  try {
    const { data } = await axios.patch(taskEp, { _id, type });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTask = async (_id) => {
  try {
    const { data } = await axios.delete(taskEp, { data: _id });
    return data;
  } catch (error) {
    return {
      status: "deleted",
      message: error.message,
    };
  }
};
