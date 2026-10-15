from app.db.database import get_connection
from app.db.models import Task

def create_task(title: str) -> Task:
    connection = get_connection()

    try: 
        cursor = connection.execute(
            "INSERT INTO tasks (title) VALUES (?)",
            (title,)
        )

        connection.commit()
        task_id = cursor.lastrowid
        row = connection.execute(
            "SELECT id, title, completed, created_at FROM tasks WHERE id = ?",
            (task_id,)
        ).fetchone()

        return Task(
            id=row["id"],
            title=row["title"],
            completed=bool(row["completed"]),
            created_at=row["created_at"]
        )
    finally: 
        connection.close()

def list_tasks() -> list[Task]:
    connection = get_connection()

    try:
        rows = connection.execute(
            "SELECT id, title, completed, created_at FROM tasks"
        ).fetchall()

        return [
            Task(
                id=row["id"],
                title=row["title"],
                completed=bool(row["completed"]),
                created_at=row["created_at"]
            )
            for row in rows
        ]
    finally:
        connection.close()