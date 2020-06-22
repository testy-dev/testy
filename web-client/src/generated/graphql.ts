import { DocumentNode } from 'graphql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  jsonb: any;
  timestamptz: any;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "organization" */
  delete_organization?: Maybe<Organization_Mutation_Response>;
  /** delete single row from the table: "organization" */
  delete_organization_by_pk?: Maybe<Organization>;
  /** delete data from the table: "organization_invite_user" */
  delete_organization_invite_user?: Maybe<Organization_Invite_User_Mutation_Response>;
  /** delete single row from the table: "organization_invite_user" */
  delete_organization_invite_user_by_pk?: Maybe<Organization_Invite_User>;
  /** delete data from the table: "project" */
  delete_project?: Maybe<Project_Mutation_Response>;
  /** delete single row from the table: "project" */
  delete_project_by_pk?: Maybe<Project>;
  /** insert data into the table: "organization" */
  insert_organization?: Maybe<Organization_Mutation_Response>;
  /** insert data into the table: "organization_invite_user" */
  insert_organization_invite_user?: Maybe<Organization_Invite_User_Mutation_Response>;
  /** insert a single row into the table: "organization_invite_user" */
  insert_organization_invite_user_one?: Maybe<Organization_Invite_User>;
  /** insert a single row into the table: "organization" */
  insert_organization_one?: Maybe<Organization>;
  /** insert data into the table: "project" */
  insert_project?: Maybe<Project_Mutation_Response>;
  /** insert a single row into the table: "project" */
  insert_project_one?: Maybe<Project>;
  /** insert data into the table: "run" */
  insert_run?: Maybe<Run_Mutation_Response>;
  /** insert a single row into the table: "run" */
  insert_run_one?: Maybe<Run>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** update data of the table: "organization" */
  update_organization?: Maybe<Organization_Mutation_Response>;
  /** update single row of the table: "organization" */
  update_organization_by_pk?: Maybe<Organization>;
  /** update data of the table: "project" */
  update_project?: Maybe<Project_Mutation_Response>;
  /** update single row of the table: "project" */
  update_project_by_pk?: Maybe<Project>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
};


/** mutation root */
export type Mutation_RootDelete_OrganizationArgs = {
  where: Organization_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organization_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Organization_Invite_UserArgs = {
  where: Organization_Invite_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organization_Invite_User_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectArgs = {
  where: Project_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Project_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_OrganizationArgs = {
  objects: Array<Organization_Insert_Input>;
  on_conflict?: Maybe<Organization_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organization_Invite_UserArgs = {
  objects: Array<Organization_Invite_User_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Organization_Invite_User_OneArgs = {
  object: Organization_Invite_User_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Organization_OneArgs = {
  object: Organization_Insert_Input;
  on_conflict?: Maybe<Organization_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectArgs = {
  objects: Array<Project_Insert_Input>;
  on_conflict?: Maybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_OneArgs = {
  object: Project_Insert_Input;
  on_conflict?: Maybe<Project_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RunArgs = {
  objects: Array<Run_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Run_OneArgs = {
  object: Run_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_OrganizationArgs = {
  _set?: Maybe<Organization_Set_Input>;
  where: Organization_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organization_By_PkArgs = {
  _set?: Maybe<Organization_Set_Input>;
  pk_columns: Organization_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectArgs = {
  _append?: Maybe<Project_Append_Input>;
  _delete_at_path?: Maybe<Project_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Project_Delete_Elem_Input>;
  _delete_key?: Maybe<Project_Delete_Key_Input>;
  _prepend?: Maybe<Project_Prepend_Input>;
  _set?: Maybe<Project_Set_Input>;
  where: Project_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Project_By_PkArgs = {
  _append?: Maybe<Project_Append_Input>;
  _delete_at_path?: Maybe<Project_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Project_Delete_Elem_Input>;
  _delete_key?: Maybe<Project_Delete_Key_Input>;
  _prepend?: Maybe<Project_Prepend_Input>;
  _set?: Maybe<Project_Set_Input>;
  pk_columns: Project_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** columns and relationships of "organization" */
export type Organization = {
  __typename?: 'organization';
  id: Scalars['Int'];
  /** An array relationship */
  invited_users: Array<Organization_Invite_User>;
  name: Scalars['String'];
  /** An object relationship */
  owner: User;
  owner_id: Scalars['Int'];
  /** An array relationship */
  projects: Array<Project>;
  slug: Scalars['String'];
};


/** columns and relationships of "organization" */
export type OrganizationInvited_UsersArgs = {
  distinct_on?: Maybe<Array<Organization_Invite_User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organization_Invite_User_Order_By>>;
  where?: Maybe<Organization_Invite_User_Bool_Exp>;
};


/** columns and relationships of "organization" */
export type OrganizationProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

/** columns and relationships of "organization_invite_user" */
export type Organization_Invite_User = {
  __typename?: 'organization_invite_user';
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['Int'];
  /** An object relationship */
  organization: Organization;
  organization_id: Scalars['Int'];
};

/** response of any mutation on the table "organization_invite_user" */
export type Organization_Invite_User_Mutation_Response = {
  __typename?: 'organization_invite_user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Organization_Invite_User>;
};

/** response of any mutation on the table "organization" */
export type Organization_Mutation_Response = {
  __typename?: 'organization_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Organization>;
};

/** columns and relationships of "project" */
export type Project = {
  __typename?: 'project';
  graph?: Maybe<Scalars['jsonb']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An object relationship */
  organization: Organization;
  organization_id: Scalars['Int'];
  /** An array relationship */
  run: Array<Run>;
  /** An aggregated array relationship */
  run_aggregate: Run_Aggregate;
  settings?: Maybe<Scalars['jsonb']>;
  slug: Scalars['String'];
};


/** columns and relationships of "project" */
export type ProjectGraphArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "project" */
export type ProjectRunArgs = {
  distinct_on?: Maybe<Array<Run_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Order_By>>;
  where?: Maybe<Run_Bool_Exp>;
};


/** columns and relationships of "project" */
export type ProjectRun_AggregateArgs = {
  distinct_on?: Maybe<Array<Run_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Order_By>>;
  where?: Maybe<Run_Bool_Exp>;
};


/** columns and relationships of "project" */
export type ProjectSettingsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "project" */
export type Project_Mutation_Response = {
  __typename?: 'project_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Project>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "organization" */
  organization: Array<Organization>;
  /** fetch data from the table: "organization" using primary key columns */
  organization_by_pk?: Maybe<Organization>;
  /** fetch data from the table: "organization_invite_user" */
  organization_invite_user: Array<Organization_Invite_User>;
  /** fetch data from the table: "organization_invite_user" using primary key columns */
  organization_invite_user_by_pk?: Maybe<Organization_Invite_User>;
  /** fetch data from the table: "project" */
  project: Array<Project>;
  /** fetch data from the table: "project" using primary key columns */
  project_by_pk?: Maybe<Project>;
  /** fetch data from the table: "run" */
  run: Array<Run>;
  /** fetch aggregated fields from the table: "run" */
  run_aggregate: Run_Aggregate;
  /** fetch data from the table: "run" using primary key columns */
  run_by_pk?: Maybe<Run>;
  /** fetch data from the table: "run_path" */
  run_path: Array<Run_Path>;
  /** fetch data from the table: "run_path" using primary key columns */
  run_path_by_pk?: Maybe<Run_Path>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** query root */
export type Query_RootOrganizationArgs = {
  distinct_on?: Maybe<Array<Organization_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organization_Order_By>>;
  where?: Maybe<Organization_Bool_Exp>;
};


/** query root */
export type Query_RootOrganization_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootOrganization_Invite_UserArgs = {
  distinct_on?: Maybe<Array<Organization_Invite_User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organization_Invite_User_Order_By>>;
  where?: Maybe<Organization_Invite_User_Bool_Exp>;
};


/** query root */
export type Query_RootOrganization_Invite_User_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootProjectArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** query root */
export type Query_RootProject_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootRunArgs = {
  distinct_on?: Maybe<Array<Run_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Order_By>>;
  where?: Maybe<Run_Bool_Exp>;
};


/** query root */
export type Query_RootRun_AggregateArgs = {
  distinct_on?: Maybe<Array<Run_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Order_By>>;
  where?: Maybe<Run_Bool_Exp>;
};


/** query root */
export type Query_RootRun_By_PkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type Query_RootRun_PathArgs = {
  distinct_on?: Maybe<Array<Run_Path_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Path_Order_By>>;
  where?: Maybe<Run_Path_Bool_Exp>;
};


/** query root */
export type Query_RootRun_Path_By_PkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "run" */
export type Run = {
  __typename?: 'run';
  /** A computed field, executes function "run_blocks_runned" */
  blocks_runned?: Maybe<Scalars['Int']>;
  finished_at?: Maybe<Scalars['timestamptz']>;
  graph?: Maybe<Scalars['jsonb']>;
  id: Scalars['bigint'];
  /** An array relationship */
  paths: Array<Run_Path>;
  /** An object relationship */
  project: Project;
  project_id: Scalars['Int'];
  run_by_user: Scalars['Int'];
  settings?: Maybe<Scalars['jsonb']>;
  started_at: Scalars['timestamptz'];
};


/** columns and relationships of "run" */
export type RunGraphArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "run" */
export type RunPathsArgs = {
  distinct_on?: Maybe<Array<Run_Path_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Path_Order_By>>;
  where?: Maybe<Run_Path_Bool_Exp>;
};


/** columns and relationships of "run" */
export type RunSettingsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "run" */
export type Run_Aggregate = {
  __typename?: 'run_aggregate';
  aggregate?: Maybe<Run_Aggregate_Fields>;
  nodes: Array<Run>;
};

/** aggregate fields of "run" */
export type Run_Aggregate_Fields = {
  __typename?: 'run_aggregate_fields';
  avg?: Maybe<Run_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Run_Max_Fields>;
  min?: Maybe<Run_Min_Fields>;
  stddev?: Maybe<Run_Stddev_Fields>;
  stddev_pop?: Maybe<Run_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Run_Stddev_Samp_Fields>;
  sum?: Maybe<Run_Sum_Fields>;
  var_pop?: Maybe<Run_Var_Pop_Fields>;
  var_samp?: Maybe<Run_Var_Samp_Fields>;
  variance?: Maybe<Run_Variance_Fields>;
};


/** aggregate fields of "run" */
export type Run_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Run_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Run_Avg_Fields = {
  __typename?: 'run_avg_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
  run_by_user?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type Run_Max_Fields = {
  __typename?: 'run_max_fields';
  finished_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  project_id?: Maybe<Scalars['Int']>;
  run_by_user?: Maybe<Scalars['Int']>;
  started_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Run_Min_Fields = {
  __typename?: 'run_min_fields';
  finished_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  project_id?: Maybe<Scalars['Int']>;
  run_by_user?: Maybe<Scalars['Int']>;
  started_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "run" */
export type Run_Mutation_Response = {
  __typename?: 'run_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Run>;
};

/** columns and relationships of "run_path" */
export type Run_Path = {
  __typename?: 'run_path';
  /** A computed field, executes function "run_path_blocks_total" */
  blocks_count?: Maybe<Scalars['Int']>;
  /** A computed field, executes function "run_path_blocks_failed" */
  blocks_failed?: Maybe<Scalars['Int']>;
  /** A computed field, executes function "run_path_blocks_success" */
  blocks_success?: Maybe<Scalars['Int']>;
  edges: Scalars['jsonb'];
  finished_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['bigint'];
  /** An object relationship */
  run: Run;
  run_id: Scalars['bigint'];
  settings?: Maybe<Scalars['jsonb']>;
  started_at: Scalars['timestamptz'];
};


/** columns and relationships of "run_path" */
export type Run_PathEdgesArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "run_path" */
export type Run_PathSettingsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Run_Stddev_Fields = {
  __typename?: 'run_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
  run_by_user?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Run_Stddev_Pop_Fields = {
  __typename?: 'run_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
  run_by_user?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Run_Stddev_Samp_Fields = {
  __typename?: 'run_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
  run_by_user?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Run_Sum_Fields = {
  __typename?: 'run_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  project_id?: Maybe<Scalars['Int']>;
  run_by_user?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Run_Var_Pop_Fields = {
  __typename?: 'run_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
  run_by_user?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Run_Var_Samp_Fields = {
  __typename?: 'run_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
  run_by_user?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Run_Variance_Fields = {
  __typename?: 'run_variance_fields';
  id?: Maybe<Scalars['Float']>;
  project_id?: Maybe<Scalars['Float']>;
  run_by_user?: Maybe<Scalars['Float']>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "organization" */
  organization: Array<Organization>;
  /** fetch data from the table: "organization" using primary key columns */
  organization_by_pk?: Maybe<Organization>;
  /** fetch data from the table: "organization_invite_user" */
  organization_invite_user: Array<Organization_Invite_User>;
  /** fetch data from the table: "organization_invite_user" using primary key columns */
  organization_invite_user_by_pk?: Maybe<Organization_Invite_User>;
  /** fetch data from the table: "project" */
  project: Array<Project>;
  /** fetch data from the table: "project" using primary key columns */
  project_by_pk?: Maybe<Project>;
  /** fetch data from the table: "run" */
  run: Array<Run>;
  /** fetch aggregated fields from the table: "run" */
  run_aggregate: Run_Aggregate;
  /** fetch data from the table: "run" using primary key columns */
  run_by_pk?: Maybe<Run>;
  /** fetch data from the table: "run_path" */
  run_path: Array<Run_Path>;
  /** fetch data from the table: "run_path" using primary key columns */
  run_path_by_pk?: Maybe<Run_Path>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


/** subscription root */
export type Subscription_RootOrganizationArgs = {
  distinct_on?: Maybe<Array<Organization_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organization_Order_By>>;
  where?: Maybe<Organization_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrganization_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootOrganization_Invite_UserArgs = {
  distinct_on?: Maybe<Array<Organization_Invite_User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organization_Invite_User_Order_By>>;
  where?: Maybe<Organization_Invite_User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOrganization_Invite_User_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootProjectArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProject_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootRunArgs = {
  distinct_on?: Maybe<Array<Run_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Order_By>>;
  where?: Maybe<Run_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRun_AggregateArgs = {
  distinct_on?: Maybe<Array<Run_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Order_By>>;
  where?: Maybe<Run_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRun_By_PkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type Subscription_RootRun_PathArgs = {
  distinct_on?: Maybe<Array<Run_Path_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Run_Path_Order_By>>;
  where?: Maybe<Run_Path_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRun_Path_By_PkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  firebase_id: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  owner_of_organizations: Array<Organization>;
};


/** columns and relationships of "user" */
export type UserOwner_Of_OrganizationsArgs = {
  distinct_on?: Maybe<Array<Organization_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Organization_Order_By>>;
  where?: Maybe<Organization_Bool_Exp>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** unique or primary key constraints on table "organization" */
export enum Organization_Constraint {
  /** unique or primary key constraint */
  OrganizationNameKey = 'organization_name_key',
  /** unique or primary key constraint */
  OrganizationPkey = 'organization_pkey',
  /** unique or primary key constraint */
  OrganizationSlugKey = 'organization_slug_key'
}

/** select columns of table "organization_invite_user" */
export enum Organization_Invite_User_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  OrganizationId = 'organization_id'
}

/** select columns of table "organization" */
export enum Organization_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Slug = 'slug'
}

/** update columns of table "organization" */
export enum Organization_Update_Column {
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug'
}

/** unique or primary key constraints on table "project" */
export enum Project_Constraint {
  /** unique or primary key constraint */
  ProjectOrganizationIdNameKey = 'project_organization_id_name_key',
  /** unique or primary key constraint */
  ProjectOrganizationIdSlugKey = 'project_organization_id_slug_key',
  /** unique or primary key constraint */
  ProjectPkey = 'project_pkey'
}

/** select columns of table "project" */
export enum Project_Select_Column {
  /** column name */
  Graph = 'graph',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  Settings = 'settings',
  /** column name */
  Slug = 'slug'
}

/** update columns of table "project" */
export enum Project_Update_Column {
  /** column name */
  Graph = 'graph',
  /** column name */
  Name = 'name',
  /** column name */
  Settings = 'settings',
  /** column name */
  Slug = 'slug'
}

/** select columns of table "run_path" */
export enum Run_Path_Select_Column {
  /** column name */
  Edges = 'edges',
  /** column name */
  FinishedAt = 'finished_at',
  /** column name */
  Id = 'id',
  /** column name */
  RunId = 'run_id',
  /** column name */
  Settings = 'settings',
  /** column name */
  StartedAt = 'started_at'
}

/** select columns of table "run" */
export enum Run_Select_Column {
  /** column name */
  FinishedAt = 'finished_at',
  /** column name */
  Graph = 'graph',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  RunByUser = 'run_by_user',
  /** column name */
  Settings = 'settings',
  /** column name */
  StartedAt = 'started_at'
}

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserFirebaseIdKey = 'user_firebase_id_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  FirebaseId = 'firebase_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  Name = 'name'
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** input type for inserting array relation for remote table "organization" */
export type Organization_Arr_Rel_Insert_Input = {
  data: Array<Organization_Insert_Input>;
  on_conflict?: Maybe<Organization_On_Conflict>;
};

/** Boolean expression to filter rows from the table "organization". All fields are combined with a logical 'AND'. */
export type Organization_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Organization_Bool_Exp>>>;
  _not?: Maybe<Organization_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Organization_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  invited_users?: Maybe<Organization_Invite_User_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner?: Maybe<User_Bool_Exp>;
  owner_id?: Maybe<Int_Comparison_Exp>;
  projects?: Maybe<Project_Bool_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "organization" */
export type Organization_Insert_Input = {
  invited_users?: Maybe<Organization_Invite_User_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User_Obj_Rel_Insert_Input>;
  owner_id?: Maybe<Scalars['Int']>;
  projects?: Maybe<Project_Arr_Rel_Insert_Input>;
  slug?: Maybe<Scalars['String']>;
};

/** input type for inserting array relation for remote table "organization_invite_user" */
export type Organization_Invite_User_Arr_Rel_Insert_Input = {
  data: Array<Organization_Invite_User_Insert_Input>;
};

/** Boolean expression to filter rows from the table "organization_invite_user". All fields are combined with a logical 'AND'. */
export type Organization_Invite_User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Organization_Invite_User_Bool_Exp>>>;
  _not?: Maybe<Organization_Invite_User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Organization_Invite_User_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  organization?: Maybe<Organization_Bool_Exp>;
  organization_id?: Maybe<Int_Comparison_Exp>;
};

/** input type for inserting data into table "organization_invite_user" */
export type Organization_Invite_User_Insert_Input = {
  email?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization_Obj_Rel_Insert_Input>;
  organization_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting object relation for remote table "organization_invite_user" */
export type Organization_Invite_User_Obj_Rel_Insert_Input = {
  data: Organization_Invite_User_Insert_Input;
};

/** ordering options when selecting data from "organization_invite_user" */
export type Organization_Invite_User_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  organization?: Maybe<Organization_Order_By>;
  organization_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "organization_invite_user" */
export type Organization_Invite_User_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** input type for inserting object relation for remote table "organization" */
export type Organization_Obj_Rel_Insert_Input = {
  data: Organization_Insert_Input;
  on_conflict?: Maybe<Organization_On_Conflict>;
};

/** on conflict condition type for table "organization" */
export type Organization_On_Conflict = {
  constraint: Organization_Constraint;
  update_columns: Array<Organization_Update_Column>;
  where?: Maybe<Organization_Bool_Exp>;
};

/** ordering options when selecting data from "organization" */
export type Organization_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner?: Maybe<User_Order_By>;
  owner_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** primary key columns input for table: "organization" */
export type Organization_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** input type for updating data in table "organization" */
export type Organization_Set_Input = {
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Project_Append_Input = {
  graph?: Maybe<Scalars['jsonb']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "project" */
export type Project_Arr_Rel_Insert_Input = {
  data: Array<Project_Insert_Input>;
  on_conflict?: Maybe<Project_On_Conflict>;
};

/** Boolean expression to filter rows from the table "project". All fields are combined with a logical 'AND'. */
export type Project_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Project_Bool_Exp>>>;
  _not?: Maybe<Project_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Project_Bool_Exp>>>;
  graph?: Maybe<Jsonb_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  organization?: Maybe<Organization_Bool_Exp>;
  organization_id?: Maybe<Int_Comparison_Exp>;
  run?: Maybe<Run_Bool_Exp>;
  settings?: Maybe<Jsonb_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Project_Delete_At_Path_Input = {
  graph?: Maybe<Array<Maybe<Scalars['String']>>>;
  settings?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Project_Delete_Elem_Input = {
  graph?: Maybe<Scalars['Int']>;
  settings?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Project_Delete_Key_Input = {
  graph?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "project" */
export type Project_Insert_Input = {
  graph?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization_Obj_Rel_Insert_Input>;
  organization_id?: Maybe<Scalars['Int']>;
  run?: Maybe<Run_Arr_Rel_Insert_Input>;
  settings?: Maybe<Scalars['jsonb']>;
  slug?: Maybe<Scalars['String']>;
};

/** input type for inserting object relation for remote table "project" */
export type Project_Obj_Rel_Insert_Input = {
  data: Project_Insert_Input;
  on_conflict?: Maybe<Project_On_Conflict>;
};

/** on conflict condition type for table "project" */
export type Project_On_Conflict = {
  constraint: Project_Constraint;
  update_columns: Array<Project_Update_Column>;
  where?: Maybe<Project_Bool_Exp>;
};

/** ordering options when selecting data from "project" */
export type Project_Order_By = {
  graph?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organization?: Maybe<Organization_Order_By>;
  organization_id?: Maybe<Order_By>;
  run_aggregate?: Maybe<Run_Aggregate_Order_By>;
  settings?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** primary key columns input for table: "project" */
export type Project_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Project_Prepend_Input = {
  graph?: Maybe<Scalars['jsonb']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** input type for updating data in table "project" */
export type Project_Set_Input = {
  graph?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
  slug?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "run" */
export type Run_Aggregate_Order_By = {
  avg?: Maybe<Run_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Run_Max_Order_By>;
  min?: Maybe<Run_Min_Order_By>;
  stddev?: Maybe<Run_Stddev_Order_By>;
  stddev_pop?: Maybe<Run_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Run_Stddev_Samp_Order_By>;
  sum?: Maybe<Run_Sum_Order_By>;
  var_pop?: Maybe<Run_Var_Pop_Order_By>;
  var_samp?: Maybe<Run_Var_Samp_Order_By>;
  variance?: Maybe<Run_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "run" */
export type Run_Arr_Rel_Insert_Input = {
  data: Array<Run_Insert_Input>;
};

/** order by avg() on columns of table "run" */
export type Run_Avg_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "run". All fields are combined with a logical 'AND'. */
export type Run_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Run_Bool_Exp>>>;
  _not?: Maybe<Run_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Run_Bool_Exp>>>;
  finished_at?: Maybe<Timestamptz_Comparison_Exp>;
  graph?: Maybe<Jsonb_Comparison_Exp>;
  id?: Maybe<Bigint_Comparison_Exp>;
  paths?: Maybe<Run_Path_Bool_Exp>;
  project?: Maybe<Project_Bool_Exp>;
  project_id?: Maybe<Int_Comparison_Exp>;
  run_by_user?: Maybe<Int_Comparison_Exp>;
  settings?: Maybe<Jsonb_Comparison_Exp>;
  started_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** input type for inserting data into table "run" */
export type Run_Insert_Input = {
  graph?: Maybe<Scalars['jsonb']>;
  project?: Maybe<Project_Obj_Rel_Insert_Input>;
  project_id?: Maybe<Scalars['Int']>;
  run_by_user?: Maybe<Scalars['Int']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** order by max() on columns of table "run" */
export type Run_Max_Order_By = {
  finished_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
  started_at?: Maybe<Order_By>;
};

/** order by min() on columns of table "run" */
export type Run_Min_Order_By = {
  finished_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
  started_at?: Maybe<Order_By>;
};

/** input type for inserting object relation for remote table "run" */
export type Run_Obj_Rel_Insert_Input = {
  data: Run_Insert_Input;
};

/** ordering options when selecting data from "run" */
export type Run_Order_By = {
  finished_at?: Maybe<Order_By>;
  graph?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project?: Maybe<Project_Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
  settings?: Maybe<Order_By>;
  started_at?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "run_path". All fields are combined with a logical 'AND'. */
export type Run_Path_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Run_Path_Bool_Exp>>>;
  _not?: Maybe<Run_Path_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Run_Path_Bool_Exp>>>;
  edges?: Maybe<Jsonb_Comparison_Exp>;
  finished_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Bigint_Comparison_Exp>;
  run?: Maybe<Run_Bool_Exp>;
  run_id?: Maybe<Bigint_Comparison_Exp>;
  settings?: Maybe<Jsonb_Comparison_Exp>;
  started_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** ordering options when selecting data from "run_path" */
export type Run_Path_Order_By = {
  edges?: Maybe<Order_By>;
  finished_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  run?: Maybe<Run_Order_By>;
  run_id?: Maybe<Order_By>;
  settings?: Maybe<Order_By>;
  started_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "run_path" */
export type Run_Path_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** primary key columns input for table: "run" */
export type Run_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** order by stddev() on columns of table "run" */
export type Run_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "run" */
export type Run_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "run" */
export type Run_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** order by sum() on columns of table "run" */
export type Run_Sum_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "run" */
export type Run_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "run" */
export type Run_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** order by variance() on columns of table "run" */
export type Run_Variance_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  run_by_user?: Maybe<Order_By>;
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  firebase_id?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner_of_organizations?: Maybe<Organization_Bool_Exp>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  name?: Maybe<Scalars['String']>;
  owner_of_organizations?: Maybe<Organization_Arr_Rel_Insert_Input>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  firebase_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** input type for updating data in table "user" */
export type User_Set_Input = {
  name?: Maybe<Scalars['String']>;
};




export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = (
  { __typename?: 'query_root' }
  & { organization: Array<(
    { __typename?: 'organization' }
    & Pick<Organization, 'id' | 'slug' | 'name'>
    & { projects: Array<(
      { __typename?: 'project' }
      & Pick<Project, 'id' | 'slug' | 'name'>
    )> }
  )> }
);

export type CreateOrganizationMutationVariables = Exact<{
  input: Organization_Insert_Input;
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_organization_one?: Maybe<(
    { __typename?: 'organization' }
    & Pick<Organization, 'id'>
  )> }
);

export type CreateProjectMutationVariables = Exact<{
  input: Project_Insert_Input;
}>;


export type CreateProjectMutation = (
  { __typename?: 'mutation_root' }
  & { insert_project_one?: Maybe<(
    { __typename?: 'project' }
    & Pick<Project, 'id'>
  )> }
);

export type GetPathByIdQueryVariables = Exact<{
  id: Scalars['bigint'];
}>;


export type GetPathByIdQuery = (
  { __typename?: 'query_root' }
  & { run_path_by_pk?: Maybe<(
    { __typename?: 'run_path' }
    & Pick<Run_Path, 'id' | 'blocks_count' | 'blocks_success' | 'blocks_failed' | 'edges' | 'started_at' | 'finished_at'>
    & { run: (
      { __typename?: 'run' }
      & Pick<Run, 'graph'>
    ) }
  )> }
);

export type ProjectRunsSubscriptionVariables = Exact<{
  projectSlug: Scalars['String'];
  orgSlug: Scalars['String'];
}>;


export type ProjectRunsSubscription = (
  { __typename?: 'subscription_root' }
  & { project: Array<(
    { __typename?: 'project' }
    & Pick<Project, 'id' | 'graph'>
    & { run_aggregate: (
      { __typename?: 'run_aggregate' }
      & { aggregate?: Maybe<(
        { __typename?: 'run_aggregate_fields' }
        & Pick<Run_Aggregate_Fields, 'count'>
      )> }
    ), run: Array<(
      { __typename?: 'run' }
      & Pick<Run, 'id' | 'started_at' | 'graph'>
      & { paths: Array<(
        { __typename?: 'run_path' }
        & Pick<Run_Path, 'id' | 'edges' | 'blocks_count' | 'blocks_success' | 'blocks_failed'>
      )> }
    )> }
  )> }
);

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectByIdQuery = (
  { __typename?: 'query_root' }
  & { project_by_pk?: Maybe<(
    { __typename?: 'project' }
    & Pick<Project, 'id' | 'name' | 'settings'>
  )> }
);

export type ProjectBySlugQueryVariables = Exact<{
  projectSlug: Scalars['String'];
  orgSlug: Scalars['String'];
}>;


export type ProjectBySlugQuery = (
  { __typename?: 'query_root' }
  & { project: Array<(
    { __typename?: 'project' }
    & Pick<Project, 'id' | 'name' | 'settings'>
  )> }
);

export type CreateRunMutationVariables = Exact<{
  projectId: Scalars['Int'];
  run_by_user: Scalars['Int'];
  settings?: Maybe<Scalars['jsonb']>;
}>;


export type CreateRunMutation = (
  { __typename?: 'mutation_root' }
  & { insert_run_one?: Maybe<(
    { __typename?: 'run' }
    & Pick<Run, 'id'>
  )> }
);

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['Int'];
  data: Project_Set_Input;
}>;


export type UpdateProjectMutation = (
  { __typename?: 'mutation_root' }
  & { update_project_by_pk?: Maybe<(
    { __typename?: 'project' }
    & Pick<Project, 'id'>
  )> }
);

export type GetMeByFirebaseQueryVariables = Exact<{
  firebase_id: Scalars['String'];
}>;


export type GetMeByFirebaseQuery = (
  { __typename?: 'query_root' }
  & { user: Array<(
    { __typename?: 'user' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'mutation_root' }
  & { insert_user?: Maybe<(
    { __typename?: 'user_mutation_response' }
    & { returning: Array<(
      { __typename?: 'user' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);


export const GetOrganizationsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOrganizations"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]};

export function useGetOrganizationsQuery(options: Omit<Urql.UseQueryArgs<GetOrganizationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetOrganizationsQuery>({ query: GetOrganizationsDocument, ...options });
};
export const CreateOrganizationDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"organization_insert_input"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_organization_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

export function useCreateOrganizationMutation() {
  return Urql.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument);
};
export const CreateProjectDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"project_insert_input"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_project_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const GetPathByIdDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPathByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"run_path_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"blocks_count"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"blocks_success"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"blocks_failed"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"edges"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"started_at"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"finished_at"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"run"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"graph"},"arguments":[],"directives":[]}]}}]}}]}}]};

export function useGetPathByIdQuery(options: Omit<Urql.UseQueryArgs<GetPathByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPathByIdQuery>({ query: GetPathByIdDocument, ...options });
};
export const ProjectRunsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"projectRuns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectSlug"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"organization"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgSlug"}}}]}}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"graph"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"run_aggregate"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"},"arguments":[],"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"run"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"started_at"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"started_at"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"graph"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"paths"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"edges"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"blocks_count"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"blocks_success"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"blocks_failed"},"arguments":[],"directives":[]}]}}]}}]}}]}}]};

export function useProjectRunsSubscription<TData = ProjectRunsSubscription>(options: Omit<Urql.UseSubscriptionArgs<ProjectRunsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<ProjectRunsSubscription, TData>) {
  return Urql.useSubscription<ProjectRunsSubscription, TData, ProjectRunsSubscriptionVariables>({ query: ProjectRunsDocument, ...options }, handler);
};
export const ProjectByIdDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"settings"},"arguments":[],"directives":[]}]}}]}}]};

export function useProjectByIdQuery(options: Omit<Urql.UseQueryArgs<ProjectByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectByIdQuery>({ query: ProjectByIdDocument, ...options });
};
export const ProjectBySlugDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectSlug"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"organization"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgSlug"}}}]}}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"settings"},"arguments":[],"directives":[]}]}}]}}]};

export function useProjectBySlugQuery(options: Omit<Urql.UseQueryArgs<ProjectBySlugQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectBySlugQuery>({ query: ProjectBySlugDocument, ...options });
};
export const CreateRunDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRun"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"run_by_user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"settings"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_run_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"project_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"run_by_user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"run_by_user"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"settings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"settings"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

export function useCreateRunMutation() {
  return Urql.useMutation<CreateRunMutation, CreateRunMutationVariables>(CreateRunDocument);
};
export const UpdateProjectDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"project_set_input"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_project_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
};
export const GetMeByFirebaseDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMeByFirebase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firebase_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firebase_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firebase_id"}}}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};

export function useGetMeByFirebaseQuery(options: Omit<Urql.UseQueryArgs<GetMeByFirebaseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMeByFirebaseQuery>({ query: GetMeByFirebaseDocument, ...options });
};
export const CreateUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]}}]};

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};