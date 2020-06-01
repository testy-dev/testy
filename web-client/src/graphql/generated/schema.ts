// @ts-nocheck
import * as extensions from "../extensions";
import {
  Arguments,
  ArgumentsField,
  ArrayNode,
  EnumNode,
  FieldNode,
  InputNode,
  InputNodeField,
  ObjectNode,
  ScalarNode,
} from "gqless";
import { lazyGetters } from "@gqless/utils";

export const schema = {
  get Boolean() {
    return new ScalarNode({
      name: "Boolean",
      extension: ((extensions as any) || {}).Boolean,
    });
  },
  get Float() {
    return new ScalarNode({
      name: "Float",
      extension: ((extensions as any) || {}).Float,
    });
  },
  get ID() {
    return new ScalarNode({
      name: "ID",
      extension: ((extensions as any) || {}).ID,
    });
  },
  get Int() {
    return new ScalarNode({
      name: "Int",
      extension: ((extensions as any) || {}).Int,
    });
  },
  get Int_comparison_exp() {
    return new InputNode(
      {
        get _eq() {
          return new InputNodeField(schema.Int, true);
        },
        get _gt() {
          return new InputNodeField(schema.Int, true);
        },
        get _gte() {
          return new InputNodeField(schema.Int, true);
        },
        get _in() {
          return new InputNodeField(new ArrayNode(schema.Int, true), true);
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _lt() {
          return new InputNodeField(schema.Int, true);
        },
        get _lte() {
          return new InputNodeField(schema.Int, true);
        },
        get _neq() {
          return new InputNodeField(schema.Int, true);
        },
        get _nin() {
          return new InputNodeField(new ArrayNode(schema.Int, true), true);
        },
      },
      { name: "Int_comparison_exp" }
    );
  },
  get RunProjectOutput() {
    return new ObjectNode(
      {
        get status() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
      },
      {
        name: "RunProjectOutput",
        extension: ((extensions as any) || {}).RunProjectOutput,
      }
    );
  },
  get SampleInput() {
    return new InputNode(
      {
        get password() {
          return new InputNodeField(schema.String, false);
        },
        get username() {
          return new InputNodeField(schema.String, false);
        },
      },
      { name: "SampleInput" }
    );
  },
  get SampleOutput() {
    return new ObjectNode(
      {
        get accessToken() {
          return new FieldNode(schema.String, undefined, false);
        },
      },
      {
        name: "SampleOutput",
        extension: ((extensions as any) || {}).SampleOutput,
      }
    );
  },
  get String() {
    return new ScalarNode({
      name: "String",
      extension: ((extensions as any) || {}).String,
    });
  },
  get String_comparison_exp() {
    return new InputNode(
      {
        get _eq() {
          return new InputNodeField(schema.String, true);
        },
        get _gt() {
          return new InputNodeField(schema.String, true);
        },
        get _gte() {
          return new InputNodeField(schema.String, true);
        },
        get _ilike() {
          return new InputNodeField(schema.String, true);
        },
        get _in() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _like() {
          return new InputNodeField(schema.String, true);
        },
        get _lt() {
          return new InputNodeField(schema.String, true);
        },
        get _lte() {
          return new InputNodeField(schema.String, true);
        },
        get _neq() {
          return new InputNodeField(schema.String, true);
        },
        get _nilike() {
          return new InputNodeField(schema.String, true);
        },
        get _nin() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get _nlike() {
          return new InputNodeField(schema.String, true);
        },
        get _nsimilar() {
          return new InputNodeField(schema.String, true);
        },
        get _similar() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "String_comparison_exp" }
    );
  },
  get __Directive() {
    return new ObjectNode(
      {
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get locations() {
          return new FieldNode(
            new ArrayNode(schema.__DirectiveLocation, false),
            undefined,
            false
          );
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
      },
      {
        name: "__Directive",
        extension: ((extensions as any) || {}).__Directive,
      }
    );
  },
  get __DirectiveLocation() {
    return new EnumNode({ name: "__DirectiveLocation" });
  },
  get __EnumValue() {
    return new ObjectNode(
      {
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
      },
      {
        name: "__EnumValue",
        extension: ((extensions as any) || {}).__EnumValue,
      }
    );
  },
  get __Field() {
    return new ObjectNode(
      {
        get args() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, false),
            undefined,
            false
          );
        },
        get deprecationReason() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get isDeprecated() {
          return new FieldNode(schema.Boolean, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
      },
      { name: "__Field", extension: ((extensions as any) || {}).__Field }
    );
  },
  get __InputValue() {
    return new ObjectNode(
      {
        get defaultValue() {
          return new FieldNode(schema.String, undefined, true);
        },
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get type() {
          return new FieldNode(schema.__Type, undefined, false);
        },
      },
      {
        name: "__InputValue",
        extension: ((extensions as any) || {}).__InputValue,
      }
    );
  },
  get __Schema() {
    return new ObjectNode(
      {
        get directives() {
          return new FieldNode(
            new ArrayNode(schema.__Directive, false),
            undefined,
            false
          );
        },
        get mutationType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get queryType() {
          return new FieldNode(schema.__Type, undefined, false);
        },
        get subscriptionType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get types() {
          return new FieldNode(
            new ArrayNode(schema.__Type, false),
            undefined,
            false
          );
        },
      },
      { name: "__Schema", extension: ((extensions as any) || {}).__Schema }
    );
  },
  get __Type() {
    return new ObjectNode(
      {
        get description() {
          return new FieldNode(schema.String, undefined, true);
        },
        get enumValues() {
          return new FieldNode(
            new ArrayNode(schema.__EnumValue, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true
          );
        },
        get fields() {
          return new FieldNode(
            new ArrayNode(schema.__Field, true),
            new Arguments({
              get includeDeprecated() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true
          );
        },
        get inputFields() {
          return new FieldNode(
            new ArrayNode(schema.__InputValue, true),
            undefined,
            true
          );
        },
        get interfaces() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        },
        get kind() {
          return new FieldNode(schema.__TypeKind, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, true);
        },
        get ofType() {
          return new FieldNode(schema.__Type, undefined, true);
        },
        get possibleTypes() {
          return new FieldNode(
            new ArrayNode(schema.__Type, true),
            undefined,
            true
          );
        },
      },
      { name: "__Type", extension: ((extensions as any) || {}).__Type }
    );
  },
  get __TypeKind() {
    return new EnumNode({ name: "__TypeKind" });
  },
  get bigint() {
    return new ScalarNode({
      name: "bigint",
      extension: ((extensions as any) || {}).bigint,
    });
  },
  get bigint_comparison_exp() {
    return new InputNode(
      {
        get _eq() {
          return new InputNodeField(schema.bigint, true);
        },
        get _gt() {
          return new InputNodeField(schema.bigint, true);
        },
        get _gte() {
          return new InputNodeField(schema.bigint, true);
        },
        get _in() {
          return new InputNodeField(new ArrayNode(schema.bigint, true), true);
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _lt() {
          return new InputNodeField(schema.bigint, true);
        },
        get _lte() {
          return new InputNodeField(schema.bigint, true);
        },
        get _neq() {
          return new InputNodeField(schema.bigint, true);
        },
        get _nin() {
          return new InputNodeField(new ArrayNode(schema.bigint, true), true);
        },
      },
      { name: "bigint_comparison_exp" }
    );
  },
  get jsonb() {
    return new ScalarNode({
      name: "jsonb",
      extension: ((extensions as any) || {}).jsonb,
    });
  },
  get jsonb_comparison_exp() {
    return new InputNode(
      {
        get _contained_in() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _contains() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _eq() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _gt() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _gte() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _has_key() {
          return new InputNodeField(schema.String, true);
        },
        get _has_keys_all() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get _has_keys_any() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
        get _in() {
          return new InputNodeField(new ArrayNode(schema.jsonb, true), true);
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _lt() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _lte() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _neq() {
          return new InputNodeField(schema.jsonb, true);
        },
        get _nin() {
          return new InputNodeField(new ArrayNode(schema.jsonb, true), true);
        },
      },
      { name: "jsonb_comparison_exp" }
    );
  },
  get mutation_root() {
    return new ObjectNode(
      {
        get delete_organization() {
          return new FieldNode(
            schema.organization_mutation_response,
            new Arguments(
              {
                get where() {
                  return new ArgumentsField(
                    schema.organization_bool_exp,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get delete_organization_by_pk() {
          return new FieldNode(
            schema.organization,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get delete_organization_invite_user() {
          return new FieldNode(
            schema.organization_invite_user_mutation_response,
            new Arguments(
              {
                get where() {
                  return new ArgumentsField(
                    schema.organization_invite_user_bool_exp,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get delete_organization_invite_user_by_pk() {
          return new FieldNode(
            schema.organization_invite_user,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get delete_project() {
          return new FieldNode(
            schema.project_mutation_response,
            new Arguments(
              {
                get where() {
                  return new ArgumentsField(schema.project_bool_exp, false);
                },
              },
              true
            ),
            true
          );
        },
        get delete_project_by_pk() {
          return new FieldNode(
            schema.project,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get insert_organization() {
          return new FieldNode(
            schema.organization_mutation_response,
            new Arguments({
              get objects() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_insert_input, false),
                  false
                );
              },
              get on_conflict() {
                return new ArgumentsField(
                  schema.organization_on_conflict,
                  true
                );
              },
            }),
            true
          );
        },
        get insert_organization_invite_user() {
          return new FieldNode(
            schema.organization_invite_user_mutation_response,
            new Arguments(
              {
                get objects() {
                  return new ArgumentsField(
                    new ArrayNode(
                      schema.organization_invite_user_insert_input,
                      false
                    ),
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get insert_organization_invite_user_one() {
          return new FieldNode(
            schema.organization_invite_user,
            new Arguments(
              {
                get object() {
                  return new ArgumentsField(
                    schema.organization_invite_user_insert_input,
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get insert_organization_one() {
          return new FieldNode(
            schema.organization,
            new Arguments({
              get object() {
                return new ArgumentsField(
                  schema.organization_insert_input,
                  false
                );
              },
              get on_conflict() {
                return new ArgumentsField(
                  schema.organization_on_conflict,
                  true
                );
              },
            }),
            true
          );
        },
        get insert_project() {
          return new FieldNode(
            schema.project_mutation_response,
            new Arguments({
              get objects() {
                return new ArgumentsField(
                  new ArrayNode(schema.project_insert_input, false),
                  false
                );
              },
              get on_conflict() {
                return new ArgumentsField(schema.project_on_conflict, true);
              },
            }),
            true
          );
        },
        get insert_project_one() {
          return new FieldNode(
            schema.project,
            new Arguments({
              get object() {
                return new ArgumentsField(schema.project_insert_input, false);
              },
              get on_conflict() {
                return new ArgumentsField(schema.project_on_conflict, true);
              },
            }),
            true
          );
        },
        get insert_run() {
          return new FieldNode(
            schema.run_mutation_response,
            new Arguments(
              {
                get objects() {
                  return new ArgumentsField(
                    new ArrayNode(schema.run_insert_input, false),
                    false
                  );
                },
              },
              true
            ),
            true
          );
        },
        get insert_run_one() {
          return new FieldNode(
            schema.run,
            new Arguments(
              {
                get object() {
                  return new ArgumentsField(schema.run_insert_input, false);
                },
              },
              true
            ),
            true
          );
        },
        get insert_user() {
          return new FieldNode(
            schema.user_mutation_response,
            new Arguments({
              get objects() {
                return new ArgumentsField(
                  new ArrayNode(schema.user_insert_input, false),
                  false
                );
              },
              get on_conflict() {
                return new ArgumentsField(schema.user_on_conflict, true);
              },
            }),
            true
          );
        },
        get insert_user_one() {
          return new FieldNode(
            schema.user,
            new Arguments({
              get object() {
                return new ArgumentsField(schema.user_insert_input, false);
              },
              get on_conflict() {
                return new ArgumentsField(schema.user_on_conflict, true);
              },
            }),
            true
          );
        },
        get update_organization() {
          return new FieldNode(
            schema.organization_mutation_response,
            new Arguments({
              get _set() {
                return new ArgumentsField(schema.organization_set_input, true);
              },
              get where() {
                return new ArgumentsField(schema.organization_bool_exp, false);
              },
            }),
            true
          );
        },
        get update_organization_by_pk() {
          return new FieldNode(
            schema.organization,
            new Arguments({
              get _set() {
                return new ArgumentsField(schema.organization_set_input, true);
              },
              get pk_columns() {
                return new ArgumentsField(
                  schema.organization_pk_columns_input,
                  false
                );
              },
            }),
            true
          );
        },
        get update_project() {
          return new FieldNode(
            schema.project_mutation_response,
            new Arguments({
              get _append() {
                return new ArgumentsField(schema.project_append_input, true);
              },
              get _delete_at_path() {
                return new ArgumentsField(
                  schema.project_delete_at_path_input,
                  true
                );
              },
              get _delete_elem() {
                return new ArgumentsField(
                  schema.project_delete_elem_input,
                  true
                );
              },
              get _delete_key() {
                return new ArgumentsField(
                  schema.project_delete_key_input,
                  true
                );
              },
              get _prepend() {
                return new ArgumentsField(schema.project_prepend_input, true);
              },
              get _set() {
                return new ArgumentsField(schema.project_set_input, true);
              },
              get where() {
                return new ArgumentsField(schema.project_bool_exp, false);
              },
            }),
            true
          );
        },
        get update_project_by_pk() {
          return new FieldNode(
            schema.project,
            new Arguments({
              get _append() {
                return new ArgumentsField(schema.project_append_input, true);
              },
              get _delete_at_path() {
                return new ArgumentsField(
                  schema.project_delete_at_path_input,
                  true
                );
              },
              get _delete_elem() {
                return new ArgumentsField(
                  schema.project_delete_elem_input,
                  true
                );
              },
              get _delete_key() {
                return new ArgumentsField(
                  schema.project_delete_key_input,
                  true
                );
              },
              get _prepend() {
                return new ArgumentsField(schema.project_prepend_input, true);
              },
              get _set() {
                return new ArgumentsField(schema.project_set_input, true);
              },
              get pk_columns() {
                return new ArgumentsField(
                  schema.project_pk_columns_input,
                  false
                );
              },
            }),
            true
          );
        },
        get update_user() {
          return new FieldNode(
            schema.user_mutation_response,
            new Arguments({
              get _set() {
                return new ArgumentsField(schema.user_set_input, true);
              },
              get where() {
                return new ArgumentsField(schema.user_bool_exp, false);
              },
            }),
            true
          );
        },
        get update_user_by_pk() {
          return new FieldNode(
            schema.user,
            new Arguments({
              get _set() {
                return new ArgumentsField(schema.user_set_input, true);
              },
              get pk_columns() {
                return new ArgumentsField(schema.user_pk_columns_input, false);
              },
            }),
            true
          );
        },
      },
      {
        name: "mutation_root",
        extension: ((extensions as any) || {}).mutation_root,
      }
    );
  },
  get order_by() {
    return new EnumNode({ name: "order_by" });
  },
  get organization() {
    return new ObjectNode(
      {
        get id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get invited_users() {
          return new FieldNode(
            new ArrayNode(schema.organization_invite_user, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(
                    schema.organization_invite_user_select_column,
                    true
                  ),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_invite_user_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(
                  schema.organization_invite_user_bool_exp,
                  true
                );
              },
            }),
            false
          );
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get owner() {
          return new FieldNode(schema.user, undefined, false);
        },
        get owner_id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get projects() {
          return new FieldNode(
            new ArrayNode(schema.project, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.project_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.project_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.project_bool_exp, true);
              },
            }),
            false
          );
        },
        get slug() {
          return new FieldNode(schema.String, undefined, false);
        },
      },
      {
        name: "organization",
        extension: ((extensions as any) || {}).organization,
      }
    );
  },
  get organization_arr_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            new ArrayNode(schema.organization_insert_input, false),
            false
          );
        },
        get on_conflict() {
          return new InputNodeField(schema.organization_on_conflict, true);
        },
      },
      { name: "organization_arr_rel_insert_input" }
    );
  },
  get organization_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.organization_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(schema.organization_bool_exp, true);
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.organization_bool_exp, true),
            true
          );
        },
        get id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get invited_users() {
          return new InputNodeField(
            schema.organization_invite_user_bool_exp,
            true
          );
        },
        get name() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get owner() {
          return new InputNodeField(schema.user_bool_exp, true);
        },
        get owner_id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get projects() {
          return new InputNodeField(schema.project_bool_exp, true);
        },
        get slug() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
      },
      { name: "organization_bool_exp" }
    );
  },
  get organization_constraint() {
    return new EnumNode({ name: "organization_constraint" });
  },
  get organization_insert_input() {
    return new InputNode(
      {
        get invited_users() {
          return new InputNodeField(
            schema.organization_invite_user_arr_rel_insert_input,
            true
          );
        },
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get owner() {
          return new InputNodeField(schema.user_obj_rel_insert_input, true);
        },
        get owner_id() {
          return new InputNodeField(schema.Int, true);
        },
        get projects() {
          return new InputNodeField(schema.project_arr_rel_insert_input, true);
        },
        get slug() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "organization_insert_input" }
    );
  },
  get organization_invite_user() {
    return new ObjectNode(
      {
        get created_at() {
          return new FieldNode(schema.timestamptz, undefined, false);
        },
        get email() {
          return new FieldNode(schema.String, undefined, false);
        },
        get id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get organization() {
          return new FieldNode(schema.organization, undefined, false);
        },
        get organization_id() {
          return new FieldNode(schema.Int, undefined, false);
        },
      },
      {
        name: "organization_invite_user",
        extension: ((extensions as any) || {}).organization_invite_user,
      }
    );
  },
  get organization_invite_user_arr_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            new ArrayNode(schema.organization_invite_user_insert_input, false),
            false
          );
        },
      },
      { name: "organization_invite_user_arr_rel_insert_input" }
    );
  },
  get organization_invite_user_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.organization_invite_user_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(
            schema.organization_invite_user_bool_exp,
            true
          );
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.organization_invite_user_bool_exp, true),
            true
          );
        },
        get created_at() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
        get email() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get organization() {
          return new InputNodeField(schema.organization_bool_exp, true);
        },
        get organization_id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
      },
      { name: "organization_invite_user_bool_exp" }
    );
  },
  get organization_invite_user_insert_input() {
    return new InputNode(
      {
        get email() {
          return new InputNodeField(schema.String, true);
        },
        get organization() {
          return new InputNodeField(
            schema.organization_obj_rel_insert_input,
            true
          );
        },
        get organization_id() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "organization_invite_user_insert_input" }
    );
  },
  get organization_invite_user_mutation_response() {
    return new ObjectNode(
      {
        get affected_rows() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get returning() {
          return new FieldNode(
            new ArrayNode(schema.organization_invite_user, false),
            undefined,
            false
          );
        },
      },
      {
        name: "organization_invite_user_mutation_response",
        extension: ((extensions as any) || {})
          .organization_invite_user_mutation_response,
      }
    );
  },
  get organization_invite_user_obj_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            schema.organization_invite_user_insert_input,
            false
          );
        },
      },
      { name: "organization_invite_user_obj_rel_insert_input" }
    );
  },
  get organization_invite_user_order_by() {
    return new InputNode(
      {
        get created_at() {
          return new InputNodeField(schema.order_by, true);
        },
        get email() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get organization() {
          return new InputNodeField(schema.organization_order_by, true);
        },
        get organization_id() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "organization_invite_user_order_by" }
    );
  },
  get organization_invite_user_pk_columns_input() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.Int, false);
        },
      },
      { name: "organization_invite_user_pk_columns_input" }
    );
  },
  get organization_invite_user_select_column() {
    return new EnumNode({ name: "organization_invite_user_select_column" });
  },
  get organization_mutation_response() {
    return new ObjectNode(
      {
        get affected_rows() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get returning() {
          return new FieldNode(
            new ArrayNode(schema.organization, false),
            undefined,
            false
          );
        },
      },
      {
        name: "organization_mutation_response",
        extension: ((extensions as any) || {}).organization_mutation_response,
      }
    );
  },
  get organization_obj_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(schema.organization_insert_input, false);
        },
        get on_conflict() {
          return new InputNodeField(schema.organization_on_conflict, true);
        },
      },
      { name: "organization_obj_rel_insert_input" }
    );
  },
  get organization_on_conflict() {
    return new InputNode(
      {
        get constraint() {
          return new InputNodeField(schema.organization_constraint, false);
        },
        get update_columns() {
          return new InputNodeField(
            new ArrayNode(schema.organization_update_column, false),
            false
          );
        },
        get where() {
          return new InputNodeField(schema.organization_bool_exp, true);
        },
      },
      { name: "organization_on_conflict" }
    );
  },
  get organization_order_by() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get name() {
          return new InputNodeField(schema.order_by, true);
        },
        get owner() {
          return new InputNodeField(schema.user_order_by, true);
        },
        get owner_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get slug() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "organization_order_by" }
    );
  },
  get organization_pk_columns_input() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.Int, false);
        },
      },
      { name: "organization_pk_columns_input" }
    );
  },
  get organization_select_column() {
    return new EnumNode({ name: "organization_select_column" });
  },
  get organization_set_input() {
    return new InputNode(
      {
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get slug() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "organization_set_input" }
    );
  },
  get organization_update_column() {
    return new EnumNode({ name: "organization_update_column" });
  },
  get project() {
    return new ObjectNode(
      {
        get graph() {
          return new FieldNode(
            schema.jsonb,
            new Arguments({
              get path() {
                return new ArgumentsField(schema.String, true);
              },
            }),
            true
          );
        },
        get id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get organization() {
          return new FieldNode(schema.organization, undefined, false);
        },
        get organization_id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get run_history() {
          return new FieldNode(
            new ArrayNode(schema.run, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_bool_exp, true);
              },
            }),
            false
          );
        },
        get run_history_aggregate() {
          return new FieldNode(
            schema.run_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_bool_exp, true);
              },
            }),
            false
          );
        },
        get slug() {
          return new FieldNode(schema.String, undefined, false);
        },
      },
      { name: "project", extension: ((extensions as any) || {}).project }
    );
  },
  get project_append_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.jsonb, true);
        },
      },
      { name: "project_append_input" }
    );
  },
  get project_arr_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            new ArrayNode(schema.project_insert_input, false),
            false
          );
        },
        get on_conflict() {
          return new InputNodeField(schema.project_on_conflict, true);
        },
      },
      { name: "project_arr_rel_insert_input" }
    );
  },
  get project_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.project_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(schema.project_bool_exp, true);
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.project_bool_exp, true),
            true
          );
        },
        get graph() {
          return new InputNodeField(schema.jsonb_comparison_exp, true);
        },
        get id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get name() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get organization() {
          return new InputNodeField(schema.organization_bool_exp, true);
        },
        get organization_id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get run_history() {
          return new InputNodeField(schema.run_bool_exp, true);
        },
        get slug() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
      },
      { name: "project_bool_exp" }
    );
  },
  get project_constraint() {
    return new EnumNode({ name: "project_constraint" });
  },
  get project_delete_at_path_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(new ArrayNode(schema.String, true), true);
        },
      },
      { name: "project_delete_at_path_input" }
    );
  },
  get project_delete_elem_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "project_delete_elem_input" }
    );
  },
  get project_delete_key_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "project_delete_key_input" }
    );
  },
  get project_insert_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.jsonb, true);
        },
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get organization() {
          return new InputNodeField(
            schema.organization_obj_rel_insert_input,
            true
          );
        },
        get organization_id() {
          return new InputNodeField(schema.Int, true);
        },
        get run_history() {
          return new InputNodeField(schema.run_arr_rel_insert_input, true);
        },
        get slug() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "project_insert_input" }
    );
  },
  get project_mutation_response() {
    return new ObjectNode(
      {
        get affected_rows() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get returning() {
          return new FieldNode(
            new ArrayNode(schema.project, false),
            undefined,
            false
          );
        },
      },
      {
        name: "project_mutation_response",
        extension: ((extensions as any) || {}).project_mutation_response,
      }
    );
  },
  get project_obj_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(schema.project_insert_input, false);
        },
        get on_conflict() {
          return new InputNodeField(schema.project_on_conflict, true);
        },
      },
      { name: "project_obj_rel_insert_input" }
    );
  },
  get project_on_conflict() {
    return new InputNode(
      {
        get constraint() {
          return new InputNodeField(schema.project_constraint, false);
        },
        get update_columns() {
          return new InputNodeField(
            new ArrayNode(schema.project_update_column, false),
            false
          );
        },
        get where() {
          return new InputNodeField(schema.project_bool_exp, true);
        },
      },
      { name: "project_on_conflict" }
    );
  },
  get project_order_by() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get name() {
          return new InputNodeField(schema.order_by, true);
        },
        get organization() {
          return new InputNodeField(schema.organization_order_by, true);
        },
        get organization_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_history_aggregate() {
          return new InputNodeField(schema.run_aggregate_order_by, true);
        },
        get slug() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "project_order_by" }
    );
  },
  get project_pk_columns_input() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.Int, false);
        },
      },
      { name: "project_pk_columns_input" }
    );
  },
  get project_prepend_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.jsonb, true);
        },
      },
      { name: "project_prepend_input" }
    );
  },
  get project_select_column() {
    return new EnumNode({ name: "project_select_column" });
  },
  get project_set_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.jsonb, true);
        },
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get slug() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "project_set_input" }
    );
  },
  get project_update_column() {
    return new EnumNode({ name: "project_update_column" });
  },
  get query_root() {
    return new ObjectNode(
      {
        get organization() {
          return new FieldNode(
            new ArrayNode(schema.organization, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.organization_bool_exp, true);
              },
            }),
            false
          );
        },
        get organization_by_pk() {
          return new FieldNode(
            schema.organization,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get organization_invite_user() {
          return new FieldNode(
            new ArrayNode(schema.organization_invite_user, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(
                    schema.organization_invite_user_select_column,
                    true
                  ),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_invite_user_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(
                  schema.organization_invite_user_bool_exp,
                  true
                );
              },
            }),
            false
          );
        },
        get organization_invite_user_by_pk() {
          return new FieldNode(
            schema.organization_invite_user,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get project() {
          return new FieldNode(
            new ArrayNode(schema.project, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.project_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.project_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.project_bool_exp, true);
              },
            }),
            false
          );
        },
        get project_by_pk() {
          return new FieldNode(
            schema.project,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get run() {
          return new FieldNode(
            new ArrayNode(schema.run, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_bool_exp, true);
              },
            }),
            false
          );
        },
        get run_aggregate() {
          return new FieldNode(
            schema.run_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_bool_exp, true);
              },
            }),
            false
          );
        },
        get run_by_pk() {
          return new FieldNode(
            schema.run,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.bigint, false);
                },
              },
              true
            ),
            true
          );
        },
        get run_path() {
          return new FieldNode(
            new ArrayNode(schema.run_path, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_path_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_path_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_path_bool_exp, true);
              },
            }),
            false
          );
        },
        get run_path_by_pk() {
          return new FieldNode(
            schema.run_path,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.bigint, false);
                },
              },
              true
            ),
            true
          );
        },
        get user() {
          return new FieldNode(
            new ArrayNode(schema.user, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.user_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.user_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.user_bool_exp, true);
              },
            }),
            false
          );
        },
        get user_by_pk() {
          return new FieldNode(
            schema.user,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
      },
      { name: "query_root", extension: ((extensions as any) || {}).query_root }
    );
  },
  get run() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get blocks_count() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get blocks_failed() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get blocks_success() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get credits_taken() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get finished_at() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get graph() {
          return new FieldNode(
            schema.jsonb,
            new Arguments({
              get path() {
                return new ArgumentsField(schema.String, true);
              },
            }),
            true
          );
        },
        get id() {
          return new FieldNode(schema.bigint, undefined, false);
        },
        get project() {
          return new FieldNode(schema.project, undefined, false);
        },
        get project_id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get run_by_user() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get run_paths() {
          return new FieldNode(
            new ArrayNode(schema.run_path, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_path_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_path_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_path_bool_exp, true);
              },
            }),
            false
          );
        },
        get started_at() {
          return new FieldNode(schema.timestamptz, undefined, false);
        },
      },
      { name: "run", extension: ((extensions as any) || {}).run }
    );
  },
  get run_aggregate() {
    return new ObjectNode(
      {
        get aggregate() {
          return new FieldNode(schema.run_aggregate_fields, undefined, true);
        },
        get nodes() {
          return new FieldNode(
            new ArrayNode(schema.run, false),
            undefined,
            false
          );
        },
      },
      {
        name: "run_aggregate",
        extension: ((extensions as any) || {}).run_aggregate,
      }
    );
  },
  get run_aggregate_fields() {
    return new ObjectNode(
      {
        get avg() {
          return new FieldNode(schema.run_avg_fields, undefined, true);
        },
        get count() {
          return new FieldNode(
            schema.Int,
            new Arguments({
              get columns() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_select_column, true),
                  true
                );
              },
              get distinct() {
                return new ArgumentsField(schema.Boolean, true);
              },
            }),
            true
          );
        },
        get max() {
          return new FieldNode(schema.run_max_fields, undefined, true);
        },
        get min() {
          return new FieldNode(schema.run_min_fields, undefined, true);
        },
        get stddev() {
          return new FieldNode(schema.run_stddev_fields, undefined, true);
        },
        get stddev_pop() {
          return new FieldNode(schema.run_stddev_pop_fields, undefined, true);
        },
        get stddev_samp() {
          return new FieldNode(schema.run_stddev_samp_fields, undefined, true);
        },
        get sum() {
          return new FieldNode(schema.run_sum_fields, undefined, true);
        },
        get var_pop() {
          return new FieldNode(schema.run_var_pop_fields, undefined, true);
        },
        get var_samp() {
          return new FieldNode(schema.run_var_samp_fields, undefined, true);
        },
        get variance() {
          return new FieldNode(schema.run_variance_fields, undefined, true);
        },
      },
      {
        name: "run_aggregate_fields",
        extension: ((extensions as any) || {}).run_aggregate_fields,
      }
    );
  },
  get run_aggregate_order_by() {
    return new InputNode(
      {
        get avg() {
          return new InputNodeField(schema.run_avg_order_by, true);
        },
        get count() {
          return new InputNodeField(schema.order_by, true);
        },
        get max() {
          return new InputNodeField(schema.run_max_order_by, true);
        },
        get min() {
          return new InputNodeField(schema.run_min_order_by, true);
        },
        get stddev() {
          return new InputNodeField(schema.run_stddev_order_by, true);
        },
        get stddev_pop() {
          return new InputNodeField(schema.run_stddev_pop_order_by, true);
        },
        get stddev_samp() {
          return new InputNodeField(schema.run_stddev_samp_order_by, true);
        },
        get sum() {
          return new InputNodeField(schema.run_sum_order_by, true);
        },
        get var_pop() {
          return new InputNodeField(schema.run_var_pop_order_by, true);
        },
        get var_samp() {
          return new InputNodeField(schema.run_var_samp_order_by, true);
        },
        get variance() {
          return new InputNodeField(schema.run_variance_order_by, true);
        },
      },
      { name: "run_aggregate_order_by" }
    );
  },
  get run_arr_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            new ArrayNode(schema.run_insert_input, false),
            false
          );
        },
      },
      { name: "run_arr_rel_insert_input" }
    );
  },
  get run_avg_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Float, undefined, true);
        },
      },
      {
        name: "run_avg_fields",
        extension: ((extensions as any) || {}).run_avg_fields,
      }
    );
  },
  get run_avg_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_avg_order_by" }
    );
  },
  get run_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.run_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(schema.run_bool_exp, true);
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.run_bool_exp, true),
            true
          );
        },
        get blocks_blocked() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get finished_at() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
        get graph() {
          return new InputNodeField(schema.jsonb_comparison_exp, true);
        },
        get id() {
          return new InputNodeField(schema.bigint_comparison_exp, true);
        },
        get project() {
          return new InputNodeField(schema.project_bool_exp, true);
        },
        get project_id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get run_paths() {
          return new InputNodeField(schema.run_path_bool_exp, true);
        },
        get started_at() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
      },
      { name: "run_bool_exp" }
    );
  },
  get run_insert_input() {
    return new InputNode(
      {
        get graph() {
          return new InputNodeField(schema.jsonb, true);
        },
        get project() {
          return new InputNodeField(schema.project_obj_rel_insert_input, true);
        },
        get project_id() {
          return new InputNodeField(schema.Int, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.Int, true);
        },
      },
      { name: "run_insert_input" }
    );
  },
  get run_max_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get finished_at() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get id() {
          return new FieldNode(schema.bigint, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get started_at() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
      },
      {
        name: "run_max_fields",
        extension: ((extensions as any) || {}).run_max_fields,
      }
    );
  },
  get run_max_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get finished_at() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
        get started_at() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_max_order_by" }
    );
  },
  get run_min_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get finished_at() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get id() {
          return new FieldNode(schema.bigint, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get started_at() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
      },
      {
        name: "run_min_fields",
        extension: ((extensions as any) || {}).run_min_fields,
      }
    );
  },
  get run_min_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get finished_at() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
        get started_at() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_min_order_by" }
    );
  },
  get run_mutation_response() {
    return new ObjectNode(
      {
        get affected_rows() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get returning() {
          return new FieldNode(
            new ArrayNode(schema.run, false),
            undefined,
            false
          );
        },
      },
      {
        name: "run_mutation_response",
        extension: ((extensions as any) || {}).run_mutation_response,
      }
    );
  },
  get run_obj_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(schema.run_insert_input, false);
        },
      },
      { name: "run_obj_rel_insert_input" }
    );
  },
  get run_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get finished_at() {
          return new InputNodeField(schema.order_by, true);
        },
        get graph() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project() {
          return new InputNodeField(schema.project_order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
        get started_at() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_order_by" }
    );
  },
  get run_path() {
    return new ObjectNode(
      {
        get credits() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get edges() {
          return new FieldNode(
            schema.jsonb,
            new Arguments({
              get path() {
                return new ArgumentsField(schema.String, true);
              },
            }),
            false
          );
        },
        get finished_at() {
          return new FieldNode(schema.timestamptz, undefined, true);
        },
        get id() {
          return new FieldNode(schema.bigint, undefined, false);
        },
        get run() {
          return new FieldNode(schema.run, undefined, false);
        },
        get run_id() {
          return new FieldNode(schema.bigint, undefined, false);
        },
        get started_at() {
          return new FieldNode(schema.timestamptz, undefined, false);
        },
        get status() {
          return new FieldNode(schema.String, undefined, true);
        },
      },
      { name: "run_path", extension: ((extensions as any) || {}).run_path }
    );
  },
  get run_path_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.run_path_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(schema.run_path_bool_exp, true);
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.run_path_bool_exp, true),
            true
          );
        },
        get credits() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get edges() {
          return new InputNodeField(schema.jsonb_comparison_exp, true);
        },
        get finished_at() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
        get id() {
          return new InputNodeField(schema.bigint_comparison_exp, true);
        },
        get run() {
          return new InputNodeField(schema.run_bool_exp, true);
        },
        get run_id() {
          return new InputNodeField(schema.bigint_comparison_exp, true);
        },
        get started_at() {
          return new InputNodeField(schema.timestamptz_comparison_exp, true);
        },
        get status() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
      },
      { name: "run_path_bool_exp" }
    );
  },
  get run_path_order_by() {
    return new InputNode(
      {
        get credits() {
          return new InputNodeField(schema.order_by, true);
        },
        get edges() {
          return new InputNodeField(schema.order_by, true);
        },
        get finished_at() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run() {
          return new InputNodeField(schema.run_order_by, true);
        },
        get run_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get started_at() {
          return new InputNodeField(schema.order_by, true);
        },
        get status() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_path_order_by" }
    );
  },
  get run_path_pk_columns_input() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.bigint, false);
        },
      },
      { name: "run_path_pk_columns_input" }
    );
  },
  get run_path_select_column() {
    return new EnumNode({ name: "run_path_select_column" });
  },
  get run_pk_columns_input() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.bigint, false);
        },
      },
      { name: "run_pk_columns_input" }
    );
  },
  get run_select_column() {
    return new EnumNode({ name: "run_select_column" });
  },
  get run_stddev_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Float, undefined, true);
        },
      },
      {
        name: "run_stddev_fields",
        extension: ((extensions as any) || {}).run_stddev_fields,
      }
    );
  },
  get run_stddev_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_stddev_order_by" }
    );
  },
  get run_stddev_pop_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Float, undefined, true);
        },
      },
      {
        name: "run_stddev_pop_fields",
        extension: ((extensions as any) || {}).run_stddev_pop_fields,
      }
    );
  },
  get run_stddev_pop_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_stddev_pop_order_by" }
    );
  },
  get run_stddev_samp_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Float, undefined, true);
        },
      },
      {
        name: "run_stddev_samp_fields",
        extension: ((extensions as any) || {}).run_stddev_samp_fields,
      }
    );
  },
  get run_stddev_samp_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_stddev_samp_order_by" }
    );
  },
  get run_sum_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get id() {
          return new FieldNode(schema.bigint, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Int, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Int, undefined, true);
        },
      },
      {
        name: "run_sum_fields",
        extension: ((extensions as any) || {}).run_sum_fields,
      }
    );
  },
  get run_sum_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_sum_order_by" }
    );
  },
  get run_var_pop_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Float, undefined, true);
        },
      },
      {
        name: "run_var_pop_fields",
        extension: ((extensions as any) || {}).run_var_pop_fields,
      }
    );
  },
  get run_var_pop_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_var_pop_order_by" }
    );
  },
  get run_var_samp_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Float, undefined, true);
        },
      },
      {
        name: "run_var_samp_fields",
        extension: ((extensions as any) || {}).run_var_samp_fields,
      }
    );
  },
  get run_var_samp_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_var_samp_order_by" }
    );
  },
  get run_variance_fields() {
    return new ObjectNode(
      {
        get blocks_blocked() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_count() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_failed() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get blocks_success() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get credits_taken() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get project_id() {
          return new FieldNode(schema.Float, undefined, true);
        },
        get run_by_user() {
          return new FieldNode(schema.Float, undefined, true);
        },
      },
      {
        name: "run_variance_fields",
        extension: ((extensions as any) || {}).run_variance_fields,
      }
    );
  },
  get run_variance_order_by() {
    return new InputNode(
      {
        get blocks_blocked() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_count() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_failed() {
          return new InputNodeField(schema.order_by, true);
        },
        get blocks_success() {
          return new InputNodeField(schema.order_by, true);
        },
        get credits_taken() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get project_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get run_by_user() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "run_variance_order_by" }
    );
  },
  get subscription_root() {
    return new ObjectNode(
      {
        get organization() {
          return new FieldNode(
            new ArrayNode(schema.organization, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.organization_bool_exp, true);
              },
            }),
            false
          );
        },
        get organization_by_pk() {
          return new FieldNode(
            schema.organization,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get organization_invite_user() {
          return new FieldNode(
            new ArrayNode(schema.organization_invite_user, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(
                    schema.organization_invite_user_select_column,
                    true
                  ),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_invite_user_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(
                  schema.organization_invite_user_bool_exp,
                  true
                );
              },
            }),
            false
          );
        },
        get organization_invite_user_by_pk() {
          return new FieldNode(
            schema.organization_invite_user,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get project() {
          return new FieldNode(
            new ArrayNode(schema.project, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.project_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.project_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.project_bool_exp, true);
              },
            }),
            false
          );
        },
        get project_by_pk() {
          return new FieldNode(
            schema.project,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
        get run() {
          return new FieldNode(
            new ArrayNode(schema.run, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_bool_exp, true);
              },
            }),
            false
          );
        },
        get run_aggregate() {
          return new FieldNode(
            schema.run_aggregate,
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_bool_exp, true);
              },
            }),
            false
          );
        },
        get run_by_pk() {
          return new FieldNode(
            schema.run,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.bigint, false);
                },
              },
              true
            ),
            true
          );
        },
        get run_path() {
          return new FieldNode(
            new ArrayNode(schema.run_path, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_path_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.run_path_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.run_path_bool_exp, true);
              },
            }),
            false
          );
        },
        get run_path_by_pk() {
          return new FieldNode(
            schema.run_path,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.bigint, false);
                },
              },
              true
            ),
            true
          );
        },
        get user() {
          return new FieldNode(
            new ArrayNode(schema.user, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.user_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.user_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.user_bool_exp, true);
              },
            }),
            false
          );
        },
        get user_by_pk() {
          return new FieldNode(
            schema.user,
            new Arguments(
              {
                get id() {
                  return new ArgumentsField(schema.Int, false);
                },
              },
              true
            ),
            true
          );
        },
      },
      {
        name: "subscription_root",
        extension: ((extensions as any) || {}).subscription_root,
      }
    );
  },
  get timestamptz() {
    return new ScalarNode({
      name: "timestamptz",
      extension: ((extensions as any) || {}).timestamptz,
    });
  },
  get timestamptz_comparison_exp() {
    return new InputNode(
      {
        get _eq() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _gt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _gte() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _in() {
          return new InputNodeField(
            new ArrayNode(schema.timestamptz, true),
            true
          );
        },
        get _is_null() {
          return new InputNodeField(schema.Boolean, true);
        },
        get _lt() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _lte() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _neq() {
          return new InputNodeField(schema.timestamptz, true);
        },
        get _nin() {
          return new InputNodeField(
            new ArrayNode(schema.timestamptz, true),
            true
          );
        },
      },
      { name: "timestamptz_comparison_exp" }
    );
  },
  get user() {
    return new ObjectNode(
      {
        get firebase_id() {
          return new FieldNode(schema.String, undefined, false);
        },
        get id() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get name() {
          return new FieldNode(schema.String, undefined, false);
        },
        get owner_of_organizations() {
          return new FieldNode(
            new ArrayNode(schema.organization, false),
            new Arguments({
              get distinct_on() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_select_column, true),
                  true
                );
              },
              get limit() {
                return new ArgumentsField(schema.Int, true);
              },
              get offset() {
                return new ArgumentsField(schema.Int, true);
              },
              get order_by() {
                return new ArgumentsField(
                  new ArrayNode(schema.organization_order_by, true),
                  true
                );
              },
              get where() {
                return new ArgumentsField(schema.organization_bool_exp, true);
              },
            }),
            false
          );
        },
      },
      { name: "user", extension: ((extensions as any) || {}).user }
    );
  },
  get user_arr_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(
            new ArrayNode(schema.user_insert_input, false),
            false
          );
        },
        get on_conflict() {
          return new InputNodeField(schema.user_on_conflict, true);
        },
      },
      { name: "user_arr_rel_insert_input" }
    );
  },
  get user_bool_exp() {
    return new InputNode(
      {
        get _and() {
          return new InputNodeField(
            new ArrayNode(schema.user_bool_exp, true),
            true
          );
        },
        get _not() {
          return new InputNodeField(schema.user_bool_exp, true);
        },
        get _or() {
          return new InputNodeField(
            new ArrayNode(schema.user_bool_exp, true),
            true
          );
        },
        get firebase_id() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get id() {
          return new InputNodeField(schema.Int_comparison_exp, true);
        },
        get name() {
          return new InputNodeField(schema.String_comparison_exp, true);
        },
        get owner_of_organizations() {
          return new InputNodeField(schema.organization_bool_exp, true);
        },
      },
      { name: "user_bool_exp" }
    );
  },
  get user_constraint() {
    return new EnumNode({ name: "user_constraint" });
  },
  get user_insert_input() {
    return new InputNode(
      {
        get name() {
          return new InputNodeField(schema.String, true);
        },
        get owner_of_organizations() {
          return new InputNodeField(
            schema.organization_arr_rel_insert_input,
            true
          );
        },
      },
      { name: "user_insert_input" }
    );
  },
  get user_mutation_response() {
    return new ObjectNode(
      {
        get affected_rows() {
          return new FieldNode(schema.Int, undefined, false);
        },
        get returning() {
          return new FieldNode(
            new ArrayNode(schema.user, false),
            undefined,
            false
          );
        },
      },
      {
        name: "user_mutation_response",
        extension: ((extensions as any) || {}).user_mutation_response,
      }
    );
  },
  get user_obj_rel_insert_input() {
    return new InputNode(
      {
        get data() {
          return new InputNodeField(schema.user_insert_input, false);
        },
        get on_conflict() {
          return new InputNodeField(schema.user_on_conflict, true);
        },
      },
      { name: "user_obj_rel_insert_input" }
    );
  },
  get user_on_conflict() {
    return new InputNode(
      {
        get constraint() {
          return new InputNodeField(schema.user_constraint, false);
        },
        get update_columns() {
          return new InputNodeField(
            new ArrayNode(schema.user_update_column, false),
            false
          );
        },
        get where() {
          return new InputNodeField(schema.user_bool_exp, true);
        },
      },
      { name: "user_on_conflict" }
    );
  },
  get user_order_by() {
    return new InputNode(
      {
        get firebase_id() {
          return new InputNodeField(schema.order_by, true);
        },
        get id() {
          return new InputNodeField(schema.order_by, true);
        },
        get name() {
          return new InputNodeField(schema.order_by, true);
        },
      },
      { name: "user_order_by" }
    );
  },
  get user_pk_columns_input() {
    return new InputNode(
      {
        get id() {
          return new InputNodeField(schema.Int, false);
        },
      },
      { name: "user_pk_columns_input" }
    );
  },
  get user_select_column() {
    return new EnumNode({ name: "user_select_column" });
  },
  get user_set_input() {
    return new InputNode(
      {
        get name() {
          return new InputNodeField(schema.String, true);
        },
      },
      { name: "user_set_input" }
    );
  },
  get user_update_column() {
    return new EnumNode({ name: "user_update_column" });
  },
};

lazyGetters(schema);
