// Code generated by SQLBoiler 4.15.0 (https://github.com/volatiletech/sqlboiler). DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package models

import (
	"context"
	"database/sql"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/friendsofgo/errors"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"github.com/volatiletech/sqlboiler/v4/queries/qmhelper"
	"github.com/volatiletech/sqlboiler/v4/types"
	"github.com/volatiletech/strmangle"
)

// Fusen is an object representing the database table.
type Fusen struct {
	ID          int           `boil:"id" json:"id" toml:"id" yaml:"id"`
	UserID      int           `boil:"user_id" json:"user_id" toml:"user_id" yaml:"user_id"`
	BoardID     string        `boil:"board_id" json:"board_id" toml:"board_id" yaml:"board_id"`
	Title       string        `boil:"title" json:"title" toml:"title" yaml:"title"`
	Memo        null.String   `boil:"memo" json:"memo,omitempty" toml:"memo" yaml:"memo,omitempty"`
	IsUrgent    bool          `boil:"is_urgent" json:"is_urgent" toml:"is_urgent" yaml:"is_urgent"`
	IsImportant bool          `boil:"is_important" json:"is_important" toml:"is_important" yaml:"is_important"`
	Status      int           `boil:"status" json:"status" toml:"status" yaml:"status"`
	CreatedAt   time.Time     `boil:"created_at" json:"created_at" toml:"created_at" yaml:"created_at"`
	UpdatedAt   time.Time     `boil:"updated_at" json:"updated_at" toml:"updated_at" yaml:"updated_at"`
	SortNo      types.Decimal `boil:"sort_no" json:"sort_no" toml:"sort_no" yaml:"sort_no"`

	R *fusenR `boil:"-" json:"-" toml:"-" yaml:"-"`
	L fusenL  `boil:"-" json:"-" toml:"-" yaml:"-"`
}

var FusenColumns = struct {
	ID          string
	UserID      string
	BoardID     string
	Title       string
	Memo        string
	IsUrgent    string
	IsImportant string
	Status      string
	CreatedAt   string
	UpdatedAt   string
	SortNo      string
}{
	ID:          "id",
	UserID:      "user_id",
	BoardID:     "board_id",
	Title:       "title",
	Memo:        "memo",
	IsUrgent:    "is_urgent",
	IsImportant: "is_important",
	Status:      "status",
	CreatedAt:   "created_at",
	UpdatedAt:   "updated_at",
	SortNo:      "sort_no",
}

var FusenTableColumns = struct {
	ID          string
	UserID      string
	BoardID     string
	Title       string
	Memo        string
	IsUrgent    string
	IsImportant string
	Status      string
	CreatedAt   string
	UpdatedAt   string
	SortNo      string
}{
	ID:          "fusens.id",
	UserID:      "fusens.user_id",
	BoardID:     "fusens.board_id",
	Title:       "fusens.title",
	Memo:        "fusens.memo",
	IsUrgent:    "fusens.is_urgent",
	IsImportant: "fusens.is_important",
	Status:      "fusens.status",
	CreatedAt:   "fusens.created_at",
	UpdatedAt:   "fusens.updated_at",
	SortNo:      "fusens.sort_no",
}

// Generated where

type whereHelpernull_String struct{ field string }

func (w whereHelpernull_String) EQ(x null.String) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, false, x)
}
func (w whereHelpernull_String) NEQ(x null.String) qm.QueryMod {
	return qmhelper.WhereNullEQ(w.field, true, x)
}
func (w whereHelpernull_String) LT(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpernull_String) LTE(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpernull_String) GT(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpernull_String) GTE(x null.String) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}
func (w whereHelpernull_String) LIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" LIKE ?", x)
}
func (w whereHelpernull_String) NLIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" NOT LIKE ?", x)
}
func (w whereHelpernull_String) ILIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" ILIKE ?", x)
}
func (w whereHelpernull_String) NILIKE(x null.String) qm.QueryMod {
	return qm.Where(w.field+" NOT ILIKE ?", x)
}
func (w whereHelpernull_String) IN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereIn(fmt.Sprintf("%s IN ?", w.field), values...)
}
func (w whereHelpernull_String) NIN(slice []string) qm.QueryMod {
	values := make([]interface{}, 0, len(slice))
	for _, value := range slice {
		values = append(values, value)
	}
	return qm.WhereNotIn(fmt.Sprintf("%s NOT IN ?", w.field), values...)
}

func (w whereHelpernull_String) IsNull() qm.QueryMod    { return qmhelper.WhereIsNull(w.field) }
func (w whereHelpernull_String) IsNotNull() qm.QueryMod { return qmhelper.WhereIsNotNull(w.field) }

type whereHelpertypes_Decimal struct{ field string }

func (w whereHelpertypes_Decimal) EQ(x types.Decimal) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.EQ, x)
}
func (w whereHelpertypes_Decimal) NEQ(x types.Decimal) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.NEQ, x)
}
func (w whereHelpertypes_Decimal) LT(x types.Decimal) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LT, x)
}
func (w whereHelpertypes_Decimal) LTE(x types.Decimal) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.LTE, x)
}
func (w whereHelpertypes_Decimal) GT(x types.Decimal) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GT, x)
}
func (w whereHelpertypes_Decimal) GTE(x types.Decimal) qm.QueryMod {
	return qmhelper.Where(w.field, qmhelper.GTE, x)
}

var FusenWhere = struct {
	ID          whereHelperint
	UserID      whereHelperint
	BoardID     whereHelperstring
	Title       whereHelperstring
	Memo        whereHelpernull_String
	IsUrgent    whereHelperbool
	IsImportant whereHelperbool
	Status      whereHelperint
	CreatedAt   whereHelpertime_Time
	UpdatedAt   whereHelpertime_Time
	SortNo      whereHelpertypes_Decimal
}{
	ID:          whereHelperint{field: "\"fusens\".\"id\""},
	UserID:      whereHelperint{field: "\"fusens\".\"user_id\""},
	BoardID:     whereHelperstring{field: "\"fusens\".\"board_id\""},
	Title:       whereHelperstring{field: "\"fusens\".\"title\""},
	Memo:        whereHelpernull_String{field: "\"fusens\".\"memo\""},
	IsUrgent:    whereHelperbool{field: "\"fusens\".\"is_urgent\""},
	IsImportant: whereHelperbool{field: "\"fusens\".\"is_important\""},
	Status:      whereHelperint{field: "\"fusens\".\"status\""},
	CreatedAt:   whereHelpertime_Time{field: "\"fusens\".\"created_at\""},
	UpdatedAt:   whereHelpertime_Time{field: "\"fusens\".\"updated_at\""},
	SortNo:      whereHelpertypes_Decimal{field: "\"fusens\".\"sort_no\""},
}

// FusenRels is where relationship names are stored.
var FusenRels = struct {
	User        string
	Checkpoints string
}{
	User:        "User",
	Checkpoints: "Checkpoints",
}

// fusenR is where relationships are stored.
type fusenR struct {
	User        *User           `boil:"User" json:"User" toml:"User" yaml:"User"`
	Checkpoints CheckpointSlice `boil:"Checkpoints" json:"Checkpoints" toml:"Checkpoints" yaml:"Checkpoints"`
}

// NewStruct creates a new relationship struct
func (*fusenR) NewStruct() *fusenR {
	return &fusenR{}
}

func (r *fusenR) GetUser() *User {
	if r == nil {
		return nil
	}
	return r.User
}

func (r *fusenR) GetCheckpoints() CheckpointSlice {
	if r == nil {
		return nil
	}
	return r.Checkpoints
}

// fusenL is where Load methods for each relationship are stored.
type fusenL struct{}

var (
	fusenAllColumns            = []string{"id", "user_id", "board_id", "title", "memo", "is_urgent", "is_important", "status", "created_at", "updated_at", "sort_no"}
	fusenColumnsWithoutDefault = []string{"user_id", "board_id", "title"}
	fusenColumnsWithDefault    = []string{"id", "memo", "is_urgent", "is_important", "status", "created_at", "updated_at", "sort_no"}
	fusenPrimaryKeyColumns     = []string{"id"}
	fusenGeneratedColumns      = []string{}
)

type (
	// FusenSlice is an alias for a slice of pointers to Fusen.
	// This should almost always be used instead of []Fusen.
	FusenSlice []*Fusen
	// FusenHook is the signature for custom Fusen hook methods
	FusenHook func(context.Context, boil.ContextExecutor, *Fusen) error

	fusenQuery struct {
		*queries.Query
	}
)

// Cache for insert, update and upsert
var (
	fusenType                 = reflect.TypeOf(&Fusen{})
	fusenMapping              = queries.MakeStructMapping(fusenType)
	fusenPrimaryKeyMapping, _ = queries.BindMapping(fusenType, fusenMapping, fusenPrimaryKeyColumns)
	fusenInsertCacheMut       sync.RWMutex
	fusenInsertCache          = make(map[string]insertCache)
	fusenUpdateCacheMut       sync.RWMutex
	fusenUpdateCache          = make(map[string]updateCache)
	fusenUpsertCacheMut       sync.RWMutex
	fusenUpsertCache          = make(map[string]insertCache)
)

var (
	// Force time package dependency for automated UpdatedAt/CreatedAt.
	_ = time.Second
	// Force qmhelper dependency for where clause generation (which doesn't
	// always happen)
	_ = qmhelper.Where
)

var fusenAfterSelectHooks []FusenHook

var fusenBeforeInsertHooks []FusenHook
var fusenAfterInsertHooks []FusenHook

var fusenBeforeUpdateHooks []FusenHook
var fusenAfterUpdateHooks []FusenHook

var fusenBeforeDeleteHooks []FusenHook
var fusenAfterDeleteHooks []FusenHook

var fusenBeforeUpsertHooks []FusenHook
var fusenAfterUpsertHooks []FusenHook

// doAfterSelectHooks executes all "after Select" hooks.
func (o *Fusen) doAfterSelectHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenAfterSelectHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeInsertHooks executes all "before insert" hooks.
func (o *Fusen) doBeforeInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenBeforeInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterInsertHooks executes all "after Insert" hooks.
func (o *Fusen) doAfterInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenAfterInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpdateHooks executes all "before Update" hooks.
func (o *Fusen) doBeforeUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenBeforeUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpdateHooks executes all "after Update" hooks.
func (o *Fusen) doAfterUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenAfterUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeDeleteHooks executes all "before Delete" hooks.
func (o *Fusen) doBeforeDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenBeforeDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterDeleteHooks executes all "after Delete" hooks.
func (o *Fusen) doAfterDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenAfterDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpsertHooks executes all "before Upsert" hooks.
func (o *Fusen) doBeforeUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenBeforeUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpsertHooks executes all "after Upsert" hooks.
func (o *Fusen) doAfterUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range fusenAfterUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// AddFusenHook registers your hook function for all future operations.
func AddFusenHook(hookPoint boil.HookPoint, fusenHook FusenHook) {
	switch hookPoint {
	case boil.AfterSelectHook:
		fusenAfterSelectHooks = append(fusenAfterSelectHooks, fusenHook)
	case boil.BeforeInsertHook:
		fusenBeforeInsertHooks = append(fusenBeforeInsertHooks, fusenHook)
	case boil.AfterInsertHook:
		fusenAfterInsertHooks = append(fusenAfterInsertHooks, fusenHook)
	case boil.BeforeUpdateHook:
		fusenBeforeUpdateHooks = append(fusenBeforeUpdateHooks, fusenHook)
	case boil.AfterUpdateHook:
		fusenAfterUpdateHooks = append(fusenAfterUpdateHooks, fusenHook)
	case boil.BeforeDeleteHook:
		fusenBeforeDeleteHooks = append(fusenBeforeDeleteHooks, fusenHook)
	case boil.AfterDeleteHook:
		fusenAfterDeleteHooks = append(fusenAfterDeleteHooks, fusenHook)
	case boil.BeforeUpsertHook:
		fusenBeforeUpsertHooks = append(fusenBeforeUpsertHooks, fusenHook)
	case boil.AfterUpsertHook:
		fusenAfterUpsertHooks = append(fusenAfterUpsertHooks, fusenHook)
	}
}

// One returns a single fusen record from the query.
func (q fusenQuery) One(ctx context.Context, exec boil.ContextExecutor) (*Fusen, error) {
	o := &Fusen{}

	queries.SetLimit(q.Query, 1)

	err := q.Bind(ctx, exec, o)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "models: failed to execute a one query for fusens")
	}

	if err := o.doAfterSelectHooks(ctx, exec); err != nil {
		return o, err
	}

	return o, nil
}

// All returns all Fusen records from the query.
func (q fusenQuery) All(ctx context.Context, exec boil.ContextExecutor) (FusenSlice, error) {
	var o []*Fusen

	err := q.Bind(ctx, exec, &o)
	if err != nil {
		return nil, errors.Wrap(err, "models: failed to assign all query results to Fusen slice")
	}

	if len(fusenAfterSelectHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterSelectHooks(ctx, exec); err != nil {
				return o, err
			}
		}
	}

	return o, nil
}

// Count returns the count of all Fusen records in the query.
func (q fusenQuery) Count(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to count fusens rows")
	}

	return count, nil
}

// Exists checks if the row exists in the table.
func (q fusenQuery) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)
	queries.SetLimit(q.Query, 1)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return false, errors.Wrap(err, "models: failed to check if fusens exists")
	}

	return count > 0, nil
}

// User pointed to by the foreign key.
func (o *Fusen) User(mods ...qm.QueryMod) userQuery {
	queryMods := []qm.QueryMod{
		qm.Where("\"id\" = ?", o.UserID),
	}

	queryMods = append(queryMods, mods...)

	return Users(queryMods...)
}

// Checkpoints retrieves all the checkpoint's Checkpoints with an executor.
func (o *Fusen) Checkpoints(mods ...qm.QueryMod) checkpointQuery {
	var queryMods []qm.QueryMod
	if len(mods) != 0 {
		queryMods = append(queryMods, mods...)
	}

	queryMods = append(queryMods,
		qm.Where("\"checkpoints\".\"fusen_id\"=?", o.ID),
	)

	return Checkpoints(queryMods...)
}

// LoadUser allows an eager lookup of values, cached into the
// loaded structs of the objects. This is for an N-1 relationship.
func (fusenL) LoadUser(ctx context.Context, e boil.ContextExecutor, singular bool, maybeFusen interface{}, mods queries.Applicator) error {
	var slice []*Fusen
	var object *Fusen

	if singular {
		var ok bool
		object, ok = maybeFusen.(*Fusen)
		if !ok {
			object = new(Fusen)
			ok = queries.SetFromEmbeddedStruct(&object, &maybeFusen)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", object, maybeFusen))
			}
		}
	} else {
		s, ok := maybeFusen.(*[]*Fusen)
		if ok {
			slice = *s
		} else {
			ok = queries.SetFromEmbeddedStruct(&slice, maybeFusen)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", slice, maybeFusen))
			}
		}
	}

	args := make([]interface{}, 0, 1)
	if singular {
		if object.R == nil {
			object.R = &fusenR{}
		}
		args = append(args, object.UserID)

	} else {
	Outer:
		for _, obj := range slice {
			if obj.R == nil {
				obj.R = &fusenR{}
			}

			for _, a := range args {
				if a == obj.UserID {
					continue Outer
				}
			}

			args = append(args, obj.UserID)

		}
	}

	if len(args) == 0 {
		return nil
	}

	query := NewQuery(
		qm.From(`users`),
		qm.WhereIn(`users.id in ?`, args...),
	)
	if mods != nil {
		mods.Apply(query)
	}

	results, err := query.QueryContext(ctx, e)
	if err != nil {
		return errors.Wrap(err, "failed to eager load User")
	}

	var resultSlice []*User
	if err = queries.Bind(results, &resultSlice); err != nil {
		return errors.Wrap(err, "failed to bind eager loaded slice User")
	}

	if err = results.Close(); err != nil {
		return errors.Wrap(err, "failed to close results of eager load for users")
	}
	if err = results.Err(); err != nil {
		return errors.Wrap(err, "error occurred during iteration of eager loaded relations for users")
	}

	if len(userAfterSelectHooks) != 0 {
		for _, obj := range resultSlice {
			if err := obj.doAfterSelectHooks(ctx, e); err != nil {
				return err
			}
		}
	}

	if len(resultSlice) == 0 {
		return nil
	}

	if singular {
		foreign := resultSlice[0]
		object.R.User = foreign
		if foreign.R == nil {
			foreign.R = &userR{}
		}
		foreign.R.Fusens = append(foreign.R.Fusens, object)
		return nil
	}

	for _, local := range slice {
		for _, foreign := range resultSlice {
			if local.UserID == foreign.ID {
				local.R.User = foreign
				if foreign.R == nil {
					foreign.R = &userR{}
				}
				foreign.R.Fusens = append(foreign.R.Fusens, local)
				break
			}
		}
	}

	return nil
}

// LoadCheckpoints allows an eager lookup of values, cached into the
// loaded structs of the objects. This is for a 1-M or N-M relationship.
func (fusenL) LoadCheckpoints(ctx context.Context, e boil.ContextExecutor, singular bool, maybeFusen interface{}, mods queries.Applicator) error {
	var slice []*Fusen
	var object *Fusen

	if singular {
		var ok bool
		object, ok = maybeFusen.(*Fusen)
		if !ok {
			object = new(Fusen)
			ok = queries.SetFromEmbeddedStruct(&object, &maybeFusen)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", object, maybeFusen))
			}
		}
	} else {
		s, ok := maybeFusen.(*[]*Fusen)
		if ok {
			slice = *s
		} else {
			ok = queries.SetFromEmbeddedStruct(&slice, maybeFusen)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", slice, maybeFusen))
			}
		}
	}

	args := make([]interface{}, 0, 1)
	if singular {
		if object.R == nil {
			object.R = &fusenR{}
		}
		args = append(args, object.ID)
	} else {
	Outer:
		for _, obj := range slice {
			if obj.R == nil {
				obj.R = &fusenR{}
			}

			for _, a := range args {
				if a == obj.ID {
					continue Outer
				}
			}

			args = append(args, obj.ID)
		}
	}

	if len(args) == 0 {
		return nil
	}

	query := NewQuery(
		qm.From(`checkpoints`),
		qm.WhereIn(`checkpoints.fusen_id in ?`, args...),
	)
	if mods != nil {
		mods.Apply(query)
	}

	results, err := query.QueryContext(ctx, e)
	if err != nil {
		return errors.Wrap(err, "failed to eager load checkpoints")
	}

	var resultSlice []*Checkpoint
	if err = queries.Bind(results, &resultSlice); err != nil {
		return errors.Wrap(err, "failed to bind eager loaded slice checkpoints")
	}

	if err = results.Close(); err != nil {
		return errors.Wrap(err, "failed to close results in eager load on checkpoints")
	}
	if err = results.Err(); err != nil {
		return errors.Wrap(err, "error occurred during iteration of eager loaded relations for checkpoints")
	}

	if len(checkpointAfterSelectHooks) != 0 {
		for _, obj := range resultSlice {
			if err := obj.doAfterSelectHooks(ctx, e); err != nil {
				return err
			}
		}
	}
	if singular {
		object.R.Checkpoints = resultSlice
		for _, foreign := range resultSlice {
			if foreign.R == nil {
				foreign.R = &checkpointR{}
			}
			foreign.R.Fusen = object
		}
		return nil
	}

	for _, foreign := range resultSlice {
		for _, local := range slice {
			if local.ID == foreign.FusenID {
				local.R.Checkpoints = append(local.R.Checkpoints, foreign)
				if foreign.R == nil {
					foreign.R = &checkpointR{}
				}
				foreign.R.Fusen = local
				break
			}
		}
	}

	return nil
}

// SetUser of the fusen to the related item.
// Sets o.R.User to related.
// Adds o to related.R.Fusens.
func (o *Fusen) SetUser(ctx context.Context, exec boil.ContextExecutor, insert bool, related *User) error {
	var err error
	if insert {
		if err = related.Insert(ctx, exec, boil.Infer()); err != nil {
			return errors.Wrap(err, "failed to insert into foreign table")
		}
	}

	updateQuery := fmt.Sprintf(
		"UPDATE \"fusens\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, []string{"user_id"}),
		strmangle.WhereClause("\"", "\"", 2, fusenPrimaryKeyColumns),
	)
	values := []interface{}{related.ID, o.ID}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, updateQuery)
		fmt.Fprintln(writer, values)
	}
	if _, err = exec.ExecContext(ctx, updateQuery, values...); err != nil {
		return errors.Wrap(err, "failed to update local table")
	}

	o.UserID = related.ID
	if o.R == nil {
		o.R = &fusenR{
			User: related,
		}
	} else {
		o.R.User = related
	}

	if related.R == nil {
		related.R = &userR{
			Fusens: FusenSlice{o},
		}
	} else {
		related.R.Fusens = append(related.R.Fusens, o)
	}

	return nil
}

// AddCheckpoints adds the given related objects to the existing relationships
// of the fusen, optionally inserting them as new records.
// Appends related to o.R.Checkpoints.
// Sets related.R.Fusen appropriately.
func (o *Fusen) AddCheckpoints(ctx context.Context, exec boil.ContextExecutor, insert bool, related ...*Checkpoint) error {
	var err error
	for _, rel := range related {
		if insert {
			rel.FusenID = o.ID
			if err = rel.Insert(ctx, exec, boil.Infer()); err != nil {
				return errors.Wrap(err, "failed to insert into foreign table")
			}
		} else {
			updateQuery := fmt.Sprintf(
				"UPDATE \"checkpoints\" SET %s WHERE %s",
				strmangle.SetParamNames("\"", "\"", 1, []string{"fusen_id"}),
				strmangle.WhereClause("\"", "\"", 2, checkpointPrimaryKeyColumns),
			)
			values := []interface{}{o.ID, rel.ID}

			if boil.IsDebug(ctx) {
				writer := boil.DebugWriterFrom(ctx)
				fmt.Fprintln(writer, updateQuery)
				fmt.Fprintln(writer, values)
			}
			if _, err = exec.ExecContext(ctx, updateQuery, values...); err != nil {
				return errors.Wrap(err, "failed to update foreign table")
			}

			rel.FusenID = o.ID
		}
	}

	if o.R == nil {
		o.R = &fusenR{
			Checkpoints: related,
		}
	} else {
		o.R.Checkpoints = append(o.R.Checkpoints, related...)
	}

	for _, rel := range related {
		if rel.R == nil {
			rel.R = &checkpointR{
				Fusen: o,
			}
		} else {
			rel.R.Fusen = o
		}
	}
	return nil
}

// Fusens retrieves all the records using an executor.
func Fusens(mods ...qm.QueryMod) fusenQuery {
	mods = append(mods, qm.From("\"fusens\""))
	q := NewQuery(mods...)
	if len(queries.GetSelect(q)) == 0 {
		queries.SetSelect(q, []string{"\"fusens\".*"})
	}

	return fusenQuery{q}
}

// FindFusen retrieves a single record by ID with an executor.
// If selectCols is empty Find will return all columns.
func FindFusen(ctx context.Context, exec boil.ContextExecutor, iD int, selectCols ...string) (*Fusen, error) {
	fusenObj := &Fusen{}

	sel := "*"
	if len(selectCols) > 0 {
		sel = strings.Join(strmangle.IdentQuoteSlice(dialect.LQ, dialect.RQ, selectCols), ",")
	}
	query := fmt.Sprintf(
		"select %s from \"fusens\" where \"id\"=$1", sel,
	)

	q := queries.Raw(query, iD)

	err := q.Bind(ctx, exec, fusenObj)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "models: unable to select from fusens")
	}

	if err = fusenObj.doAfterSelectHooks(ctx, exec); err != nil {
		return fusenObj, err
	}

	return fusenObj, nil
}

// Insert a single record using an executor.
// See boil.Columns.InsertColumnSet documentation to understand column list inference for inserts.
func (o *Fusen) Insert(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) error {
	if o == nil {
		return errors.New("models: no fusens provided for insertion")
	}

	var err error
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		if o.CreatedAt.IsZero() {
			o.CreatedAt = currTime
		}
		if o.UpdatedAt.IsZero() {
			o.UpdatedAt = currTime
		}
	}

	if err := o.doBeforeInsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(fusenColumnsWithDefault, o)

	key := makeCacheKey(columns, nzDefaults)
	fusenInsertCacheMut.RLock()
	cache, cached := fusenInsertCache[key]
	fusenInsertCacheMut.RUnlock()

	if !cached {
		wl, returnColumns := columns.InsertColumnSet(
			fusenAllColumns,
			fusenColumnsWithDefault,
			fusenColumnsWithoutDefault,
			nzDefaults,
		)

		cache.valueMapping, err = queries.BindMapping(fusenType, fusenMapping, wl)
		if err != nil {
			return err
		}
		cache.retMapping, err = queries.BindMapping(fusenType, fusenMapping, returnColumns)
		if err != nil {
			return err
		}
		if len(wl) != 0 {
			cache.query = fmt.Sprintf("INSERT INTO \"fusens\" (\"%s\") %%sVALUES (%s)%%s", strings.Join(wl, "\",\""), strmangle.Placeholders(dialect.UseIndexPlaceholders, len(wl), 1, 1))
		} else {
			cache.query = "INSERT INTO \"fusens\" %sDEFAULT VALUES%s"
		}

		var queryOutput, queryReturning string

		if len(cache.retMapping) != 0 {
			queryReturning = fmt.Sprintf(" RETURNING \"%s\"", strings.Join(returnColumns, "\",\""))
		}

		cache.query = fmt.Sprintf(cache.query, queryOutput, queryReturning)
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}

	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(queries.PtrsFromMapping(value, cache.retMapping)...)
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}

	if err != nil {
		return errors.Wrap(err, "models: unable to insert into fusens")
	}

	if !cached {
		fusenInsertCacheMut.Lock()
		fusenInsertCache[key] = cache
		fusenInsertCacheMut.Unlock()
	}

	return o.doAfterInsertHooks(ctx, exec)
}

// Update uses an executor to update the Fusen.
// See boil.Columns.UpdateColumnSet documentation to understand column list inference for updates.
// Update does not automatically update the record in case of default values. Use .Reload() to refresh the records.
func (o *Fusen) Update(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) (int64, error) {
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		o.UpdatedAt = currTime
	}

	var err error
	if err = o.doBeforeUpdateHooks(ctx, exec); err != nil {
		return 0, err
	}
	key := makeCacheKey(columns, nil)
	fusenUpdateCacheMut.RLock()
	cache, cached := fusenUpdateCache[key]
	fusenUpdateCacheMut.RUnlock()

	if !cached {
		wl := columns.UpdateColumnSet(
			fusenAllColumns,
			fusenPrimaryKeyColumns,
		)

		if !columns.IsWhitelist() {
			wl = strmangle.SetComplement(wl, []string{"created_at"})
		}
		if len(wl) == 0 {
			return 0, errors.New("models: unable to update fusens, could not build whitelist")
		}

		cache.query = fmt.Sprintf("UPDATE \"fusens\" SET %s WHERE %s",
			strmangle.SetParamNames("\"", "\"", 1, wl),
			strmangle.WhereClause("\"", "\"", len(wl)+1, fusenPrimaryKeyColumns),
		)
		cache.valueMapping, err = queries.BindMapping(fusenType, fusenMapping, append(wl, fusenPrimaryKeyColumns...))
		if err != nil {
			return 0, err
		}
	}

	values := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, values)
	}
	var result sql.Result
	result, err = exec.ExecContext(ctx, cache.query, values...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to update fusens row")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by update for fusens")
	}

	if !cached {
		fusenUpdateCacheMut.Lock()
		fusenUpdateCache[key] = cache
		fusenUpdateCacheMut.Unlock()
	}

	return rowsAff, o.doAfterUpdateHooks(ctx, exec)
}

// UpdateAll updates all rows with the specified column values.
func (q fusenQuery) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	queries.SetUpdate(q.Query, cols)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to update all for fusens")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to retrieve rows affected for fusens")
	}

	return rowsAff, nil
}

// UpdateAll updates all rows with the specified column values, using an executor.
func (o FusenSlice) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	ln := int64(len(o))
	if ln == 0 {
		return 0, nil
	}

	if len(cols) == 0 {
		return 0, errors.New("models: update all requires at least one column argument")
	}

	colNames := make([]string, len(cols))
	args := make([]interface{}, len(cols))

	i := 0
	for name, value := range cols {
		colNames[i] = name
		args[i] = value
		i++
	}

	// Append all of the primary key values for each column
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), fusenPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := fmt.Sprintf("UPDATE \"fusens\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, colNames),
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), len(colNames)+1, fusenPrimaryKeyColumns, len(o)))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to update all in fusen slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to retrieve rows affected all in update all fusen")
	}
	return rowsAff, nil
}

// Upsert attempts an insert using an executor, and does an update or ignore on conflict.
// See boil.Columns documentation for how to properly use updateColumns and insertColumns.
func (o *Fusen) Upsert(ctx context.Context, exec boil.ContextExecutor, updateOnConflict bool, conflictColumns []string, updateColumns, insertColumns boil.Columns) error {
	if o == nil {
		return errors.New("models: no fusens provided for upsert")
	}
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		if o.CreatedAt.IsZero() {
			o.CreatedAt = currTime
		}
		o.UpdatedAt = currTime
	}

	if err := o.doBeforeUpsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(fusenColumnsWithDefault, o)

	// Build cache key in-line uglily - mysql vs psql problems
	buf := strmangle.GetBuffer()
	if updateOnConflict {
		buf.WriteByte('t')
	} else {
		buf.WriteByte('f')
	}
	buf.WriteByte('.')
	for _, c := range conflictColumns {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(updateColumns.Kind))
	for _, c := range updateColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(insertColumns.Kind))
	for _, c := range insertColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	for _, c := range nzDefaults {
		buf.WriteString(c)
	}
	key := buf.String()
	strmangle.PutBuffer(buf)

	fusenUpsertCacheMut.RLock()
	cache, cached := fusenUpsertCache[key]
	fusenUpsertCacheMut.RUnlock()

	var err error

	if !cached {
		insert, ret := insertColumns.InsertColumnSet(
			fusenAllColumns,
			fusenColumnsWithDefault,
			fusenColumnsWithoutDefault,
			nzDefaults,
		)

		update := updateColumns.UpdateColumnSet(
			fusenAllColumns,
			fusenPrimaryKeyColumns,
		)

		if updateOnConflict && len(update) == 0 {
			return errors.New("models: unable to upsert fusens, could not build update column list")
		}

		conflict := conflictColumns
		if len(conflict) == 0 {
			conflict = make([]string, len(fusenPrimaryKeyColumns))
			copy(conflict, fusenPrimaryKeyColumns)
		}
		cache.query = buildUpsertQueryPostgres(dialect, "\"fusens\"", updateOnConflict, ret, update, conflict, insert)

		cache.valueMapping, err = queries.BindMapping(fusenType, fusenMapping, insert)
		if err != nil {
			return err
		}
		if len(ret) != 0 {
			cache.retMapping, err = queries.BindMapping(fusenType, fusenMapping, ret)
			if err != nil {
				return err
			}
		}
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)
	var returns []interface{}
	if len(cache.retMapping) != 0 {
		returns = queries.PtrsFromMapping(value, cache.retMapping)
	}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}
	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(returns...)
		if errors.Is(err, sql.ErrNoRows) {
			err = nil // Postgres doesn't return anything when there's no update
		}
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}
	if err != nil {
		return errors.Wrap(err, "models: unable to upsert fusens")
	}

	if !cached {
		fusenUpsertCacheMut.Lock()
		fusenUpsertCache[key] = cache
		fusenUpsertCacheMut.Unlock()
	}

	return o.doAfterUpsertHooks(ctx, exec)
}

// Delete deletes a single Fusen record with an executor.
// Delete will match against the primary key column to find the record to delete.
func (o *Fusen) Delete(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if o == nil {
		return 0, errors.New("models: no Fusen provided for delete")
	}

	if err := o.doBeforeDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	args := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), fusenPrimaryKeyMapping)
	sql := "DELETE FROM \"fusens\" WHERE \"id\"=$1"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to delete from fusens")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by delete for fusens")
	}

	if err := o.doAfterDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	return rowsAff, nil
}

// DeleteAll deletes all matching rows.
func (q fusenQuery) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if q.Query == nil {
		return 0, errors.New("models: no fusenQuery provided for delete all")
	}

	queries.SetDelete(q.Query)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to delete all from fusens")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by deleteall for fusens")
	}

	return rowsAff, nil
}

// DeleteAll deletes all rows in the slice, using an executor.
func (o FusenSlice) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if len(o) == 0 {
		return 0, nil
	}

	if len(fusenBeforeDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doBeforeDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	var args []interface{}
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), fusenPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "DELETE FROM \"fusens\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, fusenPrimaryKeyColumns, len(o))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to delete all from fusen slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by deleteall for fusens")
	}

	if len(fusenAfterDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	return rowsAff, nil
}

// Reload refetches the object from the database
// using the primary keys with an executor.
func (o *Fusen) Reload(ctx context.Context, exec boil.ContextExecutor) error {
	ret, err := FindFusen(ctx, exec, o.ID)
	if err != nil {
		return err
	}

	*o = *ret
	return nil
}

// ReloadAll refetches every row with matching primary key column values
// and overwrites the original object slice with the newly updated slice.
func (o *FusenSlice) ReloadAll(ctx context.Context, exec boil.ContextExecutor) error {
	if o == nil || len(*o) == 0 {
		return nil
	}

	slice := FusenSlice{}
	var args []interface{}
	for _, obj := range *o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), fusenPrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "SELECT \"fusens\".* FROM \"fusens\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, fusenPrimaryKeyColumns, len(*o))

	q := queries.Raw(sql, args...)

	err := q.Bind(ctx, exec, &slice)
	if err != nil {
		return errors.Wrap(err, "models: unable to reload all in FusenSlice")
	}

	*o = slice

	return nil
}

// FusenExists checks if the Fusen row exists.
func FusenExists(ctx context.Context, exec boil.ContextExecutor, iD int) (bool, error) {
	var exists bool
	sql := "select exists(select 1 from \"fusens\" where \"id\"=$1 limit 1)"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, iD)
	}
	row := exec.QueryRowContext(ctx, sql, iD)

	err := row.Scan(&exists)
	if err != nil {
		return false, errors.Wrap(err, "models: unable to check if fusens exists")
	}

	return exists, nil
}

// Exists checks if the Fusen row exists.
func (o *Fusen) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	return FusenExists(ctx, exec, o.ID)
}
