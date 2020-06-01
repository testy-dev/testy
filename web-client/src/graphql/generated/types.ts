import * as extensions from "../extensions";
import {
  EnumType,
  FieldsType,
  FieldsTypeArg,
  ScalarType,
  TypeData,
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
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
};

/**
 * @name RunProjectOutput
 * @type OBJECT
 */
type t_RunProjectOutput = FieldsType<
  {
    __typename: t_String<"RunProjectOutput">;
    status: t_Boolean;
  },
  Extension<"RunProjectOutput">
>;

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
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
};

/**
 * @name __Directive
 * @type OBJECT
 */
type t___Directive = FieldsType<
  {
    __typename: t_String<"__Directive">;
    args: t___InputValue[];
    description?: t_String | null;
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
    deprecationReason?: t_String | null;
    description?: t_String | null;
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
    deprecationReason?: t_String | null;
    description?: t_String | null;
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
    defaultValue?: t_String | null;
    description?: t_String | null;
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
    mutationType?: t___Type | null;
    queryType: t___Type;
    subscriptionType?: t___Type | null;
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
    description?: t_String | null;
    enumValues?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___EnumValue[] | null
    >;
    fields?: FieldsTypeArg<
      { includeDeprecated?: boolean | null },
      t___Field[] | null
    >;
    inputFields?: t___InputValue[] | null;
    interfaces?: t___Type[] | null;
    kind: t___TypeKind;
    name?: t_String | null;
    ofType?: t___Type | null;
    possibleTypes?: t___Type[] | null;
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
 * @name bigint
 * @type SCALAR
 */
type t_bigint<T extends any = any> = ScalarType<T, Extension<"bigint">>;

/**
 * @name bigint_comparison_exp
 * @type INPUT_OBJECT
 */
export type bigint_comparison_exp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
};

/**
 * @name jsonb
 * @type SCALAR
 */
type t_jsonb<T extends any = any> = ScalarType<T, Extension<"jsonb">>;

/**
 * @name jsonb_comparison_exp
 * @type INPUT_OBJECT
 */
export type jsonb_comparison_exp = {
  _contained_in?: any | null;
  _contains?: any | null;
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _has_key?: string | null;
  _has_keys_all?: string[] | null;
  _has_keys_any?: string[] | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
};

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
    delete_organization?: FieldsTypeArg<
      { where: organization_bool_exp },
      t_organization_mutation_response | null
    >;

    /**
     * delete single row from the table: "organization"
     */
    delete_organization_by_pk?: FieldsTypeArg<
      { id: number },
      t_organization | null
    >;

    /**
     * delete data from the table: "organization_invite_user"
     */
    delete_organization_invite_user?: FieldsTypeArg<
      { where: organization_invite_user_bool_exp },
      t_organization_invite_user_mutation_response | null
    >;

    /**
     * delete single row from the table: "organization_invite_user"
     */
    delete_organization_invite_user_by_pk?: FieldsTypeArg<
      { id: number },
      t_organization_invite_user | null
    >;

    /**
     * delete data from the table: "project"
     */
    delete_project?: FieldsTypeArg<
      { where: project_bool_exp },
      t_project_mutation_response | null
    >;

    /**
     * delete single row from the table: "project"
     */
    delete_project_by_pk?: FieldsTypeArg<{ id: number }, t_project | null>;

    /**
     * insert data into the table: "organization"
     */
    insert_organization?: FieldsTypeArg<
      {
        objects: organization_insert_input[];
        on_conflict?: organization_on_conflict | null;
      },
      t_organization_mutation_response | null
    >;

    /**
     * insert data into the table: "organization_invite_user"
     */
    insert_organization_invite_user?: FieldsTypeArg<
      { objects: organization_invite_user_insert_input[] },
      t_organization_invite_user_mutation_response | null
    >;

    /**
     * insert a single row into the table: "organization_invite_user"
     */
    insert_organization_invite_user_one?: FieldsTypeArg<
      { object: organization_invite_user_insert_input },
      t_organization_invite_user | null
    >;

    /**
     * insert a single row into the table: "organization"
     */
    insert_organization_one?: FieldsTypeArg<
      {
        object: organization_insert_input;
        on_conflict?: organization_on_conflict | null;
      },
      t_organization | null
    >;

    /**
     * insert data into the table: "project"
     */
    insert_project?: FieldsTypeArg<
      {
        objects: project_insert_input[];
        on_conflict?: project_on_conflict | null;
      },
      t_project_mutation_response | null
    >;

    /**
     * insert a single row into the table: "project"
     */
    insert_project_one?: FieldsTypeArg<
      {
        object: project_insert_input;
        on_conflict?: project_on_conflict | null;
      },
      t_project | null
    >;

    /**
     * insert data into the table: "run"
     */
    insert_run?: FieldsTypeArg<
      { objects: run_insert_input[] },
      t_run_mutation_response | null
    >;

    /**
     * insert a single row into the table: "run"
     */
    insert_run_one?: FieldsTypeArg<{ object: run_insert_input }, t_run | null>;

    /**
     * insert data into the table: "user"
     */
    insert_user?: FieldsTypeArg<
      { objects: user_insert_input[]; on_conflict?: user_on_conflict | null },
      t_user_mutation_response | null
    >;

    /**
     * insert a single row into the table: "user"
     */
    insert_user_one?: FieldsTypeArg<
      { object: user_insert_input; on_conflict?: user_on_conflict | null },
      t_user | null
    >;

    /**
     * update data of the table: "organization"
     */
    update_organization?: FieldsTypeArg<
      { _set?: organization_set_input | null; where: organization_bool_exp },
      t_organization_mutation_response | null
    >;

    /**
     * update single row of the table: "organization"
     */
    update_organization_by_pk?: FieldsTypeArg<
      {
        _set?: organization_set_input | null;
        pk_columns: organization_pk_columns_input;
      },
      t_organization | null
    >;

    /**
     * update data of the table: "project"
     */
    update_project?: FieldsTypeArg<
      {
        _append?: project_append_input | null;
        _delete_at_path?: project_delete_at_path_input | null;
        _delete_elem?: project_delete_elem_input | null;
        _delete_key?: project_delete_key_input | null;
        _prepend?: project_prepend_input | null;
        _set?: project_set_input | null;
        where: project_bool_exp;
      },
      t_project_mutation_response | null
    >;

    /**
     * update single row of the table: "project"
     */
    update_project_by_pk?: FieldsTypeArg<
      {
        _append?: project_append_input | null;
        _delete_at_path?: project_delete_at_path_input | null;
        _delete_elem?: project_delete_elem_input | null;
        _delete_key?: project_delete_key_input | null;
        _prepend?: project_prepend_input | null;
        _set?: project_set_input | null;
        pk_columns: project_pk_columns_input;
      },
      t_project | null
    >;

    /**
     * update data of the table: "user"
     */
    update_user?: FieldsTypeArg<
      { _set?: user_set_input | null; where: user_bool_exp },
      t_user_mutation_response | null
    >;

    /**
     * update single row of the table: "user"
     */
    update_user_by_pk?: FieldsTypeArg<
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
  on_conflict?: organization_on_conflict | null;
};

/**
 * @name organization_bool_exp
 * @type INPUT_OBJECT
 */
export type organization_bool_exp = {
  _and?: (organization_bool_exp | null)[] | null;
  _not?: organization_bool_exp | null;
  _or?: (organization_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  invited_users?: organization_invite_user_bool_exp | null;
  name?: String_comparison_exp | null;
  owner?: user_bool_exp | null;
  owner_id?: Int_comparison_exp | null;
  projects?: project_bool_exp | null;
  slug?: String_comparison_exp | null;
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
  invited_users?: organization_invite_user_arr_rel_insert_input | null;
  name?: string | null;
  owner?: user_obj_rel_insert_input | null;
  owner_id?: number | null;
  projects?: project_arr_rel_insert_input | null;
  slug?: string | null;
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
  _and?: (organization_invite_user_bool_exp | null)[] | null;
  _not?: organization_invite_user_bool_exp | null;
  _or?: (organization_invite_user_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  email?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  organization?: organization_bool_exp | null;
  organization_id?: Int_comparison_exp | null;
};

/**
 * @name organization_invite_user_insert_input
 * @type INPUT_OBJECT
 */
export type organization_invite_user_insert_input = {
  email?: string | null;
  organization?: organization_obj_rel_insert_input | null;
  organization_id?: number | null;
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
  created_at?: order_by | null;
  email?: order_by | null;
  id?: order_by | null;
  organization?: organization_order_by | null;
  organization_id?: order_by | null;
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
  on_conflict?: organization_on_conflict | null;
};

/**
 * @name organization_on_conflict
 * @type INPUT_OBJECT
 */
export type organization_on_conflict = {
  constraint: organization_constraint;
  update_columns: organization_update_column[];
  where?: organization_bool_exp | null;
};

/**
 * @name organization_order_by
 * @type INPUT_OBJECT
 */
export type organization_order_by = {
  id?: order_by | null;
  name?: order_by | null;
  owner?: user_order_by | null;
  owner_id?: order_by | null;
  slug?: order_by | null;
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
  name?: string | null;
  slug?: string | null;
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
    graph?: FieldsTypeArg<{ path?: string | null }, t_jsonb | null>;
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
        distinct_on?: run_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_order_by[] | null;
        where?: run_bool_exp | null;
      },
      t_run[]
    >;

    /**
     * An aggregated array relationship
     */
    run_history_aggregate: FieldsTypeArg<
      {
        distinct_on?: run_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_order_by[] | null;
        where?: run_bool_exp | null;
      },
      t_run_aggregate
    >;
    slug: t_String;
  },
  Extension<"project">
>;

/**
 * @name project_append_input
 * @type INPUT_OBJECT
 */
export type project_append_input = { graph?: any | null };

/**
 * @name project_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type project_arr_rel_insert_input = {
  data: project_insert_input[];
  on_conflict?: project_on_conflict | null;
};

/**
 * @name project_bool_exp
 * @type INPUT_OBJECT
 */
export type project_bool_exp = {
  _and?: (project_bool_exp | null)[] | null;
  _not?: project_bool_exp | null;
  _or?: (project_bool_exp | null)[] | null;
  graph?: jsonb_comparison_exp | null;
  id?: Int_comparison_exp | null;
  name?: String_comparison_exp | null;
  organization?: organization_bool_exp | null;
  organization_id?: Int_comparison_exp | null;
  run_history?: run_bool_exp | null;
  slug?: String_comparison_exp | null;
};

/**
 * @name project_constraint
 * @type ENUM
 */
type t_project_constraint = EnumType<
  | "project_organization_id_name_key"
  | "project_organization_id_slug_key"
  | "project_pkey"
>;

/**
 * @name project_delete_at_path_input
 * @type INPUT_OBJECT
 */
export type project_delete_at_path_input = { graph?: (string | null)[] | null };

/**
 * @name project_delete_elem_input
 * @type INPUT_OBJECT
 */
export type project_delete_elem_input = { graph?: number | null };

/**
 * @name project_delete_key_input
 * @type INPUT_OBJECT
 */
export type project_delete_key_input = { graph?: string | null };

/**
 * @name project_insert_input
 * @type INPUT_OBJECT
 */
export type project_insert_input = {
  graph?: any | null;
  name?: string | null;
  organization?: organization_obj_rel_insert_input | null;
  organization_id?: number | null;
  run_history?: run_arr_rel_insert_input | null;
  slug?: string | null;
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
  on_conflict?: project_on_conflict | null;
};

/**
 * @name project_on_conflict
 * @type INPUT_OBJECT
 */
export type project_on_conflict = {
  constraint: project_constraint;
  update_columns: project_update_column[];
  where?: project_bool_exp | null;
};

/**
 * @name project_order_by
 * @type INPUT_OBJECT
 */
export type project_order_by = {
  graph?: order_by | null;
  id?: order_by | null;
  name?: order_by | null;
  organization?: organization_order_by | null;
  organization_id?: order_by | null;
  run_history_aggregate?: run_aggregate_order_by | null;
  slug?: order_by | null;
};

/**
 * @name project_pk_columns_input
 * @type INPUT_OBJECT
 */
export type project_pk_columns_input = { id: number };

/**
 * @name project_prepend_input
 * @type INPUT_OBJECT
 */
export type project_prepend_input = { graph?: any | null };

/**
 * @name project_select_column
 * @type ENUM
 */
type t_project_select_column = EnumType<
  "graph" | "id" | "name" | "organization_id" | "slug"
>;

/**
 * @name project_set_input
 * @type INPUT_OBJECT
 */
export type project_set_input = {
  graph?: any | null;
  name?: string | null;
  slug?: string | null;
};

/**
 * @name project_update_column
 * @type ENUM
 */
type t_project_update_column = EnumType<"graph" | "name" | "slug">;

/**
 * @name query_root
 * @type OBJECT
 */
type t_query_root = FieldsType<
  {
    __typename: t_String<"query_root">;

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
    organization_by_pk?: FieldsTypeArg<{ id: number }, t_organization | null>;

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
    organization_invite_user_by_pk?: FieldsTypeArg<
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
    project_by_pk?: FieldsTypeArg<{ id: number }, t_project | null>;

    /**
     * fetch data from the table: "run"
     */
    run: FieldsTypeArg<
      {
        distinct_on?: run_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_order_by[] | null;
        where?: run_bool_exp | null;
      },
      t_run[]
    >;

    /**
     * fetch aggregated fields from the table: "run"
     */
    run_aggregate: FieldsTypeArg<
      {
        distinct_on?: run_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_order_by[] | null;
        where?: run_bool_exp | null;
      },
      t_run_aggregate
    >;

    /**
     * fetch data from the table: "run" using primary key columns
     */
    run_by_pk?: FieldsTypeArg<{ id: any }, t_run | null>;

    /**
     * fetch data from the table: "run_path"
     */
    run_path: FieldsTypeArg<
      {
        distinct_on?: run_path_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_path_order_by[] | null;
        where?: run_path_bool_exp | null;
      },
      t_run_path[]
    >;

    /**
     * fetch data from the table: "run_path" using primary key columns
     */
    run_path_by_pk?: FieldsTypeArg<{ id: any }, t_run_path | null>;

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
    user_by_pk?: FieldsTypeArg<{ id: number }, t_user | null>;
  },
  Extension<"query_root">
>;

/**
 * @name run
 * @type OBJECT
 */
type t_run = FieldsType<
  {
    __typename: t_String<"run">;
    blocks_blocked: t_Int;
    blocks_count: t_Int;
    blocks_failed: t_Int;
    blocks_success: t_Int;
    credits_taken: t_Int;
    finished_at?: t_timestamptz | null;
    graph?: FieldsTypeArg<{ path?: string | null }, t_jsonb | null>;
    id: t_bigint;

    /**
     * An object relationship
     */
    project: t_project;
    project_id: t_Int;
    run_by_user: t_Int;

    /**
     * An array relationship
     */
    run_paths: FieldsTypeArg<
      {
        distinct_on?: run_path_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_path_order_by[] | null;
        where?: run_path_bool_exp | null;
      },
      t_run_path[]
    >;
    started_at: t_timestamptz;
  },
  Extension<"run">
>;

/**
 * @name run_aggregate
 * @type OBJECT
 */
type t_run_aggregate = FieldsType<
  {
    __typename: t_String<"run_aggregate">;
    aggregate?: t_run_aggregate_fields | null;
    nodes: t_run[];
  },
  Extension<"run_aggregate">
>;

/**
 * @name run_aggregate_fields
 * @type OBJECT
 */
type t_run_aggregate_fields = FieldsType<
  {
    __typename: t_String<"run_aggregate_fields">;
    avg?: t_run_avg_fields | null;
    count?: FieldsTypeArg<
      { columns?: run_select_column[] | null; distinct?: boolean | null },
      t_Int | null
    >;
    max?: t_run_max_fields | null;
    min?: t_run_min_fields | null;
    stddev?: t_run_stddev_fields | null;
    stddev_pop?: t_run_stddev_pop_fields | null;
    stddev_samp?: t_run_stddev_samp_fields | null;
    sum?: t_run_sum_fields | null;
    var_pop?: t_run_var_pop_fields | null;
    var_samp?: t_run_var_samp_fields | null;
    variance?: t_run_variance_fields | null;
  },
  Extension<"run_aggregate_fields">
>;

/**
 * @name run_aggregate_order_by
 * @type INPUT_OBJECT
 */
export type run_aggregate_order_by = {
  avg?: run_avg_order_by | null;
  count?: order_by | null;
  max?: run_max_order_by | null;
  min?: run_min_order_by | null;
  stddev?: run_stddev_order_by | null;
  stddev_pop?: run_stddev_pop_order_by | null;
  stddev_samp?: run_stddev_samp_order_by | null;
  sum?: run_sum_order_by | null;
  var_pop?: run_var_pop_order_by | null;
  var_samp?: run_var_samp_order_by | null;
  variance?: run_variance_order_by | null;
};

/**
 * @name run_arr_rel_insert_input
 * @type INPUT_OBJECT
 */
export type run_arr_rel_insert_input = { data: run_insert_input[] };

/**
 * @name run_avg_fields
 * @type OBJECT
 */
type t_run_avg_fields = FieldsType<
  {
    __typename: t_String<"run_avg_fields">;
    blocks_blocked?: t_Float | null;
    blocks_count?: t_Float | null;
    blocks_failed?: t_Float | null;
    blocks_success?: t_Float | null;
    credits_taken?: t_Float | null;
    id?: t_Float | null;
    project_id?: t_Float | null;
    run_by_user?: t_Float | null;
  },
  Extension<"run_avg_fields">
>;

/**
 * @name run_avg_order_by
 * @type INPUT_OBJECT
 */
export type run_avg_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name run_bool_exp
 * @type INPUT_OBJECT
 */
export type run_bool_exp = {
  _and?: (run_bool_exp | null)[] | null;
  _not?: run_bool_exp | null;
  _or?: (run_bool_exp | null)[] | null;
  blocks_blocked?: Int_comparison_exp | null;
  blocks_count?: Int_comparison_exp | null;
  blocks_failed?: Int_comparison_exp | null;
  blocks_success?: Int_comparison_exp | null;
  credits_taken?: Int_comparison_exp | null;
  finished_at?: timestamptz_comparison_exp | null;
  graph?: jsonb_comparison_exp | null;
  id?: bigint_comparison_exp | null;
  project?: project_bool_exp | null;
  project_id?: Int_comparison_exp | null;
  run_by_user?: Int_comparison_exp | null;
  run_paths?: run_path_bool_exp | null;
  started_at?: timestamptz_comparison_exp | null;
};

/**
 * @name run_insert_input
 * @type INPUT_OBJECT
 */
export type run_insert_input = {
  graph?: any | null;
  project?: project_obj_rel_insert_input | null;
  project_id?: number | null;
  run_by_user?: number | null;
};

/**
 * @name run_max_fields
 * @type OBJECT
 */
type t_run_max_fields = FieldsType<
  {
    __typename: t_String<"run_max_fields">;
    blocks_blocked?: t_Int | null;
    blocks_count?: t_Int | null;
    blocks_failed?: t_Int | null;
    blocks_success?: t_Int | null;
    credits_taken?: t_Int | null;
    finished_at?: t_timestamptz | null;
    id?: t_bigint | null;
    project_id?: t_Int | null;
    run_by_user?: t_Int | null;
    started_at?: t_timestamptz | null;
  },
  Extension<"run_max_fields">
>;

/**
 * @name run_max_order_by
 * @type INPUT_OBJECT
 */
export type run_max_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  finished_at?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
  started_at?: order_by | null;
};

/**
 * @name run_min_fields
 * @type OBJECT
 */
type t_run_min_fields = FieldsType<
  {
    __typename: t_String<"run_min_fields">;
    blocks_blocked?: t_Int | null;
    blocks_count?: t_Int | null;
    blocks_failed?: t_Int | null;
    blocks_success?: t_Int | null;
    credits_taken?: t_Int | null;
    finished_at?: t_timestamptz | null;
    id?: t_bigint | null;
    project_id?: t_Int | null;
    run_by_user?: t_Int | null;
    started_at?: t_timestamptz | null;
  },
  Extension<"run_min_fields">
>;

/**
 * @name run_min_order_by
 * @type INPUT_OBJECT
 */
export type run_min_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  finished_at?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
  started_at?: order_by | null;
};

/**
 * @name run_mutation_response
 * @type OBJECT
 */
type t_run_mutation_response = FieldsType<
  {
    __typename: t_String<"run_mutation_response">;

    /**
     * number of affected rows by the mutation
     */
    affected_rows: t_Int;

    /**
     * data of the affected rows by the mutation
     */
    returning: t_run[];
  },
  Extension<"run_mutation_response">
>;

/**
 * @name run_obj_rel_insert_input
 * @type INPUT_OBJECT
 */
export type run_obj_rel_insert_input = { data: run_insert_input };

/**
 * @name run_order_by
 * @type INPUT_OBJECT
 */
export type run_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  finished_at?: order_by | null;
  graph?: order_by | null;
  id?: order_by | null;
  project?: project_order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
  started_at?: order_by | null;
};

/**
 * @name run_path
 * @type OBJECT
 */
type t_run_path = FieldsType<
  {
    __typename: t_String<"run_path">;
    credits: t_Int;
    edges: FieldsTypeArg<{ path?: string | null }, t_jsonb>;
    finished_at?: t_timestamptz | null;
    id: t_bigint;

    /**
     * An object relationship
     */
    run: t_run;
    run_id: t_bigint;
    started_at: t_timestamptz;
    status?: t_String | null;
  },
  Extension<"run_path">
>;

/**
 * @name run_path_bool_exp
 * @type INPUT_OBJECT
 */
export type run_path_bool_exp = {
  _and?: (run_path_bool_exp | null)[] | null;
  _not?: run_path_bool_exp | null;
  _or?: (run_path_bool_exp | null)[] | null;
  credits?: Int_comparison_exp | null;
  edges?: jsonb_comparison_exp | null;
  finished_at?: timestamptz_comparison_exp | null;
  id?: bigint_comparison_exp | null;
  run?: run_bool_exp | null;
  run_id?: bigint_comparison_exp | null;
  started_at?: timestamptz_comparison_exp | null;
  status?: String_comparison_exp | null;
};

/**
 * @name run_path_order_by
 * @type INPUT_OBJECT
 */
export type run_path_order_by = {
  credits?: order_by | null;
  edges?: order_by | null;
  finished_at?: order_by | null;
  id?: order_by | null;
  run?: run_order_by | null;
  run_id?: order_by | null;
  started_at?: order_by | null;
  status?: order_by | null;
};

/**
 * @name run_path_pk_columns_input
 * @type INPUT_OBJECT
 */
export type run_path_pk_columns_input = { id: any };

/**
 * @name run_path_select_column
 * @type ENUM
 */
type t_run_path_select_column = EnumType<
  | "credits"
  | "edges"
  | "finished_at"
  | "id"
  | "run_id"
  | "started_at"
  | "status"
>;

/**
 * @name run_pk_columns_input
 * @type INPUT_OBJECT
 */
export type run_pk_columns_input = { id: any };

/**
 * @name run_select_column
 * @type ENUM
 */
type t_run_select_column = EnumType<
  | "blocks_blocked"
  | "blocks_count"
  | "blocks_failed"
  | "blocks_success"
  | "credits_taken"
  | "finished_at"
  | "graph"
  | "id"
  | "project_id"
  | "run_by_user"
  | "started_at"
>;

/**
 * @name run_stddev_fields
 * @type OBJECT
 */
type t_run_stddev_fields = FieldsType<
  {
    __typename: t_String<"run_stddev_fields">;
    blocks_blocked?: t_Float | null;
    blocks_count?: t_Float | null;
    blocks_failed?: t_Float | null;
    blocks_success?: t_Float | null;
    credits_taken?: t_Float | null;
    id?: t_Float | null;
    project_id?: t_Float | null;
    run_by_user?: t_Float | null;
  },
  Extension<"run_stddev_fields">
>;

/**
 * @name run_stddev_order_by
 * @type INPUT_OBJECT
 */
export type run_stddev_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name run_stddev_pop_fields
 * @type OBJECT
 */
type t_run_stddev_pop_fields = FieldsType<
  {
    __typename: t_String<"run_stddev_pop_fields">;
    blocks_blocked?: t_Float | null;
    blocks_count?: t_Float | null;
    blocks_failed?: t_Float | null;
    blocks_success?: t_Float | null;
    credits_taken?: t_Float | null;
    id?: t_Float | null;
    project_id?: t_Float | null;
    run_by_user?: t_Float | null;
  },
  Extension<"run_stddev_pop_fields">
>;

/**
 * @name run_stddev_pop_order_by
 * @type INPUT_OBJECT
 */
export type run_stddev_pop_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name run_stddev_samp_fields
 * @type OBJECT
 */
type t_run_stddev_samp_fields = FieldsType<
  {
    __typename: t_String<"run_stddev_samp_fields">;
    blocks_blocked?: t_Float | null;
    blocks_count?: t_Float | null;
    blocks_failed?: t_Float | null;
    blocks_success?: t_Float | null;
    credits_taken?: t_Float | null;
    id?: t_Float | null;
    project_id?: t_Float | null;
    run_by_user?: t_Float | null;
  },
  Extension<"run_stddev_samp_fields">
>;

/**
 * @name run_stddev_samp_order_by
 * @type INPUT_OBJECT
 */
export type run_stddev_samp_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name run_sum_fields
 * @type OBJECT
 */
type t_run_sum_fields = FieldsType<
  {
    __typename: t_String<"run_sum_fields">;
    blocks_blocked?: t_Int | null;
    blocks_count?: t_Int | null;
    blocks_failed?: t_Int | null;
    blocks_success?: t_Int | null;
    credits_taken?: t_Int | null;
    id?: t_bigint | null;
    project_id?: t_Int | null;
    run_by_user?: t_Int | null;
  },
  Extension<"run_sum_fields">
>;

/**
 * @name run_sum_order_by
 * @type INPUT_OBJECT
 */
export type run_sum_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name run_var_pop_fields
 * @type OBJECT
 */
type t_run_var_pop_fields = FieldsType<
  {
    __typename: t_String<"run_var_pop_fields">;
    blocks_blocked?: t_Float | null;
    blocks_count?: t_Float | null;
    blocks_failed?: t_Float | null;
    blocks_success?: t_Float | null;
    credits_taken?: t_Float | null;
    id?: t_Float | null;
    project_id?: t_Float | null;
    run_by_user?: t_Float | null;
  },
  Extension<"run_var_pop_fields">
>;

/**
 * @name run_var_pop_order_by
 * @type INPUT_OBJECT
 */
export type run_var_pop_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name run_var_samp_fields
 * @type OBJECT
 */
type t_run_var_samp_fields = FieldsType<
  {
    __typename: t_String<"run_var_samp_fields">;
    blocks_blocked?: t_Float | null;
    blocks_count?: t_Float | null;
    blocks_failed?: t_Float | null;
    blocks_success?: t_Float | null;
    credits_taken?: t_Float | null;
    id?: t_Float | null;
    project_id?: t_Float | null;
    run_by_user?: t_Float | null;
  },
  Extension<"run_var_samp_fields">
>;

/**
 * @name run_var_samp_order_by
 * @type INPUT_OBJECT
 */
export type run_var_samp_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name run_variance_fields
 * @type OBJECT
 */
type t_run_variance_fields = FieldsType<
  {
    __typename: t_String<"run_variance_fields">;
    blocks_blocked?: t_Float | null;
    blocks_count?: t_Float | null;
    blocks_failed?: t_Float | null;
    blocks_success?: t_Float | null;
    credits_taken?: t_Float | null;
    id?: t_Float | null;
    project_id?: t_Float | null;
    run_by_user?: t_Float | null;
  },
  Extension<"run_variance_fields">
>;

/**
 * @name run_variance_order_by
 * @type INPUT_OBJECT
 */
export type run_variance_order_by = {
  blocks_blocked?: order_by | null;
  blocks_count?: order_by | null;
  blocks_failed?: order_by | null;
  blocks_success?: order_by | null;
  credits_taken?: order_by | null;
  id?: order_by | null;
  project_id?: order_by | null;
  run_by_user?: order_by | null;
};

/**
 * @name subscription_root
 * @type OBJECT
 */
type t_subscription_root = FieldsType<
  {
    __typename: t_String<"subscription_root">;

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
    organization_by_pk?: FieldsTypeArg<{ id: number }, t_organization | null>;

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
    organization_invite_user_by_pk?: FieldsTypeArg<
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
    project_by_pk?: FieldsTypeArg<{ id: number }, t_project | null>;

    /**
     * fetch data from the table: "run"
     */
    run: FieldsTypeArg<
      {
        distinct_on?: run_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_order_by[] | null;
        where?: run_bool_exp | null;
      },
      t_run[]
    >;

    /**
     * fetch aggregated fields from the table: "run"
     */
    run_aggregate: FieldsTypeArg<
      {
        distinct_on?: run_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_order_by[] | null;
        where?: run_bool_exp | null;
      },
      t_run_aggregate
    >;

    /**
     * fetch data from the table: "run" using primary key columns
     */
    run_by_pk?: FieldsTypeArg<{ id: any }, t_run | null>;

    /**
     * fetch data from the table: "run_path"
     */
    run_path: FieldsTypeArg<
      {
        distinct_on?: run_path_select_column[] | null;
        limit?: number | null;
        offset?: number | null;
        order_by?: run_path_order_by[] | null;
        where?: run_path_bool_exp | null;
      },
      t_run_path[]
    >;

    /**
     * fetch data from the table: "run_path" using primary key columns
     */
    run_path_by_pk?: FieldsTypeArg<{ id: any }, t_run_path | null>;

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
    user_by_pk?: FieldsTypeArg<{ id: number }, t_user | null>;
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
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
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
  on_conflict?: user_on_conflict | null;
};

/**
 * @name user_bool_exp
 * @type INPUT_OBJECT
 */
export type user_bool_exp = {
  _and?: (user_bool_exp | null)[] | null;
  _not?: user_bool_exp | null;
  _or?: (user_bool_exp | null)[] | null;
  firebase_id?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  name?: String_comparison_exp | null;
  owner_of_organizations?: organization_bool_exp | null;
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
  name?: string | null;
  owner_of_organizations?: organization_arr_rel_insert_input | null;
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
  on_conflict?: user_on_conflict | null;
};

/**
 * @name user_on_conflict
 * @type INPUT_OBJECT
 */
export type user_on_conflict = {
  constraint: user_constraint;
  update_columns: user_update_column[];
  where?: user_bool_exp | null;
};

/**
 * @name user_order_by
 * @type INPUT_OBJECT
 */
export type user_order_by = {
  firebase_id?: order_by | null;
  id?: order_by | null;
  name?: order_by | null;
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
export type user_set_input = { name?: string | null };

/**
 * @name user_update_column
 * @type ENUM
 */
type t_user_update_column = EnumType<"name">;

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
 * @name RunProjectOutput
 * @type OBJECT
 */
export type RunProjectOutput = TypeData<t_RunProjectOutput>;

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
export enum __DirectiveLocation {
  ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION",
  ENUM = "ENUM",
  ENUM_VALUE = "ENUM_VALUE",
  FIELD = "FIELD",
  FIELD_DEFINITION = "FIELD_DEFINITION",
  FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD = "FRAGMENT_SPREAD",
  INLINE_FRAGMENT = "INLINE_FRAGMENT",
  INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION",
  INPUT_OBJECT = "INPUT_OBJECT",
  INTERFACE = "INTERFACE",
  MUTATION = "MUTATION",
  OBJECT = "OBJECT",
  QUERY = "QUERY",
  SCALAR = "SCALAR",
  SCHEMA = "SCHEMA",
  SUBSCRIPTION = "SUBSCRIPTION",
  UNION = "UNION",
}

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
export enum __TypeKind {
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  INTERFACE = "INTERFACE",
  LIST = "LIST",
  NON_NULL = "NON_NULL",
  OBJECT = "OBJECT",
  SCALAR = "SCALAR",
  UNION = "UNION",
}

/**
 * @name bigint
 * @type SCALAR
 */
export type bigint = TypeData<t_bigint>;

/**
 * @name jsonb
 * @type SCALAR
 */
export type jsonb = TypeData<t_jsonb>;

/**
 * @name mutation_root
 * @type OBJECT
 */
export type mutation_root = TypeData<t_mutation_root>;

/**
 * @name order_by
 * @type ENUM
 */
export enum order_by {
  asc = "asc",
  asc_nulls_first = "asc_nulls_first",
  asc_nulls_last = "asc_nulls_last",
  desc = "desc",
  desc_nulls_first = "desc_nulls_first",
  desc_nulls_last = "desc_nulls_last",
}

/**
 * @name organization
 * @type OBJECT
 */
export type organization = TypeData<t_organization>;

/**
 * @name organization_constraint
 * @type ENUM
 */
export enum organization_constraint {
  organization_name_key = "organization_name_key",
  organization_pkey = "organization_pkey",
  organization_slug_key = "organization_slug_key",
}

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
export enum organization_invite_user_select_column {
  created_at = "created_at",
  email = "email",
  id = "id",
  organization_id = "organization_id",
}

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
export enum organization_select_column {
  id = "id",
  name = "name",
  owner_id = "owner_id",
  slug = "slug",
}

/**
 * @name organization_update_column
 * @type ENUM
 */
export enum organization_update_column {
  name = "name",
  slug = "slug",
}

/**
 * @name project
 * @type OBJECT
 */
export type project = TypeData<t_project>;

/**
 * @name project_constraint
 * @type ENUM
 */
export enum project_constraint {
  project_organization_id_name_key = "project_organization_id_name_key",
  project_organization_id_slug_key = "project_organization_id_slug_key",
  project_pkey = "project_pkey",
}

/**
 * @name project_mutation_response
 * @type OBJECT
 */
export type project_mutation_response = TypeData<t_project_mutation_response>;

/**
 * @name project_select_column
 * @type ENUM
 */
export enum project_select_column {
  graph = "graph",
  id = "id",
  name = "name",
  organization_id = "organization_id",
  slug = "slug",
}

/**
 * @name project_update_column
 * @type ENUM
 */
export enum project_update_column {
  graph = "graph",
  name = "name",
  slug = "slug",
}

/**
 * @name query_root
 * @type OBJECT
 */
export type query_root = TypeData<t_query_root>;

/**
 * @name run
 * @type OBJECT
 */
export type run = TypeData<t_run>;

/**
 * @name run_aggregate
 * @type OBJECT
 */
export type run_aggregate = TypeData<t_run_aggregate>;

/**
 * @name run_aggregate_fields
 * @type OBJECT
 */
export type run_aggregate_fields = TypeData<t_run_aggregate_fields>;

/**
 * @name run_avg_fields
 * @type OBJECT
 */
export type run_avg_fields = TypeData<t_run_avg_fields>;

/**
 * @name run_max_fields
 * @type OBJECT
 */
export type run_max_fields = TypeData<t_run_max_fields>;

/**
 * @name run_min_fields
 * @type OBJECT
 */
export type run_min_fields = TypeData<t_run_min_fields>;

/**
 * @name run_mutation_response
 * @type OBJECT
 */
export type run_mutation_response = TypeData<t_run_mutation_response>;

/**
 * @name run_path
 * @type OBJECT
 */
export type run_path = TypeData<t_run_path>;

/**
 * @name run_path_select_column
 * @type ENUM
 */
export enum run_path_select_column {
  credits = "credits",
  edges = "edges",
  finished_at = "finished_at",
  id = "id",
  run_id = "run_id",
  started_at = "started_at",
  status = "status",
}

/**
 * @name run_select_column
 * @type ENUM
 */
export enum run_select_column {
  blocks_blocked = "blocks_blocked",
  blocks_count = "blocks_count",
  blocks_failed = "blocks_failed",
  blocks_success = "blocks_success",
  credits_taken = "credits_taken",
  finished_at = "finished_at",
  graph = "graph",
  id = "id",
  project_id = "project_id",
  run_by_user = "run_by_user",
  started_at = "started_at",
}

/**
 * @name run_stddev_fields
 * @type OBJECT
 */
export type run_stddev_fields = TypeData<t_run_stddev_fields>;

/**
 * @name run_stddev_pop_fields
 * @type OBJECT
 */
export type run_stddev_pop_fields = TypeData<t_run_stddev_pop_fields>;

/**
 * @name run_stddev_samp_fields
 * @type OBJECT
 */
export type run_stddev_samp_fields = TypeData<t_run_stddev_samp_fields>;

/**
 * @name run_sum_fields
 * @type OBJECT
 */
export type run_sum_fields = TypeData<t_run_sum_fields>;

/**
 * @name run_var_pop_fields
 * @type OBJECT
 */
export type run_var_pop_fields = TypeData<t_run_var_pop_fields>;

/**
 * @name run_var_samp_fields
 * @type OBJECT
 */
export type run_var_samp_fields = TypeData<t_run_var_samp_fields>;

/**
 * @name run_variance_fields
 * @type OBJECT
 */
export type run_variance_fields = TypeData<t_run_variance_fields>;

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
export enum user_constraint {
  user_firebase_id_key = "user_firebase_id_key",
  user_pkey = "user_pkey",
}

/**
 * @name user_mutation_response
 * @type OBJECT
 */
export type user_mutation_response = TypeData<t_user_mutation_response>;

/**
 * @name user_select_column
 * @type ENUM
 */
export enum user_select_column {
  firebase_id = "firebase_id",
  id = "id",
  name = "name",
}

/**
 * @name user_update_column
 * @type ENUM
 */
export enum user_update_column {
  name = "name",
}
