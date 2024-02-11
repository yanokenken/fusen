// Code generated by SQLBoiler 4.16.1 (https://github.com/volatiletech/sqlboiler). DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package models

import (
	"bytes"
	"context"
	"reflect"
	"testing"

	"github.com/volatiletech/randomize"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries"
	"github.com/volatiletech/strmangle"
)

var (
	// Relationships sometimes use the reflection helper queries.Equal/queries.Assign
	// so force a package dependency in case they don't.
	_ = queries.Equal
)

func testCheckpoints(t *testing.T) {
	t.Parallel()

	query := Checkpoints()

	if query.Query == nil {
		t.Error("expected a query, got nothing")
	}
}

func testCheckpointsDelete(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if rowsAff, err := o.Delete(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testCheckpointsQueryDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if rowsAff, err := Checkpoints().DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testCheckpointsSliceDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := CheckpointSlice{o}

	if rowsAff, err := slice.DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testCheckpointsExists(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	e, err := CheckpointExists(ctx, tx, o.ID)
	if err != nil {
		t.Errorf("Unable to check if Checkpoint exists: %s", err)
	}
	if !e {
		t.Errorf("Expected CheckpointExists to return true, but got false.")
	}
}

func testCheckpointsFind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	checkpointFound, err := FindCheckpoint(ctx, tx, o.ID)
	if err != nil {
		t.Error(err)
	}

	if checkpointFound == nil {
		t.Error("want a record, got nil")
	}
}

func testCheckpointsBind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if err = Checkpoints().Bind(ctx, tx, o); err != nil {
		t.Error(err)
	}
}

func testCheckpointsOne(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if x, err := Checkpoints().One(ctx, tx); err != nil {
		t.Error(err)
	} else if x == nil {
		t.Error("expected to get a non nil record")
	}
}

func testCheckpointsAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	checkpointOne := &Checkpoint{}
	checkpointTwo := &Checkpoint{}
	if err = randomize.Struct(seed, checkpointOne, checkpointDBTypes, false, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}
	if err = randomize.Struct(seed, checkpointTwo, checkpointDBTypes, false, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = checkpointOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = checkpointTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := Checkpoints().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 2 {
		t.Error("want 2 records, got:", len(slice))
	}
}

func testCheckpointsCount(t *testing.T) {
	t.Parallel()

	var err error
	seed := randomize.NewSeed()
	checkpointOne := &Checkpoint{}
	checkpointTwo := &Checkpoint{}
	if err = randomize.Struct(seed, checkpointOne, checkpointDBTypes, false, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}
	if err = randomize.Struct(seed, checkpointTwo, checkpointDBTypes, false, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = checkpointOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = checkpointTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 2 {
		t.Error("want 2 records, got:", count)
	}
}

func checkpointBeforeInsertHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointAfterInsertHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointAfterSelectHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointBeforeUpdateHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointAfterUpdateHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointBeforeDeleteHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointAfterDeleteHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointBeforeUpsertHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func checkpointAfterUpsertHook(ctx context.Context, e boil.ContextExecutor, o *Checkpoint) error {
	*o = Checkpoint{}
	return nil
}

func testCheckpointsHooks(t *testing.T) {
	t.Parallel()

	var err error

	ctx := context.Background()
	empty := &Checkpoint{}
	o := &Checkpoint{}

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, o, checkpointDBTypes, false); err != nil {
		t.Errorf("Unable to randomize Checkpoint object: %s", err)
	}

	AddCheckpointHook(boil.BeforeInsertHook, checkpointBeforeInsertHook)
	if err = o.doBeforeInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeInsertHook function to empty object, but got: %#v", o)
	}
	checkpointBeforeInsertHooks = []CheckpointHook{}

	AddCheckpointHook(boil.AfterInsertHook, checkpointAfterInsertHook)
	if err = o.doAfterInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterInsertHook function to empty object, but got: %#v", o)
	}
	checkpointAfterInsertHooks = []CheckpointHook{}

	AddCheckpointHook(boil.AfterSelectHook, checkpointAfterSelectHook)
	if err = o.doAfterSelectHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterSelectHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterSelectHook function to empty object, but got: %#v", o)
	}
	checkpointAfterSelectHooks = []CheckpointHook{}

	AddCheckpointHook(boil.BeforeUpdateHook, checkpointBeforeUpdateHook)
	if err = o.doBeforeUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpdateHook function to empty object, but got: %#v", o)
	}
	checkpointBeforeUpdateHooks = []CheckpointHook{}

	AddCheckpointHook(boil.AfterUpdateHook, checkpointAfterUpdateHook)
	if err = o.doAfterUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpdateHook function to empty object, but got: %#v", o)
	}
	checkpointAfterUpdateHooks = []CheckpointHook{}

	AddCheckpointHook(boil.BeforeDeleteHook, checkpointBeforeDeleteHook)
	if err = o.doBeforeDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeDeleteHook function to empty object, but got: %#v", o)
	}
	checkpointBeforeDeleteHooks = []CheckpointHook{}

	AddCheckpointHook(boil.AfterDeleteHook, checkpointAfterDeleteHook)
	if err = o.doAfterDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterDeleteHook function to empty object, but got: %#v", o)
	}
	checkpointAfterDeleteHooks = []CheckpointHook{}

	AddCheckpointHook(boil.BeforeUpsertHook, checkpointBeforeUpsertHook)
	if err = o.doBeforeUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpsertHook function to empty object, but got: %#v", o)
	}
	checkpointBeforeUpsertHooks = []CheckpointHook{}

	AddCheckpointHook(boil.AfterUpsertHook, checkpointAfterUpsertHook)
	if err = o.doAfterUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpsertHook function to empty object, but got: %#v", o)
	}
	checkpointAfterUpsertHooks = []CheckpointHook{}
}

func testCheckpointsInsert(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testCheckpointsInsertWhitelist(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Whitelist(checkpointColumnsWithoutDefault...)); err != nil {
		t.Error(err)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testCheckpointToOneFusenUsingFusen(t *testing.T) {
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var local Checkpoint
	var foreign Fusen

	seed := randomize.NewSeed()
	if err := randomize.Struct(seed, &local, checkpointDBTypes, false, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}
	if err := randomize.Struct(seed, &foreign, fusenDBTypes, false, fusenColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Fusen struct: %s", err)
	}

	if err := foreign.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	local.FusenID = foreign.ID
	if err := local.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := local.Fusen().One(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	if check.ID != foreign.ID {
		t.Errorf("want: %v, got %v", foreign.ID, check.ID)
	}

	ranAfterSelectHook := false
	AddFusenHook(boil.AfterSelectHook, func(ctx context.Context, e boil.ContextExecutor, o *Fusen) error {
		ranAfterSelectHook = true
		return nil
	})

	slice := CheckpointSlice{&local}
	if err = local.L.LoadFusen(ctx, tx, false, (*[]*Checkpoint)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if local.R.Fusen == nil {
		t.Error("struct should have been eager loaded")
	}

	local.R.Fusen = nil
	if err = local.L.LoadFusen(ctx, tx, true, &local, nil); err != nil {
		t.Fatal(err)
	}
	if local.R.Fusen == nil {
		t.Error("struct should have been eager loaded")
	}

	if !ranAfterSelectHook {
		t.Error("failed to run AfterSelect hook for relationship")
	}
}

func testCheckpointToOneSetOpFusenUsingFusen(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Checkpoint
	var b, c Fusen

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, checkpointDBTypes, false, strmangle.SetComplement(checkpointPrimaryKeyColumns, checkpointColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &b, fusenDBTypes, false, strmangle.SetComplement(fusenPrimaryKeyColumns, fusenColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, fusenDBTypes, false, strmangle.SetComplement(fusenPrimaryKeyColumns, fusenColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	for i, x := range []*Fusen{&b, &c} {
		err = a.SetFusen(ctx, tx, i != 0, x)
		if err != nil {
			t.Fatal(err)
		}

		if a.R.Fusen != x {
			t.Error("relationship struct not set to correct value")
		}

		if x.R.Checkpoints[0] != &a {
			t.Error("failed to append to foreign relationship struct")
		}
		if a.FusenID != x.ID {
			t.Error("foreign key was wrong value", a.FusenID)
		}

		zero := reflect.Zero(reflect.TypeOf(a.FusenID))
		reflect.Indirect(reflect.ValueOf(&a.FusenID)).Set(zero)

		if err = a.Reload(ctx, tx); err != nil {
			t.Fatal("failed to reload", err)
		}

		if a.FusenID != x.ID {
			t.Error("foreign key was wrong value", a.FusenID, x.ID)
		}
	}
}

func testCheckpointsReload(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if err = o.Reload(ctx, tx); err != nil {
		t.Error(err)
	}
}

func testCheckpointsReloadAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := CheckpointSlice{o}

	if err = slice.ReloadAll(ctx, tx); err != nil {
		t.Error(err)
	}
}

func testCheckpointsSelect(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := Checkpoints().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 1 {
		t.Error("want one record, got:", len(slice))
	}
}

var (
	checkpointDBTypes = map[string]string{`ID`: `character varying`, `FusenID`: `integer`, `Body`: `character varying`, `IsChecked`: `boolean`, `CreatedAt`: `timestamp without time zone`, `UpdatedAt`: `timestamp without time zone`}
	_                 = bytes.MinRead
)

func testCheckpointsUpdate(t *testing.T) {
	t.Parallel()

	if 0 == len(checkpointPrimaryKeyColumns) {
		t.Skip("Skipping table with no primary key columns")
	}
	if len(checkpointAllColumns) == len(checkpointPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	if rowsAff, err := o.Update(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only affect one row but affected", rowsAff)
	}
}

func testCheckpointsSliceUpdateAll(t *testing.T) {
	t.Parallel()

	if len(checkpointAllColumns) == len(checkpointPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &Checkpoint{}
	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, checkpointDBTypes, true, checkpointPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	// Remove Primary keys and unique columns from what we plan to update
	var fields []string
	if strmangle.StringSliceMatch(checkpointAllColumns, checkpointPrimaryKeyColumns) {
		fields = checkpointAllColumns
	} else {
		fields = strmangle.SetComplement(
			checkpointAllColumns,
			checkpointPrimaryKeyColumns,
		)
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	typ := reflect.TypeOf(o).Elem()
	n := typ.NumField()

	updateMap := M{}
	for _, col := range fields {
		for i := 0; i < n; i++ {
			f := typ.Field(i)
			if f.Tag.Get("boil") == col {
				updateMap[col] = value.Field(i).Interface()
			}
		}
	}

	slice := CheckpointSlice{o}
	if rowsAff, err := slice.UpdateAll(ctx, tx, updateMap); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("wanted one record updated but got", rowsAff)
	}
}

func testCheckpointsUpsert(t *testing.T) {
	t.Parallel()

	if len(checkpointAllColumns) == len(checkpointPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	// Attempt the INSERT side of an UPSERT
	o := Checkpoint{}
	if err = randomize.Struct(seed, &o, checkpointDBTypes, true); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Upsert(ctx, tx, false, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert Checkpoint: %s", err)
	}

	count, err := Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}

	// Attempt the UPDATE side of an UPSERT
	if err = randomize.Struct(seed, &o, checkpointDBTypes, false, checkpointPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Checkpoint struct: %s", err)
	}

	if err = o.Upsert(ctx, tx, true, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert Checkpoint: %s", err)
	}

	count, err = Checkpoints().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}
}
