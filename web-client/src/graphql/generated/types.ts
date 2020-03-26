import * as extensions from "../extensions";
import {
  TypeData,
  ScalarType,
  FieldsType,
  EnumType,
  FieldsTypeArg,
} from "gqless";

type Extension<TName extends string> = TName extends keyof typeof extensions
  ? typeof extensions[TName]
  : any;

/**
 * @name Boolean
 * @type SCALAR
 */
type t_Boolean<T extends boolean = boolean> = ScalarType<
  T,
  Extension<"Boolean">
>;

/**
 * @name Boolean_comparison_exp
 * @type INPUT_OBJECT
 */
export type Boolean_comparison_exp = {
  _eq: boolean | null;
  _gt: boolean | null;
  _gte: boolean | null;
  _in: boolean[] | null;
  _is_null: boolean | null;
  _lt: boolean | null;
  _lte: boolean | null;
  _neq: boolean | null;
  _nin: boolean[] | null;
};

/**
 * @name Float
 * @type SCALAR
 */
type t_Float<T extends number = number> = ScalarType<T, Extension<"Float">>;

/**
 * @name ID
 * @type SCALAR
 */
type t_ID<T extends string = string> = ScalarType<T, Extension<"ID">>;

/**
 * @name Int
 * @type SCALAR
 */
type t_Int<T extends number = number> = ScalarType<T, Extension<"Int">>;

/**
 * @name Int_comparison_exp
 * @type INPUT_OBJECT
 */
export type Int_comparison_exp = {
  _eq: number | null;
  _gt: number | null;
  _gte: number | null;
  _in: number[] | null;
  _is_null: boolean | null;
  _lt: number | null;
  _lte: number | null;
  _neq: number | null;
  _nin: number[] | null;
};

/**
 * @name SampleInput
 * @type INPUT_OBJECT
 */
export type SampleInput = { password: string; username: string };

/**
 * @name SampleOutput
 * @type OBJECT
 */
type t_SampleOutput = FieldsType<
  {
    __typename: t_String<"SampleOutput">;
    accessToken: t_String;
  },
  Extension<"SampleOutput">
>;

/**
 * @name String
 * @type SCALAR
 */
type t_String<T extends string = string> = ScalarType<T, Extension<"String">>;

/**
 * @name String_comparison_exp
 * @type INPUT_OBJECT
 */
export type String_comparison_exp = {
  _eq: string | null;
  _gt: string | null;
  _gte: string | null;
  _ilike: string | null;
  _in: string[] | null;
  _is_null: boolean | null;
  _like: string | null;
  _lt: string | null;
  _lte: string | null;
  _neq: string | null;
  _nilike: string | null;
  _nin: string[] | null;
  _nlike: string | null;
  _nsimilar: string | null;
  _similar: string | null;
};

/**
 * @name __Directive
 * @type OBJECT
 */
type t___Directive = FieldsType<
  {
    __typename: t_String<"__Directive">;
    args: t___InputValue[];
    description: t_String | null;
    locations: t___DirectiveLocation[];
    name: t_String;
  },
  Extension<"__Directive">
>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
type t___DirectiveLocation = EnumType<
  | "ARGUMENT_DEFINITION"
  | "ENUM"
  | "ENUM_VALUE"
  | "FIELD"
  | "FIELD_DEFINITION"
  | "FRAGMENT_DEFINITION"
  | "FRAGMENT_SPREAD"
  | "INLINE_FRAGMENT"
  | "INPUT_FIELD_DEFINITION"
  | "INPUT_OBJECT"
  | "INTERFACE"
  | "MUTATION"
  | "OBJECT"
  | "QUERY"
  | "SCALAR"
  | "SCHEMA"
  | "SUBSCRIPTION"
  | "UNION"
>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
type t___EnumValue = FieldsType<
  {
    __typename: t_String<"__EnumValue">;
    deprecationReason: t_String | null;
    description: t_String | null;
    isDeprecated: t_Boolean;
    name: t_String;
  },
  Extension<"__EnumValue">
>;

/**
 * @name __Field
 * @type OBJECT
 */
type t___Field = FieldsType<
  {
    __typename: t_String<"__Field">;
    args: t___InputValue[];
    deprecationReason: t_String | null;
    description: t_String | null;
    isDeprecated: t_Boolean;
    name: t_String;
    type: t___Type;
  },
  Extension<"__Field">
>;

/**
 * @name __InputValue
 * @type OBJECT
 */
type t___InputValue = FieldsType<
  {
    __typename: t_String<"__InputValue">;
    defaultValue: t_String | null;
    description: t_String | null;
    name: t_String;
    type: t___Type;
  },
  Extension<"__InputValue">
>;

/**
 * @name __Schema
 * @type OBJECT
 */
type t___Schema = FieldsType<
  {
    __typename: t_String<"__Schema">;
    directives: t___Directive[];
    mutationType: t___Type | null;
    queryType: t___Type;
    subscriptionType: t___Type | null;
    types: t___Type[];
  },
  Extension<"__Schema">
>;

/**
 * @name __Type
 * @type OBJECT
 */
type t___Type = FieldsType<
  {
    __typename: t_String<"__Type">;
    description: t_String | null;
    enumValues: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___EnumValue[] | null
    >;
    fields: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___Field[] | null
    >;
    inputFields: t___InputValue[] | null;
    interfaces: t___Type[] | null;
    kind: t___TypeKind;
    name: t_String | null;
    ofType: t___Type | null;
    possibleTypes: t___Type[] | null;
  },
  Extension<"__Type">
>;

/**
 * @name __TypeKind
 * @type ENUM
 */
type t___TypeKind = EnumType<
  | "ENUM"
  | "INPUT_OBJECT"
  | "INTERFACE"
  | "LIST"
  | "NON_NULL"
  | "OBJECT"
  | "SCALAR"
  | "UNION"
>;

/**
 * @name command
 * @type OBJECT
 */
type t_command = FieldsType<
  {
    __typename: t_String<"command">;
    created_at: t_timestamptz;
    id: t_uuid;

    /**
     * An object relationship
     */
    project: t_project;
    project_id: t_Int;
    run_after: t_uuid;

    /**
     * An array relationship
     */
    run_history: FieldsTypeArg<
      {
        distinct_on?: command_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_run_history_order_by[] | null;
        where?: command_run_history_bool_exp | null;
      },
      t_command_run_history[]
    >;

    /**
     * An aggregated array relationship
     */
    run_history_aggregate: FieldsTypeArg<
      {
        distinct_on?: command_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_run_history_order_by[] | null;
        where?: command_run_history_bool_exp | null;
      },
      t_command_run_history_aggregate
    >;
    updated_at: t_timestamptz;
  },
  Extension<"command">
>;

/**
 * @name command_aggregate
 * @type OBJECT
 */
type t_command_aggregate = FieldsType<
  {
    __typename: t_String<"command_aggregate">;
    aggregate: t_command_aggregate_fields | null;
    nodes: t_command[];
  },
  Extension<"command_aggregate">
>;

/**
 * @name command_aggregate_fields
 * @type OBJECT
 */
type t_command_aggregate_fields = FieldsType<
  {
    __typename: t_String<"command_aggregate_fields">;
    avg: t_command_avg_fields | null;
    count: FieldsTypeArg<
      { columns?: command_select_column[] | null; distinct?: boolean | null },
      t_Int | null
    >;
    max: t_command_max_fields | null;
    min: t_command_min_fields | null;
    stddev: t_command_stddev_fields | null;
    stddev_pop: t_command_stddev_pop_fields | null;
    stddev_samp: t_command_stddev_samp_fields | null;
    sum: t_command_sum_fields | null;
    var_pop: t_command_var_pop_fields | null;
    var_samp: t_command_var_samp_fields | null;
    variance: t_command_variance_fields | null;
  },
  Extension<"command_aggregate_fields">
>;

/**
 * @name command_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type command_aggregate_order_by = {
  avg: command_avg_order_by | null;
  count: order_by | null;
  max: command_max_order_by | null;
  min: command_min_order_by | null;
  stddev: command_stddev_order_by | null;
  stddev_pop: command_stddev_pop_order_by | null;
  stddev_samp: command_stddev_samp_order_by | null;
  sum: command_sum_order_by | null;
  var_pop: command_var_pop_order_by | null;
  var_samp: command_var_samp_order_by | null;
  variance: command_variance_order_by | null;
};

/**
 * @name command_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type command_arr_rel_insert_input = {
  data: command_insert_input[];
  on_conflict: command_on_conflict | null;
};

/**
 * @name command_avg_fields
 * @type OBJECT
 */
type t_command_avg_fields = FieldsType<
  {
    __typename: t_String<"command_avg_fields">;
    project_id: t_Float | null;
  },
  Extension<"command_avg_fields">
>;

/**
 * @name command_avg_order_by
 * @type INPUT_OBJECT
 */
export type command_avg_order_by = { project_id: order_by | null };

/**
 * @name command_bool_exp
 * @type INPUT_OBJECT
 */
export type command_bool_exp = {
  _and: (command_bool_exp | null)[] | null;
  _not: command_bool_exp | null;
  _or: (command_bool_exp | null)[] | null;
  created_at: timestamptz_comparison_exp | null;
  id: uuid_comparison_exp | null;
  project: project_bool_exp | null;
  project_id: Int_comparison_exp | null;
  run_after: uuid_comparison_exp | null;
  run_history: command_run_history_bool_exp | null;
  updated_at: timestamptz_comparison_exp | null;
};

/**
 * @name command_constraint
 * @type ENUM
 */
type t_command_constraint = EnumType<"command_pkey">;

/**
 * @name command_inc_input
 * @type INPUT_OBJECT
 */
export type command_inc_input = { project_id: number | null };

/**
 * @name command_insert_input
 * @type INPUT_OBJECT
 */
export type command_insert_input = {
  created_at: any | null;
  id: any | null;
  project: project_obj_rel_insert_input | null;
  project_id: number | null;
  run_after: any | null;
  run_history: command_run_history_arr_rel_insert_input | null;
  updated_at: any | null;
};

/**
 * @name command_max_fields
 * @type OBJECT
 */
type t_command_max_fields = FieldsType<
  {
    __typename: t_String<"command_max_fields">;
    created_at: t_timestamptz | null;
    id: t_uuid | null;
    project_id: t_Int | null;
    run_after: t_uuid | null;
    updated_at: t_timestamptz | null;
  },
  Extension<"command_max_fields">
>;

/**
 * @name command_max_order_by
 * @type INPUT_OBJECT
 */
export type command_max_order_by = {
  created_at: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_after: order_by | null;
  updated_at: order_by | null;
};

/**
 * @name command_min_fields
 * @type OBJECT
 */
type t_command_min_fields = FieldsType<
  {
    __typename: t_String<"command_min_fields">;
    created_at: t_timestamptz | null;
    id: t_uuid | null;
    project_id: t_Int | null;
    run_after: t_uuid | null;
    updated_at: t_timestamptz | null;
  },
  Extension<"command_min_fields">
>;

/**
 * @name command_min_order_by
 * @type INPUT_OBJECT
 */
export type command_min_order_by = {
  created_at: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_after: order_by | null;
  updated_at: order_by | null;
};

/**
 * @name command_mutation_response
 * @type OBJECT
 */
type t_command_mutation_response = FieldsType<
  {
    __typename: t_String<"command_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_command[];
  },
  Extension<"command_mutation_response">
>;

/**
 * @name command_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type command_obj_rel_insert_input = {
  data: command_insert_input;
  on_conflict: command_on_conflict | null;
};

/**
 * @name command_on_conflict
 * @type INPUT_OBJECT
 */
export type command_on_conflict = {
  constraint: command_constraint;
  update_columns: command_update_column[];
  where: command_bool_exp | null;
};

/**
 * @name command_order_by
 * @type INPUT_OBJECT
 */
export type command_order_by = {
  created_at: order_by | null;
  id: order_by | null;
  project: project_order_by | null;
  project_id: order_by | null;
  run_after: order_by | null;
  run_history_aggregate: command_run_history_aggregate_order_by | null;
  updated_at: order_by | null;
};

/**
 * @name command_pk_columns_input
 * @type INPUT_OBJECT
 */
export type command_pk_columns_input = { id: any };

/**
 * @name command_run_history
 * @type OBJECT
 */
type t_command_run_history = FieldsType<
  {
    __typename: t_String<"command_run_history">;

    /**
     * An object relationship
     */
    command: t_command;
    command_id: t_uuid;
    created_at: t_timestamptz;
    fail: t_Boolean;
    id: t_uuid;
    missconfiguration: t_Boolean;
    running_time: t_Int;
  },
  Extension<"command_run_history">
>;

/**
 * @name command_run_history_aggregate
 * @type OBJECT
 */
type t_command_run_history_aggregate = FieldsType<
  {
    __typename: t_String<"command_run_history_aggregate">;
    aggregate: t_command_run_history_aggregate_fields | null;
    nodes: t_command_run_history[];
  },
  Extension<"command_run_history_aggregate">
>;

/**
 * @name command_run_history_aggregate_fields
 * @type OBJECT
 */
type t_command_run_history_aggregate_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_aggregate_fields">;
    avg: t_command_run_history_avg_fields | null;
    count: FieldsTypeArg<
      {
        columns?: command_run_history_select_column[] | null;
        distinct?: boolean | null;
      },
      t_Int | null
    >;
    max: t_command_run_history_max_fields | null;
    min: t_command_run_history_min_fields | null;
    stddev: t_command_run_history_stddev_fields | null;
    stddev_pop: t_command_run_history_stddev_pop_fields | null;
    stddev_samp: t_command_run_history_stddev_samp_fields | null;
    sum: t_command_run_history_sum_fields | null;
    var_pop: t_command_run_history_var_pop_fields | null;
    var_samp: t_command_run_history_var_samp_fields | null;
    variance: t_command_run_history_variance_fields | null;
  },
  Extension<"command_run_history_aggregate_fields">
>;

/**
 * @name command_run_history_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_aggregate_order_by = {
  avg: command_run_history_avg_order_by | null;
  count: order_by | null;
  max: command_run_history_max_order_by | null;
  min: command_run_history_min_order_by | null;
  stddev: command_run_history_stddev_order_by | null;
  stddev_pop: command_run_history_stddev_pop_order_by | null;
  stddev_samp: command_run_history_stddev_samp_order_by | null;
  sum: command_run_history_sum_order_by | null;
  var_pop: command_run_history_var_pop_order_by | null;
  var_samp: command_run_history_var_samp_order_by | null;
  variance: command_run_history_variance_order_by | null;
};

/**
 * @name command_run_history_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type command_run_history_arr_rel_insert_input = {
  data: command_run_history_insert_input[];
  on_conflict: command_run_history_on_conflict | null;
};

/**
 * @name command_run_history_avg_fields
 * @type OBJECT
 */
type t_command_run_history_avg_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_avg_fields">;
    running_time: t_Float | null;
  },
  Extension<"command_run_history_avg_fields">
>;

/**
 * @name command_run_history_avg_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_avg_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_run_history_bool_exp
 * @type INPUT_OBJECT
 */
export type command_run_history_bool_exp = {
  _and: (command_run_history_bool_exp | null)[] | null;
  _not: command_run_history_bool_exp | null;
  _or: (command_run_history_bool_exp | null)[] | null;
  command: command_bool_exp | null;
  command_id: uuid_comparison_exp | null;
  created_at: timestamptz_comparison_exp | null;
  fail: Boolean_comparison_exp | null;
  id: uuid_comparison_exp | null;
  missconfiguration: Boolean_comparison_exp | null;
  running_time: Int_comparison_exp | null;
};

/**
 * @name command_run_history_constraint
 * @type ENUM
 */
type t_command_run_history_constraint = EnumType<"command_run_history_pkey">;

/**
 * @name command_run_history_inc_input
 * @type INPUT_OBJECT
 */
export type command_run_history_inc_input = { running_time: number | null };

/**
 * @name command_run_history_insert_input
 * @type INPUT_OBJECT
 */
export type command_run_history_insert_input = {
  command: command_obj_rel_insert_input | null;
  command_id: any | null;
  created_at: any | null;
  fail: boolean | null;
  id: any | null;
  missconfiguration: boolean | null;
  running_time: number | null;
};

/**
 * @name command_run_history_max_fields
 * @type OBJECT
 */
type t_command_run_history_max_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_max_fields">;
    command_id: t_uuid | null;
    created_at: t_timestamptz | null;
    id: t_uuid | null;
    running_time: t_Int | null;
  },
  Extension<"command_run_history_max_fields">
>;

/**
 * @name command_run_history_max_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_max_order_by = {
  command_id: order_by | null;
  created_at: order_by | null;
  id: order_by | null;
  running_time: order_by | null;
};

/**
 * @name command_run_history_min_fields
 * @type OBJECT
 */
type t_command_run_history_min_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_min_fields">;
    command_id: t_uuid | null;
    created_at: t_timestamptz | null;
    id: t_uuid | null;
    running_time: t_Int | null;
  },
  Extension<"command_run_history_min_fields">
>;

/**
 * @name command_run_history_min_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_min_order_by = {
  command_id: order_by | null;
  created_at: order_by | null;
  id: order_by | null;
  running_time: order_by | null;
};

/**
 * @name command_run_history_mutation_response
 * @type OBJECT
 */
type t_command_run_history_mutation_response = FieldsType<
  {
    __typename: t_String<"command_run_history_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_command_run_history[];
  },
  Extension<"command_run_history_mutation_response">
>;

/**
 * @name command_run_history_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type command_run_history_obj_rel_insert_input = {
  data: command_run_history_insert_input;
  on_conflict: command_run_history_on_conflict | null;
};

/**
 * @name command_run_history_on_conflict
 * @type INPUT_OBJECT
 */
export type command_run_history_on_conflict = {
  constraint: command_run_history_constraint;
  update_columns: command_run_history_update_column[];
  where: command_run_history_bool_exp | null;
};

/**
 * @name command_run_history_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_order_by = {
  command: command_order_by | null;
  command_id: order_by | null;
  created_at: order_by | null;
  fail: order_by | null;
  id: order_by | null;
  missconfiguration: order_by | null;
  running_time: order_by | null;
};

/**
 * @name command_run_history_pk_columns_input
 * @type INPUT_OBJECT
 */
export type command_run_history_pk_columns_input = { id: any };

/**
 * @name command_run_history_select_column
 * @type ENUM
 */
type t_command_run_history_select_column = EnumType<
  | "command_id"
  | "created_at"
  | "fail"
  | "id"
  | "missconfiguration"
  | "running_time"
>;

/**
 * @name command_run_history_set_input
 * @type INPUT_OBJECT
 */
export type command_run_history_set_input = {
  command_id: any | null;
  created_at: any | null;
  fail: boolean | null;
  id: any | null;
  missconfiguration: boolean | null;
  running_time: number | null;
};

/**
 * @name command_run_history_stddev_fields
 * @type OBJECT
 */
type t_command_run_history_stddev_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_stddev_fields">;
    running_time: t_Float | null;
  },
  Extension<"command_run_history_stddev_fields">
>;

/**
 * @name command_run_history_stddev_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_stddev_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_run_history_stddev_pop_fields
 * @type OBJECT
 */
type t_command_run_history_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_stddev_pop_fields">;
    running_time: t_Float | null;
  },
  Extension<"command_run_history_stddev_pop_fields">
>;

/**
 * @name command_run_history_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_stddev_pop_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_run_history_stddev_samp_fields
 * @type OBJECT
 */
type t_command_run_history_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_stddev_samp_fields">;
    running_time: t_Float | null;
  },
  Extension<"command_run_history_stddev_samp_fields">
>;

/**
 * @name command_run_history_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_stddev_samp_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_run_history_sum_fields
 * @type OBJECT
 */
type t_command_run_history_sum_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_sum_fields">;
    running_time: t_Int | null;
  },
  Extension<"command_run_history_sum_fields">
>;

/**
 * @name command_run_history_sum_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_sum_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_run_history_update_column
 * @type ENUM
 */
type t_command_run_history_update_column = EnumType<
  | "command_id"
  | "created_at"
  | "fail"
  | "id"
  | "missconfiguration"
  | "running_time"
>;

/**
 * @name command_run_history_var_pop_fields
 * @type OBJECT
 */
type t_command_run_history_var_pop_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_var_pop_fields">;
    running_time: t_Float | null;
  },
  Extension<"command_run_history_var_pop_fields">
>;

/**
 * @name command_run_history_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_var_pop_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_run_history_var_samp_fields
 * @type OBJECT
 */
type t_command_run_history_var_samp_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_var_samp_fields">;
    running_time: t_Float | null;
  },
  Extension<"command_run_history_var_samp_fields">
>;

/**
 * @name command_run_history_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_var_samp_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_run_history_variance_fields
 * @type OBJECT
 */
type t_command_run_history_variance_fields = FieldsType<
  {
    __typename: t_String<"command_run_history_variance_fields">;
    running_time: t_Float | null;
  },
  Extension<"command_run_history_variance_fields">
>;

/**
 * @name command_run_history_variance_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_variance_order_by = {
  running_time: order_by | null;
};

/**
 * @name command_select_column
 * @type ENUM
 */
type t_command_select_column = EnumType<
  "created_at" | "id" | "project_id" | "run_after" | "updated_at"
>;

/**
 * @name command_set_input
 * @type INPUT_OBJECT
 */
export type command_set_input = {
  created_at: any | null;
  id: any | null;
  project_id: number | null;
  run_after: any | null;
  updated_at: any | null;
};

/**
 * @name command_stddev_fields
 * @type OBJECT
 */
type t_command_stddev_fields = FieldsType<
  {
    __typename: t_String<"command_stddev_fields">;
    project_id: t_Float | null;
  },
  Extension<"command_stddev_fields">
>;

/**
 * @name command_stddev_order_by
 * @type INPUT_OBJECT
 */
export type command_stddev_order_by = { project_id: order_by | null };

/**
 * @name command_stddev_pop_fields
 * @type OBJECT
 */
type t_command_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"command_stddev_pop_fields">;
    project_id: t_Float | null;
  },
  Extension<"command_stddev_pop_fields">
>;

/**
 * @name command_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type command_stddev_pop_order_by = { project_id: order_by | null };

/**
 * @name command_stddev_samp_fields
 * @type OBJECT
 */
type t_command_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"command_stddev_samp_fields">;
    project_id: t_Float | null;
  },
  Extension<"command_stddev_samp_fields">
>;

/**
 * @name command_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type command_stddev_samp_order_by = { project_id: order_by | null };

/**
 * @name command_sum_fields
 * @type OBJECT
 */
type t_command_sum_fields = FieldsType<
  {
    __typename: t_String<"command_sum_fields">;
    project_id: t_Int | null;
  },
  Extension<"command_sum_fields">
>;

/**
 * @name command_sum_order_by
 * @type INPUT_OBJECT
 */
export type command_sum_order_by = { project_id: order_by | null };

/**
 * @name command_update_column
 * @type ENUM
 */
type t_command_update_column = EnumType<
  "created_at" | "id" | "project_id" | "run_after" | "updated_at"
>;

/**
 * @name command_var_pop_fields
 * @type OBJECT
 */
type t_command_var_pop_fields = FieldsType<
  {
    __typename: t_String<"command_var_pop_fields">;
    project_id: t_Float | null;
  },
  Extension<"command_var_pop_fields">
>;

/**
 * @name command_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type command_var_pop_order_by = { project_id: order_by | null };

/**
 * @name command_var_samp_fields
 * @type OBJECT
 */
type t_command_var_samp_fields = FieldsType<
  {
    __typename: t_String<"command_var_samp_fields">;
    project_id: t_Float | null;
  },
  Extension<"command_var_samp_fields">
>;

/**
 * @name command_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type command_var_samp_order_by = { project_id: order_by | null };

/**
 * @name command_variance_fields
 * @type OBJECT
 */
type t_command_variance_fields = FieldsType<
  {
    __typename: t_String<"command_variance_fields">;
    project_id: t_Float | null;
  },
  Extension<"command_variance_fields">
>;

/**
 * @name command_variance_order_by
 * @type INPUT_OBJECT
 */
export type command_variance_order_by = { project_id: order_by | null };

/**
 * @name mutation_root
 * @type OBJECT
 */
type t_mutation_root = FieldsType<
  {
    __typename: t_String<"mutation_root">;

    /**
     * delete data from the table: "command"
     */
    delete_command: FieldsTypeArg<
      { where: command_bool_exp },
      t_command_mutation_response | null
    >;

    /**
     * delete single row from the table: "command"
     */
    delete_command_by_pk: FieldsTypeArg<{ id: any }, t_command | null>;

    /**
     * delete data from the table: "command_run_history"
     */
    delete_command_run_history: FieldsTypeArg<
      { where: command_run_history_bool_exp },
      t_command_run_history_mutation_response | null
    >;

    /**
     * delete single row from the table: "command_run_history"
     */
    delete_command_run_history_by_pk: FieldsTypeArg<
      { id: any },
      t_command_run_history | null
    >;

    /**
     * delete data from the table: "organization"
     */
    delete_organization: FieldsTypeArg<
      { where: organization_bool_exp },
      t_organization_mutation_response | null
    >;

    /**
     * delete single row from the table: "organization"
     */
    delete_organization_by_pk: FieldsTypeArg<
      { id: number },
      t_organization | null
    >;

    /**
     * delete data from the table: "organization_invite_user"
     */
    delete_organization_invite_user: FieldsTypeArg<
      { where: organization_invite_user_bool_exp },
      t_organization_invite_user_mutation_response | null
    >;

    /**
     * delete single row from the table: "organization_invite_user"
     */
    delete_organization_invite_user_by_pk: FieldsTypeArg<
      { id: number },
      t_organization_invite_user | null
    >;

    /**
     * delete data from the table: "project"
     */
    delete_project: FieldsTypeArg<
      { where: project_bool_exp },
      t_project_mutation_response | null
    >;

    /**
     * delete single row from the table: "project"
     */
    delete_project_by_pk: FieldsTypeArg<{ id: number }, t_project | null>;

    /**
     * delete data from the table: "project_run_history"
     */
    delete_project_run_history: FieldsTypeArg<
      { where: project_run_history_bool_exp },
      t_project_run_history_mutation_response | null
    >;

    /**
     * delete single row from the table: "project_run_history"
     */
    delete_project_run_history_by_pk: FieldsTypeArg<
      { id: number },
      t_project_run_history | null
    >;

    /**
     * delete data from the table: "user"
     */
    delete_user: FieldsTypeArg<
      { where: user_bool_exp },
      t_user_mutation_response | null
    >;

    /**
     * delete single row from the table: "user"
     */
    delete_user_by_pk: FieldsTypeArg<{ id: number }, t_user | null>;

    /**
     * insert data into the table: "command"
     */
    insert_command: FieldsTypeArg<
      {
        objects: command_insert_input[];
        on_conflict?: command_on_conflict | null;
      },
      t_command_mutation_response | null
    >;

    /**
     * insert a single row into the table: "command"
     */
    insert_command_one: FieldsTypeArg<
      {
        object: command_insert_input;
        on_conflict?: command_on_conflict | null;
      },
      t_command | null
    >;

    /**
     * insert data into the table: "command_run_history"
     */
    insert_command_run_history: FieldsTypeArg<
      {
        objects: command_run_history_insert_input[];
        on_conflict?: command_run_history_on_conflict | null;
      },
      t_command_run_history_mutation_response | null
    >;

    /**
     * insert a single row into the table: "command_run_history"
     */
    insert_command_run_history_one: FieldsTypeArg<
      {
        object: command_run_history_insert_input;
        on_conflict?: command_run_history_on_conflict | null;
      },
      t_command_run_history | null
    >;

    /**
     * insert data into the table: "organization"
     */
    insert_organization: FieldsTypeArg<
      {
        objects: organization_insert_input[];
        on_conflict?: organization_on_conflict | null;
      },
      t_organization_mutation_response | null
    >;

    /**
     * insert data into the table: "organization_invite_user"
     */
    insert_organization_invite_user: FieldsTypeArg<
      {
        objects: organization_invite_user_insert_input[];
        on_conflict?: organization_invite_user_on_conflict | null;
      },
      t_organization_invite_user_mutation_response | null
    >;

    /**
     * insert a single row into the table: "organization_invite_user"
     */
    insert_organization_invite_user_one: FieldsTypeArg<
      {
        object: organization_invite_user_insert_input;
        on_conflict?: organization_invite_user_on_conflict | null;
      },
      t_organization_invite_user | null
    >;

    /**
     * insert a single row into the table: "organization"
     */
    insert_organization_one: FieldsTypeArg<
      {
        object: organization_insert_input;
        on_conflict?: organization_on_conflict | null;
      },
      t_organization | null
    >;

    /**
     * insert data into the table: "project"
     */
    insert_project: FieldsTypeArg<
      {
        objects: project_insert_input[];
        on_conflict?: project_on_conflict | null;
      },
      t_project_mutation_response | null
    >;

    /**
     * insert a single row into the table: "project"
     */
    insert_project_one: FieldsTypeArg<
      {
        object: project_insert_input;
        on_conflict?: project_on_conflict | null;
      },
      t_project | null
    >;

    /**
     * insert data into the table: "project_run_history"
     */
    insert_project_run_history: FieldsTypeArg<
      {
        objects: project_run_history_insert_input[];
        on_conflict?: project_run_history_on_conflict | null;
      },
      t_project_run_history_mutation_response | null
    >;

    /**
     * insert a single row into the table: "project_run_history"
     */
    insert_project_run_history_one: FieldsTypeArg<
      {
        object: project_run_history_insert_input;
        on_conflict?: project_run_history_on_conflict | null;
      },
      t_project_run_history | null
    >;

    /**
     * insert data into the table: "user"
     */
    insert_user: FieldsTypeArg<
      { objects: user_insert_input[]; on_conflict?: user_on_conflict | null },
      t_user_mutation_response | null
    >;

    /**
     * insert a single row into the table: "user"
     */
    insert_user_one: FieldsTypeArg<
      { object: user_insert_input; on_conflict?: user_on_conflict | null },
      t_user | null
    >;

    /**
     * update data of the table: "command"
     */
    update_command: FieldsTypeArg<
      {
        _inc?: command_inc_input | null;
        _set?: command_set_input | null;
        where: command_bool_exp;
      },
      t_command_mutation_response | null
    >;

    /**
     * update single row of the table: "command"
     */
    update_command_by_pk: FieldsTypeArg<
      {
        _inc?: command_inc_input | null;
        _set?: command_set_input | null;
        pk_columns: command_pk_columns_input;
      },
      t_command | null
    >;

    /**
     * update data of the table: "command_run_history"
     */
    update_command_run_history: FieldsTypeArg<
      {
        _inc?: command_run_history_inc_input | null;
        _set?: command_run_history_set_input | null;
        where: command_run_history_bool_exp;
      },
      t_command_run_history_mutation_response | null
    >;

    /**
     * update single row of the table: "command_run_history"
     */
    update_command_run_history_by_pk: FieldsTypeArg<
      {
        _inc?: command_run_history_inc_input | null;
        _set?: command_run_history_set_input | null;
        pk_columns: command_run_history_pk_columns_input;
      },
      t_command_run_history | null
    >;

    /**
     * update data of the table: "organization"
     */
    update_organization: FieldsTypeArg<
      {
        _inc?: organization_inc_input | null;
        _set?: organization_set_input | null;
        where: organization_bool_exp;
      },
      t_organization_mutation_response | null
    >;

    /**
     * update single row of the table: "organization"
     */
    update_organization_by_pk: FieldsTypeArg<
      {
        _inc?: organization_inc_input | null;
        _set?: organization_set_input | null;
        pk_columns: organization_pk_columns_input;
      },
      t_organization | null
    >;

    /**
     * update data of the table: "organization_invite_user"
     */
    update_organization_invite_user: FieldsTypeArg<
      {
        _inc?: organization_invite_user_inc_input | null;
        _set?: organization_invite_user_set_input | null;
        where: organization_invite_user_bool_exp;
      },
      t_organization_invite_user_mutation_response | null
    >;

    /**
     * update single row of the table: "organization_invite_user"
     */
    update_organization_invite_user_by_pk: FieldsTypeArg<
      {
        _inc?: organization_invite_user_inc_input | null;
        _set?: organization_invite_user_set_input | null;
        pk_columns: organization_invite_user_pk_columns_input;
      },
      t_organization_invite_user | null
    >;

    /**
     * update data of the table: "project"
     */
    update_project: FieldsTypeArg<
      {
        _inc?: project_inc_input | null;
        _set?: project_set_input | null;
        where: project_bool_exp;
      },
      t_project_mutation_response | null
    >;

    /**
     * update single row of the table: "project"
     */
    update_project_by_pk: FieldsTypeArg<
      {
        _inc?: project_inc_input | null;
        _set?: project_set_input | null;
        pk_columns: project_pk_columns_input;
      },
      t_project | null
    >;

    /**
     * update data of the table: "project_run_history"
     */
    update_project_run_history: FieldsTypeArg<
      {
        _inc?: project_run_history_inc_input | null;
        _set?: project_run_history_set_input | null;
        where: project_run_history_bool_exp;
      },
      t_project_run_history_mutation_response | null
    >;

    /**
     * update single row of the table: "project_run_history"
     */
    update_project_run_history_by_pk: FieldsTypeArg<
      {
        _inc?: project_run_history_inc_input | null;
        _set?: project_run_history_set_input | null;
        pk_columns: project_run_history_pk_columns_input;
      },
      t_project_run_history | null
    >;

    /**
     * update data of the table: "user"
     */
    update_user: FieldsTypeArg<
      {
        _inc?: user_inc_input | null;
        _set?: user_set_input | null;
        where: user_bool_exp;
      },
      t_user_mutation_response | null
    >;

    /**
     * update single row of the table: "user"
     */
    update_user_by_pk: FieldsTypeArg<
      {
        _inc?: user_inc_input | null;
        _set?: user_set_input | null;
        pk_columns: user_pk_columns_input;
      },
      t_user | null
    >;
  },
  Extension<"mutation_root">
>;

/**
 * @name order_by
 * @type ENUM
 */
type t_order_by = EnumType<
  | "asc"
  | "asc_nulls_first"
  | "asc_nulls_last"
  | "desc"
  | "desc_nulls_first"
  | "desc_nulls_last"
>;

/**
 * @name organization
 * @type OBJECT
 */
type t_organization = FieldsType<
  {
    __typename: t_String<"organization">;
    id: t_Int;

    /**
     * An array relationship
     */
    invited_users: FieldsTypeArg<
      {
        distinct_on?: organization_invite_user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_invite_user_order_by[] | null;
        where?: organization_invite_user_bool_exp | null;
      },
      t_organization_invite_user[]
    >;

    /**
     * An aggregated array relationship
     */
    invited_users_aggregate: FieldsTypeArg<
      {
        distinct_on?: organization_invite_user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_invite_user_order_by[] | null;
        where?: organization_invite_user_bool_exp | null;
      },
      t_organization_invite_user_aggregate
    >;
    name: t_String;

    /**
     * An object relationship
     */
    owner: t_user;
    owner_id: t_Int;

    /**
     * An array relationship
     */
    projects: FieldsTypeArg<
      {
        distinct_on?: project_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_order_by[] | null;
        where?: project_bool_exp | null;
      },
      t_project[]
    >;

    /**
     * An aggregated array relationship
     */
    projects_aggregate: FieldsTypeArg<
      {
        distinct_on?: project_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_order_by[] | null;
        where?: project_bool_exp | null;
      },
      t_project_aggregate
    >;
  },
  Extension<"organization">
>;

/**
 * @name organization_aggregate
 * @type OBJECT
 */
type t_organization_aggregate = FieldsType<
  {
    __typename: t_String<"organization_aggregate">;
    aggregate: t_organization_aggregate_fields | null;
    nodes: t_organization[];
  },
  Extension<"organization_aggregate">
>;

/**
 * @name organization_aggregate_fields
 * @type OBJECT
 */
type t_organization_aggregate_fields = FieldsType<
  {
    __typename: t_String<"organization_aggregate_fields">;
    avg: t_organization_avg_fields | null;
    count: FieldsTypeArg<
      {
        columns?: organization_select_column[] | null;
        distinct?: boolean | null;
      },
      t_Int | null
    >;
    max: t_organization_max_fields | null;
    min: t_organization_min_fields | null;
    stddev: t_organization_stddev_fields | null;
    stddev_pop: t_organization_stddev_pop_fields | null;
    stddev_samp: t_organization_stddev_samp_fields | null;
    sum: t_organization_sum_fields | null;
    var_pop: t_organization_var_pop_fields | null;
    var_samp: t_organization_var_samp_fields | null;
    variance: t_organization_variance_fields | null;
  },
  Extension<"organization_aggregate_fields">
>;

/**
 * @name organization_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type organization_aggregate_order_by = {
  avg: organization_avg_order_by | null;
  count: order_by | null;
  max: organization_max_order_by | null;
  min: organization_min_order_by | null;
  stddev: organization_stddev_order_by | null;
  stddev_pop: organization_stddev_pop_order_by | null;
  stddev_samp: organization_stddev_samp_order_by | null;
  sum: organization_sum_order_by | null;
  var_pop: organization_var_pop_order_by | null;
  var_samp: organization_var_samp_order_by | null;
  variance: organization_variance_order_by | null;
};

/**
 * @name organization_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type organization_arr_rel_insert_input = {
  data: organization_insert_input[];
  on_conflict: organization_on_conflict | null;
};

/**
 * @name organization_avg_fields
 * @type OBJECT
 */
type t_organization_avg_fields = FieldsType<
  {
    __typename: t_String<"organization_avg_fields">;
    id: t_Float | null;
    owner_id: t_Float | null;
  },
  Extension<"organization_avg_fields">
>;

/**
 * @name organization_avg_order_by
 * @type INPUT_OBJECT
 */
export type organization_avg_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_bool_exp
 * @type INPUT_OBJECT
 */
export type organization_bool_exp = {
  _and: (organization_bool_exp | null)[] | null;
  _not: organization_bool_exp | null;
  _or: (organization_bool_exp | null)[] | null;
  id: Int_comparison_exp | null;
  invited_users: organization_invite_user_bool_exp | null;
  name: String_comparison_exp | null;
  owner: user_bool_exp | null;
  owner_id: Int_comparison_exp | null;
  projects: project_bool_exp | null;
};

/**
 * @name organization_constraint
 * @type ENUM
 */
type t_organization_constraint = EnumType<
  "organization_name_key" | "organization_pkey"
>;

/**
 * @name organization_inc_input
 * @type INPUT_OBJECT
 */
export type organization_inc_input = {
  id: number | null;
  owner_id: number | null;
};

/**
 * @name organization_insert_input
 * @type INPUT_OBJECT
 */
export type organization_insert_input = {
  id: number | null;
  invited_users: organization_invite_user_arr_rel_insert_input | null;
  name: string | null;
  owner: user_obj_rel_insert_input | null;
  owner_id: number | null;
  projects: project_arr_rel_insert_input | null;
};

/**
 * @name organization_invite_user
 * @type OBJECT
 */
type t_organization_invite_user = FieldsType<
  {
    __typename: t_String<"organization_invite_user">;
    created_at: t_timestamptz;
    email: t_String;
    id: t_Int;
    invite_token: t_uuid;

    /**
     * An object relationship
     */
    organization: t_organization;
    organization_id: t_Int;
  },
  Extension<"organization_invite_user">
>;

/**
 * @name organization_invite_user_aggregate
 * @type OBJECT
 */
type t_organization_invite_user_aggregate = FieldsType<
  {
    __typename: t_String<"organization_invite_user_aggregate">;
    aggregate: t_organization_invite_user_aggregate_fields | null;
    nodes: t_organization_invite_user[];
  },
  Extension<"organization_invite_user_aggregate">
>;

/**
 * @name organization_invite_user_aggregate_fields
 * @type OBJECT
 */
type t_organization_invite_user_aggregate_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_aggregate_fields">;
    avg: t_organization_invite_user_avg_fields | null;
    count: FieldsTypeArg<
      {
        columns?: organization_invite_user_select_column[] | null;
        distinct?: boolean | null;
      },
      t_Int | null
    >;
    max: t_organization_invite_user_max_fields | null;
    min: t_organization_invite_user_min_fields | null;
    stddev: t_organization_invite_user_stddev_fields | null;
    stddev_pop: t_organization_invite_user_stddev_pop_fields | null;
    stddev_samp: t_organization_invite_user_stddev_samp_fields | null;
    sum: t_organization_invite_user_sum_fields | null;
    var_pop: t_organization_invite_user_var_pop_fields | null;
    var_samp: t_organization_invite_user_var_samp_fields | null;
    variance: t_organization_invite_user_variance_fields | null;
  },
  Extension<"organization_invite_user_aggregate_fields">
>;

/**
 * @name organization_invite_user_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_aggregate_order_by = {
  avg: organization_invite_user_avg_order_by | null;
  count: order_by | null;
  max: organization_invite_user_max_order_by | null;
  min: organization_invite_user_min_order_by | null;
  stddev: organization_invite_user_stddev_order_by | null;
  stddev_pop: organization_invite_user_stddev_pop_order_by | null;
  stddev_samp: organization_invite_user_stddev_samp_order_by | null;
  sum: organization_invite_user_sum_order_by | null;
  var_pop: organization_invite_user_var_pop_order_by | null;
  var_samp: organization_invite_user_var_samp_order_by | null;
  variance: organization_invite_user_variance_order_by | null;
};

/**
 * @name organization_invite_user_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_arr_rel_insert_input = {
  data: organization_invite_user_insert_input[];
  on_conflict: organization_invite_user_on_conflict | null;
};

/**
 * @name organization_invite_user_avg_fields
 * @type OBJECT
 */
type t_organization_invite_user_avg_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_avg_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"organization_invite_user_avg_fields">
>;

/**
 * @name organization_invite_user_avg_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_avg_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_bool_exp
 * @type INPUT_OBJECT
 */
export type organization_invite_user_bool_exp = {
  _and: (organization_invite_user_bool_exp | null)[] | null;
  _not: organization_invite_user_bool_exp | null;
  _or: (organization_invite_user_bool_exp | null)[] | null;
  created_at: timestamptz_comparison_exp | null;
  email: String_comparison_exp | null;
  id: Int_comparison_exp | null;
  invite_token: uuid_comparison_exp | null;
  organization: organization_bool_exp | null;
  organization_id: Int_comparison_exp | null;
};

/**
 * @name organization_invite_user_constraint
 * @type ENUM
 */
type t_organization_invite_user_constraint = EnumType<
  "organization_invite_user_email_key" | "organization_invite_user_pkey"
>;

/**
 * @name organization_invite_user_inc_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_inc_input = {
  id: number | null;
  organization_id: number | null;
};

/**
 * @name organization_invite_user_insert_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_insert_input = {
  created_at: any | null;
  email: string | null;
  id: number | null;
  invite_token: any | null;
  organization: organization_obj_rel_insert_input | null;
  organization_id: number | null;
};

/**
 * @name organization_invite_user_max_fields
 * @type OBJECT
 */
type t_organization_invite_user_max_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_max_fields">;
    created_at: t_timestamptz | null;
    email: t_String | null;
    id: t_Int | null;
    invite_token: t_uuid | null;
    organization_id: t_Int | null;
  },
  Extension<"organization_invite_user_max_fields">
>;

/**
 * @name organization_invite_user_max_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_max_order_by = {
  created_at: order_by | null;
  email: order_by | null;
  id: order_by | null;
  invite_token: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_min_fields
 * @type OBJECT
 */
type t_organization_invite_user_min_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_min_fields">;
    created_at: t_timestamptz | null;
    email: t_String | null;
    id: t_Int | null;
    invite_token: t_uuid | null;
    organization_id: t_Int | null;
  },
  Extension<"organization_invite_user_min_fields">
>;

/**
 * @name organization_invite_user_min_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_min_order_by = {
  created_at: order_by | null;
  email: order_by | null;
  id: order_by | null;
  invite_token: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_mutation_response
 * @type OBJECT
 */
type t_organization_invite_user_mutation_response = FieldsType<
  {
    __typename: t_String<"organization_invite_user_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_organization_invite_user[];
  },
  Extension<"organization_invite_user_mutation_response">
>;

/**
 * @name organization_invite_user_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_obj_rel_insert_input = {
  data: organization_invite_user_insert_input;
  on_conflict: organization_invite_user_on_conflict | null;
};

/**
 * @name organization_invite_user_on_conflict
 * @type INPUT_OBJECT
 */
export type organization_invite_user_on_conflict = {
  constraint: organization_invite_user_constraint;
  update_columns: organization_invite_user_update_column[];
  where: organization_invite_user_bool_exp | null;
};

/**
 * @name organization_invite_user_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_order_by = {
  created_at: order_by | null;
  email: order_by | null;
  id: order_by | null;
  invite_token: order_by | null;
  organization: organization_order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_pk_columns_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_pk_columns_input = { id: number };

/**
 * @name organization_invite_user_select_column
 * @type ENUM
 */
type t_organization_invite_user_select_column = EnumType<
  "created_at" | "email" | "id" | "invite_token" | "organization_id"
>;

/**
 * @name organization_invite_user_set_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_set_input = {
  created_at: any | null;
  email: string | null;
  id: number | null;
  invite_token: any | null;
  organization_id: number | null;
};

/**
 * @name organization_invite_user_stddev_fields
 * @type OBJECT
 */
type t_organization_invite_user_stddev_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_stddev_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"organization_invite_user_stddev_fields">
>;

/**
 * @name organization_invite_user_stddev_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_stddev_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_stddev_pop_fields
 * @type OBJECT
 */
type t_organization_invite_user_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_stddev_pop_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"organization_invite_user_stddev_pop_fields">
>;

/**
 * @name organization_invite_user_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_stddev_pop_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_stddev_samp_fields
 * @type OBJECT
 */
type t_organization_invite_user_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_stddev_samp_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"organization_invite_user_stddev_samp_fields">
>;

/**
 * @name organization_invite_user_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_stddev_samp_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_sum_fields
 * @type OBJECT
 */
type t_organization_invite_user_sum_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_sum_fields">;
    id: t_Int | null;
    organization_id: t_Int | null;
  },
  Extension<"organization_invite_user_sum_fields">
>;

/**
 * @name organization_invite_user_sum_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_sum_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_update_column
 * @type ENUM
 */
type t_organization_invite_user_update_column = EnumType<
  "created_at" | "email" | "id" | "invite_token" | "organization_id"
>;

/**
 * @name organization_invite_user_var_pop_fields
 * @type OBJECT
 */
type t_organization_invite_user_var_pop_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_var_pop_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"organization_invite_user_var_pop_fields">
>;

/**
 * @name organization_invite_user_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_var_pop_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_var_samp_fields
 * @type OBJECT
 */
type t_organization_invite_user_var_samp_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_var_samp_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"organization_invite_user_var_samp_fields">
>;

/**
 * @name organization_invite_user_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_var_samp_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_invite_user_variance_fields
 * @type OBJECT
 */
type t_organization_invite_user_variance_fields = FieldsType<
  {
    __typename: t_String<"organization_invite_user_variance_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"organization_invite_user_variance_fields">
>;

/**
 * @name organization_invite_user_variance_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_variance_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name organization_max_fields
 * @type OBJECT
 */
type t_organization_max_fields = FieldsType<
  {
    __typename: t_String<"organization_max_fields">;
    id: t_Int | null;
    name: t_String | null;
    owner_id: t_Int | null;
  },
  Extension<"organization_max_fields">
>;

/**
 * @name organization_max_order_by
 * @type INPUT_OBJECT
 */
export type organization_max_order_by = {
  id: order_by | null;
  name: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_min_fields
 * @type OBJECT
 */
type t_organization_min_fields = FieldsType<
  {
    __typename: t_String<"organization_min_fields">;
    id: t_Int | null;
    name: t_String | null;
    owner_id: t_Int | null;
  },
  Extension<"organization_min_fields">
>;

/**
 * @name organization_min_order_by
 * @type INPUT_OBJECT
 */
export type organization_min_order_by = {
  id: order_by | null;
  name: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_mutation_response
 * @type OBJECT
 */
type t_organization_mutation_response = FieldsType<
  {
    __typename: t_String<"organization_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_organization[];
  },
  Extension<"organization_mutation_response">
>;

/**
 * @name organization_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type organization_obj_rel_insert_input = {
  data: organization_insert_input;
  on_conflict: organization_on_conflict | null;
};

/**
 * @name organization_on_conflict
 * @type INPUT_OBJECT
 */
export type organization_on_conflict = {
  constraint: organization_constraint;
  update_columns: organization_update_column[];
  where: organization_bool_exp | null;
};

/**
 * @name organization_order_by
 * @type INPUT_OBJECT
 */
export type organization_order_by = {
  id: order_by | null;
  invited_users_aggregate: organization_invite_user_aggregate_order_by | null;
  name: order_by | null;
  owner: user_order_by | null;
  owner_id: order_by | null;
  projects_aggregate: project_aggregate_order_by | null;
};

/**
 * @name organization_pk_columns_input
 * @type INPUT_OBJECT
 */
export type organization_pk_columns_input = { id: number };

/**
 * @name organization_select_column
 * @type ENUM
 */
type t_organization_select_column = EnumType<"id" | "name" | "owner_id">;

/**
 * @name organization_set_input
 * @type INPUT_OBJECT
 */
export type organization_set_input = {
  id: number | null;
  name: string | null;
  owner_id: number | null;
};

/**
 * @name organization_stddev_fields
 * @type OBJECT
 */
type t_organization_stddev_fields = FieldsType<
  {
    __typename: t_String<"organization_stddev_fields">;
    id: t_Float | null;
    owner_id: t_Float | null;
  },
  Extension<"organization_stddev_fields">
>;

/**
 * @name organization_stddev_order_by
 * @type INPUT_OBJECT
 */
export type organization_stddev_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_stddev_pop_fields
 * @type OBJECT
 */
type t_organization_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"organization_stddev_pop_fields">;
    id: t_Float | null;
    owner_id: t_Float | null;
  },
  Extension<"organization_stddev_pop_fields">
>;

/**
 * @name organization_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type organization_stddev_pop_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_stddev_samp_fields
 * @type OBJECT
 */
type t_organization_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"organization_stddev_samp_fields">;
    id: t_Float | null;
    owner_id: t_Float | null;
  },
  Extension<"organization_stddev_samp_fields">
>;

/**
 * @name organization_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type organization_stddev_samp_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_sum_fields
 * @type OBJECT
 */
type t_organization_sum_fields = FieldsType<
  {
    __typename: t_String<"organization_sum_fields">;
    id: t_Int | null;
    owner_id: t_Int | null;
  },
  Extension<"organization_sum_fields">
>;

/**
 * @name organization_sum_order_by
 * @type INPUT_OBJECT
 */
export type organization_sum_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_update_column
 * @type ENUM
 */
type t_organization_update_column = EnumType<"id" | "name" | "owner_id">;

/**
 * @name organization_var_pop_fields
 * @type OBJECT
 */
type t_organization_var_pop_fields = FieldsType<
  {
    __typename: t_String<"organization_var_pop_fields">;
    id: t_Float | null;
    owner_id: t_Float | null;
  },
  Extension<"organization_var_pop_fields">
>;

/**
 * @name organization_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type organization_var_pop_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_var_samp_fields
 * @type OBJECT
 */
type t_organization_var_samp_fields = FieldsType<
  {
    __typename: t_String<"organization_var_samp_fields">;
    id: t_Float | null;
    owner_id: t_Float | null;
  },
  Extension<"organization_var_samp_fields">
>;

/**
 * @name organization_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type organization_var_samp_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name organization_variance_fields
 * @type OBJECT
 */
type t_organization_variance_fields = FieldsType<
  {
    __typename: t_String<"organization_variance_fields">;
    id: t_Float | null;
    owner_id: t_Float | null;
  },
  Extension<"organization_variance_fields">
>;

/**
 * @name organization_variance_order_by
 * @type INPUT_OBJECT
 */
export type organization_variance_order_by = {
  id: order_by | null;
  owner_id: order_by | null;
};

/**
 * @name project
 * @type OBJECT
 */
type t_project = FieldsType<
  {
    __typename: t_String<"project">;

    /**
     * An array relationship
     */
    commands: FieldsTypeArg<
      {
        distinct_on?: command_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_order_by[] | null;
        where?: command_bool_exp | null;
      },
      t_command[]
    >;

    /**
     * An aggregated array relationship
     */
    commands_aggregate: FieldsTypeArg<
      {
        distinct_on?: command_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_order_by[] | null;
        where?: command_bool_exp | null;
      },
      t_command_aggregate
    >;
    id: t_Int;
    name: t_String;

    /**
     * An object relationship
     */
    organization: t_organization;
    organization_id: t_Int;

    /**
     * An array relationship
     */
    run_history: FieldsTypeArg<
      {
        distinct_on?: project_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_run_history_order_by[] | null;
        where?: project_run_history_bool_exp | null;
      },
      t_project_run_history[]
    >;

    /**
     * An aggregated array relationship
     */
    run_history_aggregate: FieldsTypeArg<
      {
        distinct_on?: project_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_run_history_order_by[] | null;
        where?: project_run_history_bool_exp | null;
      },
      t_project_run_history_aggregate
    >;
  },
  Extension<"project">
>;

/**
 * @name project_aggregate
 * @type OBJECT
 */
type t_project_aggregate = FieldsType<
  {
    __typename: t_String<"project_aggregate">;
    aggregate: t_project_aggregate_fields | null;
    nodes: t_project[];
  },
  Extension<"project_aggregate">
>;

/**
 * @name project_aggregate_fields
 * @type OBJECT
 */
type t_project_aggregate_fields = FieldsType<
  {
    __typename: t_String<"project_aggregate_fields">;
    avg: t_project_avg_fields | null;
    count: FieldsTypeArg<
      { columns?: project_select_column[] | null; distinct?: boolean | null },
      t_Int | null
    >;
    max: t_project_max_fields | null;
    min: t_project_min_fields | null;
    stddev: t_project_stddev_fields | null;
    stddev_pop: t_project_stddev_pop_fields | null;
    stddev_samp: t_project_stddev_samp_fields | null;
    sum: t_project_sum_fields | null;
    var_pop: t_project_var_pop_fields | null;
    var_samp: t_project_var_samp_fields | null;
    variance: t_project_variance_fields | null;
  },
  Extension<"project_aggregate_fields">
>;

/**
 * @name project_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type project_aggregate_order_by = {
  avg: project_avg_order_by | null;
  count: order_by | null;
  max: project_max_order_by | null;
  min: project_min_order_by | null;
  stddev: project_stddev_order_by | null;
  stddev_pop: project_stddev_pop_order_by | null;
  stddev_samp: project_stddev_samp_order_by | null;
  sum: project_sum_order_by | null;
  var_pop: project_var_pop_order_by | null;
  var_samp: project_var_samp_order_by | null;
  variance: project_variance_order_by | null;
};

/**
 * @name project_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type project_arr_rel_insert_input = {
  data: project_insert_input[];
  on_conflict: project_on_conflict | null;
};

/**
 * @name project_avg_fields
 * @type OBJECT
 */
type t_project_avg_fields = FieldsType<
  {
    __typename: t_String<"project_avg_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"project_avg_fields">
>;

/**
 * @name project_avg_order_by
 * @type INPUT_OBJECT
 */
export type project_avg_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_bool_exp
 * @type INPUT_OBJECT
 */
export type project_bool_exp = {
  _and: (project_bool_exp | null)[] | null;
  _not: project_bool_exp | null;
  _or: (project_bool_exp | null)[] | null;
  commands: command_bool_exp | null;
  id: Int_comparison_exp | null;
  name: String_comparison_exp | null;
  organization: organization_bool_exp | null;
  organization_id: Int_comparison_exp | null;
  run_history: project_run_history_bool_exp | null;
};

/**
 * @name project_constraint
 * @type ENUM
 */
type t_project_constraint = EnumType<
  "project_name_organization_key" | "project_pkey"
>;

/**
 * @name project_inc_input
 * @type INPUT_OBJECT
 */
export type project_inc_input = {
  id: number | null;
  organization_id: number | null;
};

/**
 * @name project_insert_input
 * @type INPUT_OBJECT
 */
export type project_insert_input = {
  commands: command_arr_rel_insert_input | null;
  id: number | null;
  name: string | null;
  organization: organization_obj_rel_insert_input | null;
  organization_id: number | null;
  run_history: project_run_history_arr_rel_insert_input | null;
};

/**
 * @name project_max_fields
 * @type OBJECT
 */
type t_project_max_fields = FieldsType<
  {
    __typename: t_String<"project_max_fields">;
    id: t_Int | null;
    name: t_String | null;
    organization_id: t_Int | null;
  },
  Extension<"project_max_fields">
>;

/**
 * @name project_max_order_by
 * @type INPUT_OBJECT
 */
export type project_max_order_by = {
  id: order_by | null;
  name: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_min_fields
 * @type OBJECT
 */
type t_project_min_fields = FieldsType<
  {
    __typename: t_String<"project_min_fields">;
    id: t_Int | null;
    name: t_String | null;
    organization_id: t_Int | null;
  },
  Extension<"project_min_fields">
>;

/**
 * @name project_min_order_by
 * @type INPUT_OBJECT
 */
export type project_min_order_by = {
  id: order_by | null;
  name: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_mutation_response
 * @type OBJECT
 */
type t_project_mutation_response = FieldsType<
  {
    __typename: t_String<"project_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_project[];
  },
  Extension<"project_mutation_response">
>;

/**
 * @name project_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type project_obj_rel_insert_input = {
  data: project_insert_input;
  on_conflict: project_on_conflict | null;
};

/**
 * @name project_on_conflict
 * @type INPUT_OBJECT
 */
export type project_on_conflict = {
  constraint: project_constraint;
  update_columns: project_update_column[];
  where: project_bool_exp | null;
};

/**
 * @name project_order_by
 * @type INPUT_OBJECT
 */
export type project_order_by = {
  commands_aggregate: command_aggregate_order_by | null;
  id: order_by | null;
  name: order_by | null;
  organization: organization_order_by | null;
  organization_id: order_by | null;
  run_history_aggregate: project_run_history_aggregate_order_by | null;
};

/**
 * @name project_pk_columns_input
 * @type INPUT_OBJECT
 */
export type project_pk_columns_input = { id: number };

/**
 * @name project_run_history
 * @type OBJECT
 */
type t_project_run_history = FieldsType<
  {
    __typename: t_String<"project_run_history">;
    commands_done: t_Int;
    commands_failed: t_Int;
    commands_total: t_Int;
    created_at: t_timestamptz;
    id: t_Int;

    /**
     * An object relationship
     */
    project: t_project;
    project_id: t_Int;
    run_by_user: t_Int;
  },
  Extension<"project_run_history">
>;

/**
 * @name project_run_history_aggregate
 * @type OBJECT
 */
type t_project_run_history_aggregate = FieldsType<
  {
    __typename: t_String<"project_run_history_aggregate">;
    aggregate: t_project_run_history_aggregate_fields | null;
    nodes: t_project_run_history[];
  },
  Extension<"project_run_history_aggregate">
>;

/**
 * @name project_run_history_aggregate_fields
 * @type OBJECT
 */
type t_project_run_history_aggregate_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_aggregate_fields">;
    avg: t_project_run_history_avg_fields | null;
    count: FieldsTypeArg<
      {
        columns?: project_run_history_select_column[] | null;
        distinct?: boolean | null;
      },
      t_Int | null
    >;
    max: t_project_run_history_max_fields | null;
    min: t_project_run_history_min_fields | null;
    stddev: t_project_run_history_stddev_fields | null;
    stddev_pop: t_project_run_history_stddev_pop_fields | null;
    stddev_samp: t_project_run_history_stddev_samp_fields | null;
    sum: t_project_run_history_sum_fields | null;
    var_pop: t_project_run_history_var_pop_fields | null;
    var_samp: t_project_run_history_var_samp_fields | null;
    variance: t_project_run_history_variance_fields | null;
  },
  Extension<"project_run_history_aggregate_fields">
>;

/**
 * @name project_run_history_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_aggregate_order_by = {
  avg: project_run_history_avg_order_by | null;
  count: order_by | null;
  max: project_run_history_max_order_by | null;
  min: project_run_history_min_order_by | null;
  stddev: project_run_history_stddev_order_by | null;
  stddev_pop: project_run_history_stddev_pop_order_by | null;
  stddev_samp: project_run_history_stddev_samp_order_by | null;
  sum: project_run_history_sum_order_by | null;
  var_pop: project_run_history_var_pop_order_by | null;
  var_samp: project_run_history_var_samp_order_by | null;
  variance: project_run_history_variance_order_by | null;
};

/**
 * @name project_run_history_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type project_run_history_arr_rel_insert_input = {
  data: project_run_history_insert_input[];
  on_conflict: project_run_history_on_conflict | null;
};

/**
 * @name project_run_history_avg_fields
 * @type OBJECT
 */
type t_project_run_history_avg_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_avg_fields">;
    commands_done: t_Float | null;
    commands_failed: t_Float | null;
    commands_total: t_Float | null;
    id: t_Float | null;
    project_id: t_Float | null;
    run_by_user: t_Float | null;
  },
  Extension<"project_run_history_avg_fields">
>;

/**
 * @name project_run_history_avg_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_avg_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_bool_exp
 * @type INPUT_OBJECT
 */
export type project_run_history_bool_exp = {
  _and: (project_run_history_bool_exp | null)[] | null;
  _not: project_run_history_bool_exp | null;
  _or: (project_run_history_bool_exp | null)[] | null;
  commands_done: Int_comparison_exp | null;
  commands_failed: Int_comparison_exp | null;
  commands_total: Int_comparison_exp | null;
  created_at: timestamptz_comparison_exp | null;
  id: Int_comparison_exp | null;
  project: project_bool_exp | null;
  project_id: Int_comparison_exp | null;
  run_by_user: Int_comparison_exp | null;
};

/**
 * @name project_run_history_constraint
 * @type ENUM
 */
type t_project_run_history_constraint = EnumType<"run_history_pkey">;

/**
 * @name project_run_history_inc_input
 * @type INPUT_OBJECT
 */
export type project_run_history_inc_input = {
  commands_done: number | null;
  commands_failed: number | null;
  commands_total: number | null;
  id: number | null;
  project_id: number | null;
  run_by_user: number | null;
};

/**
 * @name project_run_history_insert_input
 * @type INPUT_OBJECT
 */
export type project_run_history_insert_input = {
  commands_done: number | null;
  commands_failed: number | null;
  commands_total: number | null;
  created_at: any | null;
  id: number | null;
  project: project_obj_rel_insert_input | null;
  project_id: number | null;
  run_by_user: number | null;
};

/**
 * @name project_run_history_max_fields
 * @type OBJECT
 */
type t_project_run_history_max_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_max_fields">;
    commands_done: t_Int | null;
    commands_failed: t_Int | null;
    commands_total: t_Int | null;
    created_at: t_timestamptz | null;
    id: t_Int | null;
    project_id: t_Int | null;
    run_by_user: t_Int | null;
  },
  Extension<"project_run_history_max_fields">
>;

/**
 * @name project_run_history_max_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_max_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  created_at: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_min_fields
 * @type OBJECT
 */
type t_project_run_history_min_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_min_fields">;
    commands_done: t_Int | null;
    commands_failed: t_Int | null;
    commands_total: t_Int | null;
    created_at: t_timestamptz | null;
    id: t_Int | null;
    project_id: t_Int | null;
    run_by_user: t_Int | null;
  },
  Extension<"project_run_history_min_fields">
>;

/**
 * @name project_run_history_min_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_min_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  created_at: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_mutation_response
 * @type OBJECT
 */
type t_project_run_history_mutation_response = FieldsType<
  {
    __typename: t_String<"project_run_history_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_project_run_history[];
  },
  Extension<"project_run_history_mutation_response">
>;

/**
 * @name project_run_history_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type project_run_history_obj_rel_insert_input = {
  data: project_run_history_insert_input;
  on_conflict: project_run_history_on_conflict | null;
};

/**
 * @name project_run_history_on_conflict
 * @type INPUT_OBJECT
 */
export type project_run_history_on_conflict = {
  constraint: project_run_history_constraint;
  update_columns: project_run_history_update_column[];
  where: project_run_history_bool_exp | null;
};

/**
 * @name project_run_history_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  created_at: order_by | null;
  id: order_by | null;
  project: project_order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_pk_columns_input
 * @type INPUT_OBJECT
 */
export type project_run_history_pk_columns_input = { id: number };

/**
 * @name project_run_history_select_column
 * @type ENUM
 */
type t_project_run_history_select_column = EnumType<
  | "commands_done"
  | "commands_failed"
  | "commands_total"
  | "created_at"
  | "id"
  | "project_id"
  | "run_by_user"
>;

/**
 * @name project_run_history_set_input
 * @type INPUT_OBJECT
 */
export type project_run_history_set_input = {
  commands_done: number | null;
  commands_failed: number | null;
  commands_total: number | null;
  created_at: any | null;
  id: number | null;
  project_id: number | null;
  run_by_user: number | null;
};

/**
 * @name project_run_history_stddev_fields
 * @type OBJECT
 */
type t_project_run_history_stddev_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_stddev_fields">;
    commands_done: t_Float | null;
    commands_failed: t_Float | null;
    commands_total: t_Float | null;
    id: t_Float | null;
    project_id: t_Float | null;
    run_by_user: t_Float | null;
  },
  Extension<"project_run_history_stddev_fields">
>;

/**
 * @name project_run_history_stddev_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_stddev_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_stddev_pop_fields
 * @type OBJECT
 */
type t_project_run_history_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_stddev_pop_fields">;
    commands_done: t_Float | null;
    commands_failed: t_Float | null;
    commands_total: t_Float | null;
    id: t_Float | null;
    project_id: t_Float | null;
    run_by_user: t_Float | null;
  },
  Extension<"project_run_history_stddev_pop_fields">
>;

/**
 * @name project_run_history_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_stddev_pop_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_stddev_samp_fields
 * @type OBJECT
 */
type t_project_run_history_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_stddev_samp_fields">;
    commands_done: t_Float | null;
    commands_failed: t_Float | null;
    commands_total: t_Float | null;
    id: t_Float | null;
    project_id: t_Float | null;
    run_by_user: t_Float | null;
  },
  Extension<"project_run_history_stddev_samp_fields">
>;

/**
 * @name project_run_history_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_stddev_samp_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_sum_fields
 * @type OBJECT
 */
type t_project_run_history_sum_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_sum_fields">;
    commands_done: t_Int | null;
    commands_failed: t_Int | null;
    commands_total: t_Int | null;
    id: t_Int | null;
    project_id: t_Int | null;
    run_by_user: t_Int | null;
  },
  Extension<"project_run_history_sum_fields">
>;

/**
 * @name project_run_history_sum_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_sum_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_update_column
 * @type ENUM
 */
type t_project_run_history_update_column = EnumType<
  | "commands_done"
  | "commands_failed"
  | "commands_total"
  | "created_at"
  | "id"
  | "project_id"
  | "run_by_user"
>;

/**
 * @name project_run_history_var_pop_fields
 * @type OBJECT
 */
type t_project_run_history_var_pop_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_var_pop_fields">;
    commands_done: t_Float | null;
    commands_failed: t_Float | null;
    commands_total: t_Float | null;
    id: t_Float | null;
    project_id: t_Float | null;
    run_by_user: t_Float | null;
  },
  Extension<"project_run_history_var_pop_fields">
>;

/**
 * @name project_run_history_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_var_pop_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_var_samp_fields
 * @type OBJECT
 */
type t_project_run_history_var_samp_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_var_samp_fields">;
    commands_done: t_Float | null;
    commands_failed: t_Float | null;
    commands_total: t_Float | null;
    id: t_Float | null;
    project_id: t_Float | null;
    run_by_user: t_Float | null;
  },
  Extension<"project_run_history_var_samp_fields">
>;

/**
 * @name project_run_history_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_var_samp_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_run_history_variance_fields
 * @type OBJECT
 */
type t_project_run_history_variance_fields = FieldsType<
  {
    __typename: t_String<"project_run_history_variance_fields">;
    commands_done: t_Float | null;
    commands_failed: t_Float | null;
    commands_total: t_Float | null;
    id: t_Float | null;
    project_id: t_Float | null;
    run_by_user: t_Float | null;
  },
  Extension<"project_run_history_variance_fields">
>;

/**
 * @name project_run_history_variance_order_by
 * @type INPUT_OBJECT
 */
export type project_run_history_variance_order_by = {
  commands_done: order_by | null;
  commands_failed: order_by | null;
  commands_total: order_by | null;
  id: order_by | null;
  project_id: order_by | null;
  run_by_user: order_by | null;
};

/**
 * @name project_select_column
 * @type ENUM
 */
type t_project_select_column = EnumType<"id" | "name" | "organization_id">;

/**
 * @name project_set_input
 * @type INPUT_OBJECT
 */
export type project_set_input = {
  id: number | null;
  name: string | null;
  organization_id: number | null;
};

/**
 * @name project_stddev_fields
 * @type OBJECT
 */
type t_project_stddev_fields = FieldsType<
  {
    __typename: t_String<"project_stddev_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"project_stddev_fields">
>;

/**
 * @name project_stddev_order_by
 * @type INPUT_OBJECT
 */
export type project_stddev_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_stddev_pop_fields
 * @type OBJECT
 */
type t_project_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"project_stddev_pop_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"project_stddev_pop_fields">
>;

/**
 * @name project_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type project_stddev_pop_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_stddev_samp_fields
 * @type OBJECT
 */
type t_project_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"project_stddev_samp_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"project_stddev_samp_fields">
>;

/**
 * @name project_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type project_stddev_samp_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_sum_fields
 * @type OBJECT
 */
type t_project_sum_fields = FieldsType<
  {
    __typename: t_String<"project_sum_fields">;
    id: t_Int | null;
    organization_id: t_Int | null;
  },
  Extension<"project_sum_fields">
>;

/**
 * @name project_sum_order_by
 * @type INPUT_OBJECT
 */
export type project_sum_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_update_column
 * @type ENUM
 */
type t_project_update_column = EnumType<"id" | "name" | "organization_id">;

/**
 * @name project_var_pop_fields
 * @type OBJECT
 */
type t_project_var_pop_fields = FieldsType<
  {
    __typename: t_String<"project_var_pop_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"project_var_pop_fields">
>;

/**
 * @name project_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type project_var_pop_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_var_samp_fields
 * @type OBJECT
 */
type t_project_var_samp_fields = FieldsType<
  {
    __typename: t_String<"project_var_samp_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"project_var_samp_fields">
>;

/**
 * @name project_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type project_var_samp_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name project_variance_fields
 * @type OBJECT
 */
type t_project_variance_fields = FieldsType<
  {
    __typename: t_String<"project_variance_fields">;
    id: t_Float | null;
    organization_id: t_Float | null;
  },
  Extension<"project_variance_fields">
>;

/**
 * @name project_variance_order_by
 * @type INPUT_OBJECT
 */
export type project_variance_order_by = {
  id: order_by | null;
  organization_id: order_by | null;
};

/**
 * @name query_root
 * @type OBJECT
 */
type t_query_root = FieldsType<
  {
    __typename: t_String<"query_root">;

    /**
     * fetch data from the table: "command"
     */
    command: FieldsTypeArg<
      {
        distinct_on?: command_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_order_by[] | null;
        where?: command_bool_exp | null;
      },
      t_command[]
    >;

    /**
     * fetch aggregated fields from the table: "command"
     */
    command_aggregate: FieldsTypeArg<
      {
        distinct_on?: command_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_order_by[] | null;
        where?: command_bool_exp | null;
      },
      t_command_aggregate
    >;

    /**
     * fetch data from the table: "command" using primary key columns
     */
    command_by_pk: FieldsTypeArg<{ id: any }, t_command | null>;

    /**
     * fetch data from the table: "command_run_history"
     */
    command_run_history: FieldsTypeArg<
      {
        distinct_on?: command_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_run_history_order_by[] | null;
        where?: command_run_history_bool_exp | null;
      },
      t_command_run_history[]
    >;

    /**
     * fetch aggregated fields from the table: "command_run_history"
     */
    command_run_history_aggregate: FieldsTypeArg<
      {
        distinct_on?: command_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_run_history_order_by[] | null;
        where?: command_run_history_bool_exp | null;
      },
      t_command_run_history_aggregate
    >;

    /**
     * fetch data from the table: "command_run_history" using primary key columns
     */
    command_run_history_by_pk: FieldsTypeArg<
      { id: any },
      t_command_run_history | null
    >;

    /**
     * fetch data from the table: "organization"
     */
    organization: FieldsTypeArg<
      {
        distinct_on?: organization_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_order_by[] | null;
        where?: organization_bool_exp | null;
      },
      t_organization[]
    >;

    /**
     * fetch aggregated fields from the table: "organization"
     */
    organization_aggregate: FieldsTypeArg<
      {
        distinct_on?: organization_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_order_by[] | null;
        where?: organization_bool_exp | null;
      },
      t_organization_aggregate
    >;

    /**
     * fetch data from the table: "organization" using primary key columns
     */
    organization_by_pk: FieldsTypeArg<{ id: number }, t_organization | null>;

    /**
     * fetch data from the table: "organization_invite_user"
     */
    organization_invite_user: FieldsTypeArg<
      {
        distinct_on?: organization_invite_user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_invite_user_order_by[] | null;
        where?: organization_invite_user_bool_exp | null;
      },
      t_organization_invite_user[]
    >;

    /**
     * fetch aggregated fields from the table: "organization_invite_user"
     */
    organization_invite_user_aggregate: FieldsTypeArg<
      {
        distinct_on?: organization_invite_user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_invite_user_order_by[] | null;
        where?: organization_invite_user_bool_exp | null;
      },
      t_organization_invite_user_aggregate
    >;

    /**
     * fetch data from the table: "organization_invite_user" using primary key columns
     */
    organization_invite_user_by_pk: FieldsTypeArg<
      { id: number },
      t_organization_invite_user | null
    >;

    /**
     * fetch data from the table: "project"
     */
    project: FieldsTypeArg<
      {
        distinct_on?: project_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_order_by[] | null;
        where?: project_bool_exp | null;
      },
      t_project[]
    >;

    /**
     * fetch aggregated fields from the table: "project"
     */
    project_aggregate: FieldsTypeArg<
      {
        distinct_on?: project_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_order_by[] | null;
        where?: project_bool_exp | null;
      },
      t_project_aggregate
    >;

    /**
     * fetch data from the table: "project" using primary key columns
     */
    project_by_pk: FieldsTypeArg<{ id: number }, t_project | null>;

    /**
     * fetch data from the table: "project_run_history"
     */
    project_run_history: FieldsTypeArg<
      {
        distinct_on?: project_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_run_history_order_by[] | null;
        where?: project_run_history_bool_exp | null;
      },
      t_project_run_history[]
    >;

    /**
     * fetch aggregated fields from the table: "project_run_history"
     */
    project_run_history_aggregate: FieldsTypeArg<
      {
        distinct_on?: project_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_run_history_order_by[] | null;
        where?: project_run_history_bool_exp | null;
      },
      t_project_run_history_aggregate
    >;

    /**
     * fetch data from the table: "project_run_history" using primary key columns
     */
    project_run_history_by_pk: FieldsTypeArg<
      { id: number },
      t_project_run_history | null
    >;

    /**
     * fetch data from the table: "user"
     */
    user: FieldsTypeArg<
      {
        distinct_on?: user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: user_order_by[] | null;
        where?: user_bool_exp | null;
      },
      t_user[]
    >;

    /**
     * fetch aggregated fields from the table: "user"
     */
    user_aggregate: FieldsTypeArg<
      {
        distinct_on?: user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: user_order_by[] | null;
        where?: user_bool_exp | null;
      },
      t_user_aggregate
    >;

    /**
     * fetch data from the table: "user" using primary key columns
     */
    user_by_pk: FieldsTypeArg<{ id: number }, t_user | null>;
  },
  Extension<"query_root">
>;

/**
 * @name subscription_root
 * @type OBJECT
 */
type t_subscription_root = FieldsType<
  {
    __typename: t_String<"subscription_root">;

    /**
     * fetch data from the table: "command"
     */
    command: FieldsTypeArg<
      {
        distinct_on?: command_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_order_by[] | null;
        where?: command_bool_exp | null;
      },
      t_command[]
    >;

    /**
     * fetch aggregated fields from the table: "command"
     */
    command_aggregate: FieldsTypeArg<
      {
        distinct_on?: command_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_order_by[] | null;
        where?: command_bool_exp | null;
      },
      t_command_aggregate
    >;

    /**
     * fetch data from the table: "command" using primary key columns
     */
    command_by_pk: FieldsTypeArg<{ id: any }, t_command | null>;

    /**
     * fetch data from the table: "command_run_history"
     */
    command_run_history: FieldsTypeArg<
      {
        distinct_on?: command_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_run_history_order_by[] | null;
        where?: command_run_history_bool_exp | null;
      },
      t_command_run_history[]
    >;

    /**
     * fetch aggregated fields from the table: "command_run_history"
     */
    command_run_history_aggregate: FieldsTypeArg<
      {
        distinct_on?: command_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: command_run_history_order_by[] | null;
        where?: command_run_history_bool_exp | null;
      },
      t_command_run_history_aggregate
    >;

    /**
     * fetch data from the table: "command_run_history" using primary key columns
     */
    command_run_history_by_pk: FieldsTypeArg<
      { id: any },
      t_command_run_history | null
    >;

    /**
     * fetch data from the table: "organization"
     */
    organization: FieldsTypeArg<
      {
        distinct_on?: organization_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_order_by[] | null;
        where?: organization_bool_exp | null;
      },
      t_organization[]
    >;

    /**
     * fetch aggregated fields from the table: "organization"
     */
    organization_aggregate: FieldsTypeArg<
      {
        distinct_on?: organization_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_order_by[] | null;
        where?: organization_bool_exp | null;
      },
      t_organization_aggregate
    >;

    /**
     * fetch data from the table: "organization" using primary key columns
     */
    organization_by_pk: FieldsTypeArg<{ id: number }, t_organization | null>;

    /**
     * fetch data from the table: "organization_invite_user"
     */
    organization_invite_user: FieldsTypeArg<
      {
        distinct_on?: organization_invite_user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_invite_user_order_by[] | null;
        where?: organization_invite_user_bool_exp | null;
      },
      t_organization_invite_user[]
    >;

    /**
     * fetch aggregated fields from the table: "organization_invite_user"
     */
    organization_invite_user_aggregate: FieldsTypeArg<
      {
        distinct_on?: organization_invite_user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_invite_user_order_by[] | null;
        where?: organization_invite_user_bool_exp | null;
      },
      t_organization_invite_user_aggregate
    >;

    /**
     * fetch data from the table: "organization_invite_user" using primary key columns
     */
    organization_invite_user_by_pk: FieldsTypeArg<
      { id: number },
      t_organization_invite_user | null
    >;

    /**
     * fetch data from the table: "project"
     */
    project: FieldsTypeArg<
      {
        distinct_on?: project_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_order_by[] | null;
        where?: project_bool_exp | null;
      },
      t_project[]
    >;

    /**
     * fetch aggregated fields from the table: "project"
     */
    project_aggregate: FieldsTypeArg<
      {
        distinct_on?: project_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_order_by[] | null;
        where?: project_bool_exp | null;
      },
      t_project_aggregate
    >;

    /**
     * fetch data from the table: "project" using primary key columns
     */
    project_by_pk: FieldsTypeArg<{ id: number }, t_project | null>;

    /**
     * fetch data from the table: "project_run_history"
     */
    project_run_history: FieldsTypeArg<
      {
        distinct_on?: project_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_run_history_order_by[] | null;
        where?: project_run_history_bool_exp | null;
      },
      t_project_run_history[]
    >;

    /**
     * fetch aggregated fields from the table: "project_run_history"
     */
    project_run_history_aggregate: FieldsTypeArg<
      {
        distinct_on?: project_run_history_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: project_run_history_order_by[] | null;
        where?: project_run_history_bool_exp | null;
      },
      t_project_run_history_aggregate
    >;

    /**
     * fetch data from the table: "project_run_history" using primary key columns
     */
    project_run_history_by_pk: FieldsTypeArg<
      { id: number },
      t_project_run_history | null
    >;

    /**
     * fetch data from the table: "user"
     */
    user: FieldsTypeArg<
      {
        distinct_on?: user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: user_order_by[] | null;
        where?: user_bool_exp | null;
      },
      t_user[]
    >;

    /**
     * fetch aggregated fields from the table: "user"
     */
    user_aggregate: FieldsTypeArg<
      {
        distinct_on?: user_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: user_order_by[] | null;
        where?: user_bool_exp | null;
      },
      t_user_aggregate
    >;

    /**
     * fetch data from the table: "user" using primary key columns
     */
    user_by_pk: FieldsTypeArg<{ id: number }, t_user | null>;
  },
  Extension<"subscription_root">
>;

/**
 * @name timestamptz
 * @type SCALAR
 */
type t_timestamptz<T extends any = any> = ScalarType<
  T,
  Extension<"timestamptz">
>;

/**
 * @name timestamptz_comparison_exp
 * @type INPUT_OBJECT
 */
export type timestamptz_comparison_exp = {
  _eq: any | null;
  _gt: any | null;
  _gte: any | null;
  _in: any[] | null;
  _is_null: boolean | null;
  _lt: any | null;
  _lte: any | null;
  _neq: any | null;
  _nin: any[] | null;
};

/**
 * @name user
 * @type OBJECT
 */
type t_user = FieldsType<
  {
    __typename: t_String<"user">;
    firebase_id: t_String;
    id: t_Int;
    name: t_String;

    /**
     * An array relationship
     */
    owner_of_organizations: FieldsTypeArg<
      {
        distinct_on?: organization_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_order_by[] | null;
        where?: organization_bool_exp | null;
      },
      t_organization[]
    >;

    /**
     * An aggregated array relationship
     */
    owner_of_organizations_aggregate: FieldsTypeArg<
      {
        distinct_on?: organization_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: organization_order_by[] | null;
        where?: organization_bool_exp | null;
      },
      t_organization_aggregate
    >;
  },
  Extension<"user">
>;

/**
 * @name user_aggregate
 * @type OBJECT
 */
type t_user_aggregate = FieldsType<
  {
    __typename: t_String<"user_aggregate">;
    aggregate: t_user_aggregate_fields | null;
    nodes: t_user[];
  },
  Extension<"user_aggregate">
>;

/**
 * @name user_aggregate_fields
 * @type OBJECT
 */
type t_user_aggregate_fields = FieldsType<
  {
    __typename: t_String<"user_aggregate_fields">;
    avg: t_user_avg_fields | null;
    count: FieldsTypeArg<
      { columns?: user_select_column[] | null; distinct?: boolean | null },
      t_Int | null
    >;
    max: t_user_max_fields | null;
    min: t_user_min_fields | null;
    stddev: t_user_stddev_fields | null;
    stddev_pop: t_user_stddev_pop_fields | null;
    stddev_samp: t_user_stddev_samp_fields | null;
    sum: t_user_sum_fields | null;
    var_pop: t_user_var_pop_fields | null;
    var_samp: t_user_var_samp_fields | null;
    variance: t_user_variance_fields | null;
  },
  Extension<"user_aggregate_fields">
>;

/**
 * @name user_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type user_aggregate_order_by = {
  avg: user_avg_order_by | null;
  count: order_by | null;
  max: user_max_order_by | null;
  min: user_min_order_by | null;
  stddev: user_stddev_order_by | null;
  stddev_pop: user_stddev_pop_order_by | null;
  stddev_samp: user_stddev_samp_order_by | null;
  sum: user_sum_order_by | null;
  var_pop: user_var_pop_order_by | null;
  var_samp: user_var_samp_order_by | null;
  variance: user_variance_order_by | null;
};

/**
 * @name user_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type user_arr_rel_insert_input = {
  data: user_insert_input[];
  on_conflict: user_on_conflict | null;
};

/**
 * @name user_avg_fields
 * @type OBJECT
 */
type t_user_avg_fields = FieldsType<
  {
    __typename: t_String<"user_avg_fields">;
    id: t_Float | null;
  },
  Extension<"user_avg_fields">
>;

/**
 * @name user_avg_order_by
 * @type INPUT_OBJECT
 */
export type user_avg_order_by = { id: order_by | null };

/**
 * @name user_bool_exp
 * @type INPUT_OBJECT
 */
export type user_bool_exp = {
  _and: (user_bool_exp | null)[] | null;
  _not: user_bool_exp | null;
  _or: (user_bool_exp | null)[] | null;
  firebase_id: String_comparison_exp | null;
  id: Int_comparison_exp | null;
  name: String_comparison_exp | null;
  owner_of_organizations: organization_bool_exp | null;
};

/**
 * @name user_constraint
 * @type ENUM
 */
type t_user_constraint = EnumType<"user_pkey">;

/**
 * @name user_inc_input
 * @type INPUT_OBJECT
 */
export type user_inc_input = { id: number | null };

/**
 * @name user_insert_input
 * @type INPUT_OBJECT
 */
export type user_insert_input = {
  firebase_id: string | null;
  id: number | null;
  name: string | null;
  owner_of_organizations: organization_arr_rel_insert_input | null;
};

/**
 * @name user_max_fields
 * @type OBJECT
 */
type t_user_max_fields = FieldsType<
  {
    __typename: t_String<"user_max_fields">;
    firebase_id: t_String | null;
    id: t_Int | null;
    name: t_String | null;
  },
  Extension<"user_max_fields">
>;

/**
 * @name user_max_order_by
 * @type INPUT_OBJECT
 */
export type user_max_order_by = {
  firebase_id: order_by | null;
  id: order_by | null;
  name: order_by | null;
};

/**
 * @name user_min_fields
 * @type OBJECT
 */
type t_user_min_fields = FieldsType<
  {
    __typename: t_String<"user_min_fields">;
    firebase_id: t_String | null;
    id: t_Int | null;
    name: t_String | null;
  },
  Extension<"user_min_fields">
>;

/**
 * @name user_min_order_by
 * @type INPUT_OBJECT
 */
export type user_min_order_by = {
  firebase_id: order_by | null;
  id: order_by | null;
  name: order_by | null;
};

/**
 * @name user_mutation_response
 * @type OBJECT
 */
type t_user_mutation_response = FieldsType<
  {
    __typename: t_String<"user_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_user[];
  },
  Extension<"user_mutation_response">
>;

/**
 * @name user_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type user_obj_rel_insert_input = {
  data: user_insert_input;
  on_conflict: user_on_conflict | null;
};

/**
 * @name user_on_conflict
 * @type INPUT_OBJECT
 */
export type user_on_conflict = {
  constraint: user_constraint;
  update_columns: user_update_column[];
  where: user_bool_exp | null;
};

/**
 * @name user_order_by
 * @type INPUT_OBJECT
 */
export type user_order_by = {
  firebase_id: order_by | null;
  id: order_by | null;
  name: order_by | null;
  owner_of_organizations_aggregate: organization_aggregate_order_by | null;
};

/**
 * @name user_pk_columns_input
 * @type INPUT_OBJECT
 */
export type user_pk_columns_input = { id: number };

/**
 * @name user_select_column
 * @type ENUM
 */
type t_user_select_column = EnumType<"firebase_id" | "id" | "name">;

/**
 * @name user_set_input
 * @type INPUT_OBJECT
 */
export type user_set_input = {
  firebase_id: string | null;
  id: number | null;
  name: string | null;
};

/**
 * @name user_stddev_fields
 * @type OBJECT
 */
type t_user_stddev_fields = FieldsType<
  {
    __typename: t_String<"user_stddev_fields">;
    id: t_Float | null;
  },
  Extension<"user_stddev_fields">
>;

/**
 * @name user_stddev_order_by
 * @type INPUT_OBJECT
 */
export type user_stddev_order_by = { id: order_by | null };

/**
 * @name user_stddev_pop_fields
 * @type OBJECT
 */
type t_user_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"user_stddev_pop_fields">;
    id: t_Float | null;
  },
  Extension<"user_stddev_pop_fields">
>;

/**
 * @name user_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type user_stddev_pop_order_by = { id: order_by | null };

/**
 * @name user_stddev_samp_fields
 * @type OBJECT
 */
type t_user_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"user_stddev_samp_fields">;
    id: t_Float | null;
  },
  Extension<"user_stddev_samp_fields">
>;

/**
 * @name user_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type user_stddev_samp_order_by = { id: order_by | null };

/**
 * @name user_sum_fields
 * @type OBJECT
 */
type t_user_sum_fields = FieldsType<
  {
    __typename: t_String<"user_sum_fields">;
    id: t_Int | null;
  },
  Extension<"user_sum_fields">
>;

/**
 * @name user_sum_order_by
 * @type INPUT_OBJECT
 */
export type user_sum_order_by = { id: order_by | null };

/**
 * @name user_update_column
 * @type ENUM
 */
type t_user_update_column = EnumType<"firebase_id" | "id" | "name">;

/**
 * @name user_var_pop_fields
 * @type OBJECT
 */
type t_user_var_pop_fields = FieldsType<
  {
    __typename: t_String<"user_var_pop_fields">;
    id: t_Float | null;
  },
  Extension<"user_var_pop_fields">
>;

/**
 * @name user_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type user_var_pop_order_by = { id: order_by | null };

/**
 * @name user_var_samp_fields
 * @type OBJECT
 */
type t_user_var_samp_fields = FieldsType<
  {
    __typename: t_String<"user_var_samp_fields">;
    id: t_Float | null;
  },
  Extension<"user_var_samp_fields">
>;

/**
 * @name user_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type user_var_samp_order_by = { id: order_by | null };

/**
 * @name user_variance_fields
 * @type OBJECT
 */
type t_user_variance_fields = FieldsType<
  {
    __typename: t_String<"user_variance_fields">;
    id: t_Float | null;
  },
  Extension<"user_variance_fields">
>;

/**
 * @name user_variance_order_by
 * @type INPUT_OBJECT
 */
export type user_variance_order_by = { id: order_by | null };

/**
 * @name uuid
 * @type SCALAR
 */
type t_uuid<T extends any = any> = ScalarType<T, Extension<"uuid">>;

/**
 * @name uuid_comparison_exp
 * @type INPUT_OBJECT
 */
export type uuid_comparison_exp = {
  _eq: any | null;
  _gt: any | null;
  _gte: any | null;
  _in: any[] | null;
  _is_null: boolean | null;
  _lt: any | null;
  _lte: any | null;
  _neq: any | null;
  _nin: any[] | null;
};

/**
 * @name Boolean
 * @type SCALAR
 */
export type Boolean = TypeData<t_Boolean>;

/**
 * @name Float
 * @type SCALAR
 */
export type Float = TypeData<t_Float>;

/**
 * @name ID
 * @type SCALAR
 */
export type ID = TypeData<t_ID>;

/**
 * @name Int
 * @type SCALAR
 */
export type Int = TypeData<t_Int>;

/**
 * @name SampleOutput
 * @type OBJECT
 */
export type SampleOutput = TypeData<t_SampleOutput>;

/**
 * @name String
 * @type SCALAR
 */
export type String = TypeData<t_String>;

/**
 * @name __Directive
 * @type OBJECT
 */
export type __Directive = TypeData<t___Directive>;

/**
 * @name __DirectiveLocation
 * @type ENUM
 */
export type __DirectiveLocation = TypeData<t___DirectiveLocation>;

/**
 * @name __EnumValue
 * @type OBJECT
 */
export type __EnumValue = TypeData<t___EnumValue>;

/**
 * @name __Field
 * @type OBJECT
 */
export type __Field = TypeData<t___Field>;

/**
 * @name __InputValue
 * @type OBJECT
 */
export type __InputValue = TypeData<t___InputValue>;

/**
 * @name __Schema
 * @type OBJECT
 */
export type __Schema = TypeData<t___Schema>;

/**
 * @name __Type
 * @type OBJECT
 */
export type __Type = TypeData<t___Type>;

/**
 * @name __TypeKind
 * @type ENUM
 */
export type __TypeKind = TypeData<t___TypeKind>;

/**
 * @name command
 * @type OBJECT
 */
export type command = TypeData<t_command>;

/**
 * @name command_aggregate
 * @type OBJECT
 */
export type command_aggregate = TypeData<t_command_aggregate>;

/**
 * @name command_aggregate_fields
 * @type OBJECT
 */
export type command_aggregate_fields = TypeData<t_command_aggregate_fields>;

/**
 * @name command_avg_fields
 * @type OBJECT
 */
export type command_avg_fields = TypeData<t_command_avg_fields>;

/**
 * @name command_constraint
 * @type ENUM
 */
export type command_constraint = TypeData<t_command_constraint>;

/**
 * @name command_max_fields
 * @type OBJECT
 */
export type command_max_fields = TypeData<t_command_max_fields>;

/**
 * @name command_min_fields
 * @type OBJECT
 */
export type command_min_fields = TypeData<t_command_min_fields>;

/**
 * @name command_mutation_response
 * @type OBJECT
 */
export type command_mutation_response = TypeData<t_command_mutation_response>;

/**
 * @name command_run_history
 * @type OBJECT
 */
export type command_run_history = TypeData<t_command_run_history>;

/**
 * @name command_run_history_aggregate
 * @type OBJECT
 */
export type command_run_history_aggregate = TypeData<
  t_command_run_history_aggregate
>;

/**
 * @name command_run_history_aggregate_fields
 * @type OBJECT
 */
export type command_run_history_aggregate_fields = TypeData<
  t_command_run_history_aggregate_fields
>;

/**
 * @name command_run_history_avg_fields
 * @type OBJECT
 */
export type command_run_history_avg_fields = TypeData<
  t_command_run_history_avg_fields
>;

/**
 * @name command_run_history_constraint
 * @type ENUM
 */
export type command_run_history_constraint = TypeData<
  t_command_run_history_constraint
>;

/**
 * @name command_run_history_max_fields
 * @type OBJECT
 */
export type command_run_history_max_fields = TypeData<
  t_command_run_history_max_fields
>;

/**
 * @name command_run_history_min_fields
 * @type OBJECT
 */
export type command_run_history_min_fields = TypeData<
  t_command_run_history_min_fields
>;

/**
 * @name command_run_history_mutation_response
 * @type OBJECT
 */
export type command_run_history_mutation_response = TypeData<
  t_command_run_history_mutation_response
>;

/**
 * @name command_run_history_select_column
 * @type ENUM
 */
export type command_run_history_select_column = TypeData<
  t_command_run_history_select_column
>;

/**
 * @name command_run_history_stddev_fields
 * @type OBJECT
 */
export type command_run_history_stddev_fields = TypeData<
  t_command_run_history_stddev_fields
>;

/**
 * @name command_run_history_stddev_pop_fields
 * @type OBJECT
 */
export type command_run_history_stddev_pop_fields = TypeData<
  t_command_run_history_stddev_pop_fields
>;

/**
 * @name command_run_history_stddev_samp_fields
 * @type OBJECT
 */
export type command_run_history_stddev_samp_fields = TypeData<
  t_command_run_history_stddev_samp_fields
>;

/**
 * @name command_run_history_sum_fields
 * @type OBJECT
 */
export type command_run_history_sum_fields = TypeData<
  t_command_run_history_sum_fields
>;

/**
 * @name command_run_history_update_column
 * @type ENUM
 */
export type command_run_history_update_column = TypeData<
  t_command_run_history_update_column
>;

/**
 * @name command_run_history_var_pop_fields
 * @type OBJECT
 */
export type command_run_history_var_pop_fields = TypeData<
  t_command_run_history_var_pop_fields
>;

/**
 * @name command_run_history_var_samp_fields
 * @type OBJECT
 */
export type command_run_history_var_samp_fields = TypeData<
  t_command_run_history_var_samp_fields
>;

/**
 * @name command_run_history_variance_fields
 * @type OBJECT
 */
export type command_run_history_variance_fields = TypeData<
  t_command_run_history_variance_fields
>;

/**
 * @name command_select_column
 * @type ENUM
 */
export type command_select_column = TypeData<t_command_select_column>;

/**
 * @name command_stddev_fields
 * @type OBJECT
 */
export type command_stddev_fields = TypeData<t_command_stddev_fields>;

/**
 * @name command_stddev_pop_fields
 * @type OBJECT
 */
export type command_stddev_pop_fields = TypeData<t_command_stddev_pop_fields>;

/**
 * @name command_stddev_samp_fields
 * @type OBJECT
 */
export type command_stddev_samp_fields = TypeData<t_command_stddev_samp_fields>;

/**
 * @name command_sum_fields
 * @type OBJECT
 */
export type command_sum_fields = TypeData<t_command_sum_fields>;

/**
 * @name command_update_column
 * @type ENUM
 */
export type command_update_column = TypeData<t_command_update_column>;

/**
 * @name command_var_pop_fields
 * @type OBJECT
 */
export type command_var_pop_fields = TypeData<t_command_var_pop_fields>;

/**
 * @name command_var_samp_fields
 * @type OBJECT
 */
export type command_var_samp_fields = TypeData<t_command_var_samp_fields>;

/**
 * @name command_variance_fields
 * @type OBJECT
 */
export type command_variance_fields = TypeData<t_command_variance_fields>;

/**
 * @name mutation_root
 * @type OBJECT
 */
export type mutation_root = TypeData<t_mutation_root>;

/**
 * @name order_by
 * @type ENUM
 */
export type order_by = TypeData<t_order_by>;

/**
 * @name organization
 * @type OBJECT
 */
export type organization = TypeData<t_organization>;

/**
 * @name organization_aggregate
 * @type OBJECT
 */
export type organization_aggregate = TypeData<t_organization_aggregate>;

/**
 * @name organization_aggregate_fields
 * @type OBJECT
 */
export type organization_aggregate_fields = TypeData<
  t_organization_aggregate_fields
>;

/**
 * @name organization_avg_fields
 * @type OBJECT
 */
export type organization_avg_fields = TypeData<t_organization_avg_fields>;

/**
 * @name organization_constraint
 * @type ENUM
 */
export type organization_constraint = TypeData<t_organization_constraint>;

/**
 * @name organization_invite_user
 * @type OBJECT
 */
export type organization_invite_user = TypeData<t_organization_invite_user>;

/**
 * @name organization_invite_user_aggregate
 * @type OBJECT
 */
export type organization_invite_user_aggregate = TypeData<
  t_organization_invite_user_aggregate
>;

/**
 * @name organization_invite_user_aggregate_fields
 * @type OBJECT
 */
export type organization_invite_user_aggregate_fields = TypeData<
  t_organization_invite_user_aggregate_fields
>;

/**
 * @name organization_invite_user_avg_fields
 * @type OBJECT
 */
export type organization_invite_user_avg_fields = TypeData<
  t_organization_invite_user_avg_fields
>;

/**
 * @name organization_invite_user_constraint
 * @type ENUM
 */
export type organization_invite_user_constraint = TypeData<
  t_organization_invite_user_constraint
>;

/**
 * @name organization_invite_user_max_fields
 * @type OBJECT
 */
export type organization_invite_user_max_fields = TypeData<
  t_organization_invite_user_max_fields
>;

/**
 * @name organization_invite_user_min_fields
 * @type OBJECT
 */
export type organization_invite_user_min_fields = TypeData<
  t_organization_invite_user_min_fields
>;

/**
 * @name organization_invite_user_mutation_response
 * @type OBJECT
 */
export type organization_invite_user_mutation_response = TypeData<
  t_organization_invite_user_mutation_response
>;

/**
 * @name organization_invite_user_select_column
 * @type ENUM
 */
export type organization_invite_user_select_column = TypeData<
  t_organization_invite_user_select_column
>;

/**
 * @name organization_invite_user_stddev_fields
 * @type OBJECT
 */
export type organization_invite_user_stddev_fields = TypeData<
  t_organization_invite_user_stddev_fields
>;

/**
 * @name organization_invite_user_stddev_pop_fields
 * @type OBJECT
 */
export type organization_invite_user_stddev_pop_fields = TypeData<
  t_organization_invite_user_stddev_pop_fields
>;

/**
 * @name organization_invite_user_stddev_samp_fields
 * @type OBJECT
 */
export type organization_invite_user_stddev_samp_fields = TypeData<
  t_organization_invite_user_stddev_samp_fields
>;

/**
 * @name organization_invite_user_sum_fields
 * @type OBJECT
 */
export type organization_invite_user_sum_fields = TypeData<
  t_organization_invite_user_sum_fields
>;

/**
 * @name organization_invite_user_update_column
 * @type ENUM
 */
export type organization_invite_user_update_column = TypeData<
  t_organization_invite_user_update_column
>;

/**
 * @name organization_invite_user_var_pop_fields
 * @type OBJECT
 */
export type organization_invite_user_var_pop_fields = TypeData<
  t_organization_invite_user_var_pop_fields
>;

/**
 * @name organization_invite_user_var_samp_fields
 * @type OBJECT
 */
export type organization_invite_user_var_samp_fields = TypeData<
  t_organization_invite_user_var_samp_fields
>;

/**
 * @name organization_invite_user_variance_fields
 * @type OBJECT
 */
export type organization_invite_user_variance_fields = TypeData<
  t_organization_invite_user_variance_fields
>;

/**
 * @name organization_max_fields
 * @type OBJECT
 */
export type organization_max_fields = TypeData<t_organization_max_fields>;

/**
 * @name organization_min_fields
 * @type OBJECT
 */
export type organization_min_fields = TypeData<t_organization_min_fields>;

/**
 * @name organization_mutation_response
 * @type OBJECT
 */
export type organization_mutation_response = TypeData<
  t_organization_mutation_response
>;

/**
 * @name organization_select_column
 * @type ENUM
 */
export type organization_select_column = TypeData<t_organization_select_column>;

/**
 * @name organization_stddev_fields
 * @type OBJECT
 */
export type organization_stddev_fields = TypeData<t_organization_stddev_fields>;

/**
 * @name organization_stddev_pop_fields
 * @type OBJECT
 */
export type organization_stddev_pop_fields = TypeData<
  t_organization_stddev_pop_fields
>;

/**
 * @name organization_stddev_samp_fields
 * @type OBJECT
 */
export type organization_stddev_samp_fields = TypeData<
  t_organization_stddev_samp_fields
>;

/**
 * @name organization_sum_fields
 * @type OBJECT
 */
export type organization_sum_fields = TypeData<t_organization_sum_fields>;

/**
 * @name organization_update_column
 * @type ENUM
 */
export type organization_update_column = TypeData<t_organization_update_column>;

/**
 * @name organization_var_pop_fields
 * @type OBJECT
 */
export type organization_var_pop_fields = TypeData<
  t_organization_var_pop_fields
>;

/**
 * @name organization_var_samp_fields
 * @type OBJECT
 */
export type organization_var_samp_fields = TypeData<
  t_organization_var_samp_fields
>;

/**
 * @name organization_variance_fields
 * @type OBJECT
 */
export type organization_variance_fields = TypeData<
  t_organization_variance_fields
>;

/**
 * @name project
 * @type OBJECT
 */
export type project = TypeData<t_project>;

/**
 * @name project_aggregate
 * @type OBJECT
 */
export type project_aggregate = TypeData<t_project_aggregate>;

/**
 * @name project_aggregate_fields
 * @type OBJECT
 */
export type project_aggregate_fields = TypeData<t_project_aggregate_fields>;

/**
 * @name project_avg_fields
 * @type OBJECT
 */
export type project_avg_fields = TypeData<t_project_avg_fields>;

/**
 * @name project_constraint
 * @type ENUM
 */
export type project_constraint = TypeData<t_project_constraint>;

/**
 * @name project_max_fields
 * @type OBJECT
 */
export type project_max_fields = TypeData<t_project_max_fields>;

/**
 * @name project_min_fields
 * @type OBJECT
 */
export type project_min_fields = TypeData<t_project_min_fields>;

/**
 * @name project_mutation_response
 * @type OBJECT
 */
export type project_mutation_response = TypeData<t_project_mutation_response>;

/**
 * @name project_run_history
 * @type OBJECT
 */
export type project_run_history = TypeData<t_project_run_history>;

/**
 * @name project_run_history_aggregate
 * @type OBJECT
 */
export type project_run_history_aggregate = TypeData<
  t_project_run_history_aggregate
>;

/**
 * @name project_run_history_aggregate_fields
 * @type OBJECT
 */
export type project_run_history_aggregate_fields = TypeData<
  t_project_run_history_aggregate_fields
>;

/**
 * @name project_run_history_avg_fields
 * @type OBJECT
 */
export type project_run_history_avg_fields = TypeData<
  t_project_run_history_avg_fields
>;

/**
 * @name project_run_history_constraint
 * @type ENUM
 */
export type project_run_history_constraint = TypeData<
  t_project_run_history_constraint
>;

/**
 * @name project_run_history_max_fields
 * @type OBJECT
 */
export type project_run_history_max_fields = TypeData<
  t_project_run_history_max_fields
>;

/**
 * @name project_run_history_min_fields
 * @type OBJECT
 */
export type project_run_history_min_fields = TypeData<
  t_project_run_history_min_fields
>;

/**
 * @name project_run_history_mutation_response
 * @type OBJECT
 */
export type project_run_history_mutation_response = TypeData<
  t_project_run_history_mutation_response
>;

/**
 * @name project_run_history_select_column
 * @type ENUM
 */
export type project_run_history_select_column = TypeData<
  t_project_run_history_select_column
>;

/**
 * @name project_run_history_stddev_fields
 * @type OBJECT
 */
export type project_run_history_stddev_fields = TypeData<
  t_project_run_history_stddev_fields
>;

/**
 * @name project_run_history_stddev_pop_fields
 * @type OBJECT
 */
export type project_run_history_stddev_pop_fields = TypeData<
  t_project_run_history_stddev_pop_fields
>;

/**
 * @name project_run_history_stddev_samp_fields
 * @type OBJECT
 */
export type project_run_history_stddev_samp_fields = TypeData<
  t_project_run_history_stddev_samp_fields
>;

/**
 * @name project_run_history_sum_fields
 * @type OBJECT
 */
export type project_run_history_sum_fields = TypeData<
  t_project_run_history_sum_fields
>;

/**
 * @name project_run_history_update_column
 * @type ENUM
 */
export type project_run_history_update_column = TypeData<
  t_project_run_history_update_column
>;

/**
 * @name project_run_history_var_pop_fields
 * @type OBJECT
 */
export type project_run_history_var_pop_fields = TypeData<
  t_project_run_history_var_pop_fields
>;

/**
 * @name project_run_history_var_samp_fields
 * @type OBJECT
 */
export type project_run_history_var_samp_fields = TypeData<
  t_project_run_history_var_samp_fields
>;

/**
 * @name project_run_history_variance_fields
 * @type OBJECT
 */
export type project_run_history_variance_fields = TypeData<
  t_project_run_history_variance_fields
>;

/**
 * @name project_select_column
 * @type ENUM
 */
export type project_select_column = TypeData<t_project_select_column>;

/**
 * @name project_stddev_fields
 * @type OBJECT
 */
export type project_stddev_fields = TypeData<t_project_stddev_fields>;

/**
 * @name project_stddev_pop_fields
 * @type OBJECT
 */
export type project_stddev_pop_fields = TypeData<t_project_stddev_pop_fields>;

/**
 * @name project_stddev_samp_fields
 * @type OBJECT
 */
export type project_stddev_samp_fields = TypeData<t_project_stddev_samp_fields>;

/**
 * @name project_sum_fields
 * @type OBJECT
 */
export type project_sum_fields = TypeData<t_project_sum_fields>;

/**
 * @name project_update_column
 * @type ENUM
 */
export type project_update_column = TypeData<t_project_update_column>;

/**
 * @name project_var_pop_fields
 * @type OBJECT
 */
export type project_var_pop_fields = TypeData<t_project_var_pop_fields>;

/**
 * @name project_var_samp_fields
 * @type OBJECT
 */
export type project_var_samp_fields = TypeData<t_project_var_samp_fields>;

/**
 * @name project_variance_fields
 * @type OBJECT
 */
export type project_variance_fields = TypeData<t_project_variance_fields>;

/**
 * @name query_root
 * @type OBJECT
 */
export type query_root = TypeData<t_query_root>;

/**
 * @name subscription_root
 * @type OBJECT
 */
export type subscription_root = TypeData<t_subscription_root>;

/**
 * @name timestamptz
 * @type SCALAR
 */
export type timestamptz = TypeData<t_timestamptz>;

/**
 * @name user
 * @type OBJECT
 */
export type user = TypeData<t_user>;

/**
 * @name user_aggregate
 * @type OBJECT
 */
export type user_aggregate = TypeData<t_user_aggregate>;

/**
 * @name user_aggregate_fields
 * @type OBJECT
 */
export type user_aggregate_fields = TypeData<t_user_aggregate_fields>;

/**
 * @name user_avg_fields
 * @type OBJECT
 */
export type user_avg_fields = TypeData<t_user_avg_fields>;

/**
 * @name user_constraint
 * @type ENUM
 */
export type user_constraint = TypeData<t_user_constraint>;

/**
 * @name user_max_fields
 * @type OBJECT
 */
export type user_max_fields = TypeData<t_user_max_fields>;

/**
 * @name user_min_fields
 * @type OBJECT
 */
export type user_min_fields = TypeData<t_user_min_fields>;

/**
 * @name user_mutation_response
 * @type OBJECT
 */
export type user_mutation_response = TypeData<t_user_mutation_response>;

/**
 * @name user_select_column
 * @type ENUM
 */
export type user_select_column = TypeData<t_user_select_column>;

/**
 * @name user_stddev_fields
 * @type OBJECT
 */
export type user_stddev_fields = TypeData<t_user_stddev_fields>;

/**
 * @name user_stddev_pop_fields
 * @type OBJECT
 */
export type user_stddev_pop_fields = TypeData<t_user_stddev_pop_fields>;

/**
 * @name user_stddev_samp_fields
 * @type OBJECT
 */
export type user_stddev_samp_fields = TypeData<t_user_stddev_samp_fields>;

/**
 * @name user_sum_fields
 * @type OBJECT
 */
export type user_sum_fields = TypeData<t_user_sum_fields>;

/**
 * @name user_update_column
 * @type ENUM
 */
export type user_update_column = TypeData<t_user_update_column>;

/**
 * @name user_var_pop_fields
 * @type OBJECT
 */
export type user_var_pop_fields = TypeData<t_user_var_pop_fields>;

/**
 * @name user_var_samp_fields
 * @type OBJECT
 */
export type user_var_samp_fields = TypeData<t_user_var_samp_fields>;

/**
 * @name user_variance_fields
 * @type OBJECT
 */
export type user_variance_fields = TypeData<t_user_variance_fields>;

/**
 * @name uuid
 * @type SCALAR
 */
export type uuid = TypeData<t_uuid>;
