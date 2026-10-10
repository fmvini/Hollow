from dataclasses import dataclass

@dataclass
class Task:
    id: int | None
    title: str
    completed: bool
    created_at: str