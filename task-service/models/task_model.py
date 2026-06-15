from config import mysql

def create_task(user_id, task, description):
    cur = mysql.connection.cursor()
    cur.execute(
        """
        INSERT INTO tasks
        (
            user_id,
            task,
            description
        )
        VALUES
        (
            %s,
            %s,
            %s
        )
        """,
        (
            user_id,
            task,
            description
        )
    )

    mysql.connection.commit()
    cur.close()


def get_tasks(user_id):

    cur = mysql.connection.cursor()

    cur.execute(
        """
        SELECT
            id,
            task,
            description,
            completed
        FROM tasks
        WHERE user_id = %s
        """,
        (user_id,)
    )
    rows = cur.fetchall()
    cur.close()
    return rows


def update_task(
    task_id,
    user_id,
    task,
    description,
    completed
):

    cur = mysql.connection.cursor()

    cur.execute(
        """
        UPDATE tasks
        SET
            task = %s,
            description = %s,
            completed = %s
        WHERE
            id = %s
            AND user_id = %s
        """,
        (
            task,
            description,
            completed,
            task_id,
            user_id
        )
    )

    mysql.connection.commit()
    cur.close()


def delete_task(task_id, user_id):

    cur = mysql.connection.cursor()

    cur.execute(
        """
        DELETE FROM tasks
        WHERE id = %s
        AND user_id = %s
        """,
        (
            task_id,
            user_id
        )
    )

    mysql.connection.commit()
    cur.close()