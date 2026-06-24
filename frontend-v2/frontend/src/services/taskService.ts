import taskapi from "./taskapi";

export async function fetchTasks(token: string) {
  const response = await taskapi.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}