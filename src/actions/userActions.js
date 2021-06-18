import axios from "axios";

export function fetchUsers() {
  return {
    type: "FETCH_USERS",
    payload: axios.get("/api/user/getAll"),
  };
}

export function fetchUser(id) {
  return {
    type: "FETCH_USER",
    payload: axios.get("/api/user/" + id),
  };
}

export function postUser(data) {
  return {
    type: "POST_USER",
    payload: axios.post("/api/user/", data),
  };
}

export function updateUser(id, data) {
  return {
    type: "UPDATE_USER",
    payload: axios.put("/api/user/" + id, data),
  };
}

export function deleteUser(id) {
  return {
    type: "DELETE_USER",
    payload: axios.delete("/api/user/" + id),
  };
}

export function searchUser(data) {
  return {
    type: "SEARCH_USER",
    payload: data,
  };
}
