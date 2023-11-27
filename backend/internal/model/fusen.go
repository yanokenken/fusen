package model

type Fusen struct {
	ID        int64  `json:"id"`
	UserID    int64  `json:"user_id"`
	TaskName     string `json:"task_name"`
	Memo      string `json:"memo"`
	IsDueToday  bool   `json:"is_due_today"`
	IsInProgress bool   `json:"is_in_progress"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
