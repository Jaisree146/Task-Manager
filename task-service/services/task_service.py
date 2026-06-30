from models.task_model import (
    create_task,
    get_tasks,
    update_task,
    delete_task,
)


def create_new_task(user_id, task, description):
    create_task(user_id, task, description)


def fetch_tasks(user_id):
    rows = get_tasks(user_id)
    tasks = []

    for row in rows:
        tasks.append(
            {
                "id": row[0],
                "task": row[1],
                "description": row[2],
                "completed": bool(row[3]),
            }
        )

    return tasks


def update_existing_task(task_id, user_id, task, description, completed):
    update_task(task_id, user_id, task, description, completed)


def delete_existing_task(task_id, user_id):
    delete_task(task_id, user_id)
