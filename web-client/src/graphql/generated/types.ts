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
 * @name command_run_history
 * @type OBJECT
 */
type t_command_run_history = FieldsType<
  {
    __typename: t_String<"command_run_history">;
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
 * @name command_run_history_bool_exp
 * @type INPUT_OBJECT
 */
export type command_run_history_bool_exp = {
  _and: (command_run_history_bool_exp | null)[] | null;
  _not: command_run_history_bool_exp | null;
  _or: (command_run_history_bool_exp | null)[] | null;
  command_id: uuid_comparison_exp | null;
  created_at: timestamptz_comparison_exp | null;
  fail: Boolean_comparison_exp | null;
  id: uuid_comparison_exp | null;
  missconfiguration: Boolean_comparison_exp | null;
  running_time: Int_comparison_exp | null;
};

/**
 * @name command_run_history_order_by
 * @type INPUT_OBJECT
 */
export type command_run_history_order_by = {
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
 * @name mutation_root
 * @type OBJECT
 */
type t_mutation_root = FieldsType<
  {
    __typename: t_String<"mutation_root">;

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
      { objects: organization_invite_user_insert_input[] },
      t_organization_invite_user_mutation_response | null
    >;

    /**
     * insert a single row into the table: "organization_invite_user"
     */
    insert_organization_invite_user_one: FieldsTypeArg<
      { object: organization_invite_user_insert_input },
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
     * update data of the table: "organization"
     */
    update_organization: FieldsTypeArg<
      { _set?: organization_set_input | null; where: organization_bool_exp },
      t_organization_mutation_response | null
    >;

    /**
     * update single row of the table: "organization"
     */
    update_organization_by_pk: FieldsTypeArg<
      {
        _set?: organization_set_input | null;
        pk_columns: organization_pk_columns_input;
      },
      t_organization | null
    >;

    /**
     * update data of the table: "project"
     */
    update_project: FieldsTypeArg<
      { _set?: project_set_input | null; where: project_bool_exp },
      t_project_mutation_response | null
    >;

    /**
     * update single row of the table: "project"
     */
    update_project_by_pk: FieldsTypeArg<
      { _set?: project_set_input | null; pk_columns: project_pk_columns_input },
      t_project | null
    >;

    /**
     * update data of the table: "user"
     */
    update_user: FieldsTypeArg<
      { _set?: user_set_input | null; where: user_bool_exp },
      t_user_mutation_response | null
    >;

    /**
     * update single row of the table: "user"
     */
    update_user_by_pk: FieldsTypeArg<
      { _set?: user_set_input | null; pk_columns: user_pk_columns_input },
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
    slug: t_String;
  },
  Extension<"organization">
>;

/**
 * @name organization_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type organization_arr_rel_insert_input = {
  data: organization_insert_input[];
  on_conflict: organization_on_conflict | null;
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
  slug: String_comparison_exp | null;
};

/**
 * @name organization_constraint
 * @type ENUM
 */
type t_organization_constraint = EnumType<
  "organization_name_key" | "organization_pkey" | "organization_slug_key"
>;

/**
 * @name organization_insert_input
 * @type INPUT_OBJECT
 */
export type organization_insert_input = {
  invited_users: organization_invite_user_arr_rel_insert_input | null;
  name: string | null;
  owner: user_obj_rel_insert_input | null;
  owner_id: number | null;
  projects: project_arr_rel_insert_input | null;
  slug: string | null;
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

    /**
     * An object relationship
     */
    organization: t_organization;
    organization_id: t_Int;
  },
  Extension<"organization_invite_user">
>;

/**
 * @name organization_invite_user_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_arr_rel_insert_input = {
  data: organization_invite_user_insert_input[];
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
  organization: organization_bool_exp | null;
  organization_id: Int_comparison_exp | null;
};

/**
 * @name organization_invite_user_insert_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_insert_input = {
  email: string | null;
  organization: organization_obj_rel_insert_input | null;
  organization_id: number | null;
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
};

/**
 * @name organization_invite_user_order_by
 * @type INPUT_OBJECT
 */
export type organization_invite_user_order_by = {
  created_at: order_by | null;
  email: order_by | null;
  id: order_by | null;
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
  "created_at" | "email" | "id" | "organization_id"
>;

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
  name: order_by | null;
  owner: user_order_by | null;
  owner_id: order_by | null;
  slug: order_by | null;
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
type t_organization_select_column = EnumType<
  "id" | "name" | "owner_id" | "slug"
>;

/**
 * @name organization_set_input
 * @type INPUT_OBJECT
 */
export type organization_set_input = {
  name: string | null;
  slug: string | null;
};

/**
 * @name organization_update_column
 * @type ENUM
 */
type t_organization_update_column = EnumType<"name" | "slug">;

/**
 * @name project
 * @type OBJECT
 */
type t_project = FieldsType<
  {
    __typename: t_String<"project">;
    id: t_Int;
    name: t_String;

    /**
     * An object relationship
     */
    organization: t_organization;
    organization_id: t_Int;
    slug: t_String;
  },
  Extension<"project">
>;

/**
 * @name project_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type project_arr_rel_insert_input = {
  data: project_insert_input[];
  on_conflict: project_on_conflict | null;
};

/**
 * @name project_bool_exp
 * @type INPUT_OBJECT
 */
export type project_bool_exp = {
  _and: (project_bool_exp | null)[] | null;
  _not: project_bool_exp | null;
  _or: (project_bool_exp | null)[] | null;
  id: Int_comparison_exp | null;
  name: String_comparison_exp | null;
  organization: organization_bool_exp | null;
  organization_id: Int_comparison_exp | null;
  slug: String_comparison_exp | null;
};

/**
 * @name project_constraint
 * @type ENUM
 */
type t_project_constraint = EnumType<
  "project_organization_id_slug_key" | "project_pkey"
>;

/**
 * @name project_insert_input
 * @type INPUT_OBJECT
 */
export type project_insert_input = {
  name: string | null;
  organization: organization_obj_rel_insert_input | null;
  organization_id: number | null;
  slug: string | null;
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
  id: order_by | null;
  name: order_by | null;
  organization: organization_order_by | null;
  organization_id: order_by | null;
  slug: order_by | null;
};

/**
 * @name project_pk_columns_input
 * @type INPUT_OBJECT
 */
export type project_pk_columns_input = { id: number };

/**
 * @name project_select_column
 * @type ENUM
 */
type t_project_select_column = EnumType<
  "id" | "name" | "organization_id" | "slug"
>;

/**
 * @name project_set_input
 * @type INPUT_OBJECT
 */
export type project_set_input = { name: string | null; slug: string | null };

/**
 * @name project_update_column
 * @type ENUM
 */
type t_project_update_column = EnumType<"name" | "slug">;

/**
 * @name query_root
 * @type OBJECT
 */
type t_query_root = FieldsType<
  {
    __typename: t_String<"query_root">;

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
     * fetch data from the table: "project" using primary key columns
     */
    project_by_pk: FieldsTypeArg<{ id: number }, t_project | null>;

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
     * fetch data from the table: "project" using primary key columns
     */
    project_by_pk: FieldsTypeArg<{ id: number }, t_project | null>;

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
  },
  Extension<"user">
>;

/**
 * @name user_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type user_arr_rel_insert_input = {
  data: user_insert_input[];
  on_conflict: user_on_conflict | null;
};

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
type t_user_constraint = EnumType<"user_firebase_id_key" | "user_pkey">;

/**
 * @name user_insert_input
 * @type INPUT_OBJECT
 */
export type user_insert_input = {
  name: string | null;
  owner_of_organizations: organization_arr_rel_insert_input | null;
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
export type user_set_input = { name: string | null };

/**
 * @name user_update_column
 * @type ENUM
 */
type t_user_update_column = EnumType<"name">;

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
 * @name command_run_history
 * @type OBJECT
 */
export type command_run_history = TypeData<t_command_run_history>;

/**
 * @name command_run_history_select_column
 * @type ENUM
 */
export type command_run_history_select_column = TypeData<
  t_command_run_history_select_column
>;

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
 * @name organization_update_column
 * @type ENUM
 */
export type organization_update_column = TypeData<t_organization_update_column>;

/**
 * @name project
 * @type OBJECT
 */
export type project = TypeData<t_project>;

/**
 * @name project_constraint
 * @type ENUM
 */
export type project_constraint = TypeData<t_project_constraint>;

/**
 * @name project_mutation_response
 * @type OBJECT
 */
export type project_mutation_response = TypeData<t_project_mutation_response>;

/**
 * @name project_select_column
 * @type ENUM
 */
export type project_select_column = TypeData<t_project_select_column>;

/**
 * @name project_update_column
 * @type ENUM
 */
export type project_update_column = TypeData<t_project_update_column>;

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
 * @name user_constraint
 * @type ENUM
 */
export type user_constraint = TypeData<t_user_constraint>;

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
 * @name user_update_column
 * @type ENUM
 */
export type user_update_column = TypeData<t_user_update_column>;

/**
 * @name uuid
 * @type SCALAR
 */
export type uuid = TypeData<t_uuid>;
