from app.db.database import get_connection
from app.db.models import Task

def create_task(title: str) -> Task:
    connection = get_connection()

    cursor = connection.execute(
        "INSERT INTO tasks (title) VALUES (?)",
        (title,)
    )

    connection.commit()
    task_id = cursor.lastrowid
    