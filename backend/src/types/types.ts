enum TaskStatus {
    PENDING = "pending",
    CLOSED = "closed",
    IN_PROGRESS = "in_progress",
    ON_HOLD = "on_hold",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
    TESTED = "tested",
    REVIEW = "review",
    REVIEW_COMPLETED = "review_completed",
}

enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}       

export { TaskStatus, TaskPriority };