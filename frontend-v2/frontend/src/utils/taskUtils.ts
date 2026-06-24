
export function countCompletedTasks(
  tasks: { completed: boolean }[]
) {
  return tasks.filter((task) => task.completed).length;
}