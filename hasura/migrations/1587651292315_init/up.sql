CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.command (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    parent_id uuid,
    project_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.command_run_history (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    command_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    running_time integer NOT NULL,
    missconfiguration boolean NOT NULL,
    fail boolean NOT NULL
);
CREATE TABLE public.organization (
    id integer NOT NULL,
    name character varying NOT NULL,
    owner_id integer NOT NULL,
    slug text NOT NULL,
    CONSTRAINT "Name is longer than 2 characters and shorter than 50" CHECK (((char_length((name)::text) > 2) AND (char_length((name)::text) <= 50)))
);
CREATE SEQUENCE public.organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.organization_id_seq OWNED BY public.organization.id;
CREATE TABLE public.organization_invite_user (
    id integer NOT NULL,
    email text NOT NULL,
    organization_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    invite_token uuid DEFAULT public.gen_random_uuid() NOT NULL
);
CREATE SEQUENCE public.organization_invite_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.organization_invite_user_id_seq OWNED BY public.organization_invite_user.id;
CREATE TABLE public.project (
    id integer NOT NULL,
    name character varying NOT NULL,
    organization_id integer NOT NULL,
    slug text NOT NULL
);
CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;
CREATE TABLE public.project_run_history (
    id integer NOT NULL,
    run_by_user integer NOT NULL,
    project_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    commands_done integer NOT NULL,
    commands_failed integer NOT NULL,
    commands_total integer NOT NULL
);
CREATE SEQUENCE public.run_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.run_history_id_seq OWNED BY public.project_run_history.id;
CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    firebase_id character varying NOT NULL
);
CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organization_id_seq'::regclass);
ALTER TABLE ONLY public.organization_invite_user ALTER COLUMN id SET DEFAULT nextval('public.organization_invite_user_id_seq'::regclass);
ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);
ALTER TABLE ONLY public.project_run_history ALTER COLUMN id SET DEFAULT nextval('public.run_history_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
ALTER TABLE ONLY public.command
    ADD CONSTRAINT command_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.command_run_history
    ADD CONSTRAINT command_run_history_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organization_invite_user
    ADD CONSTRAINT organization_invite_user_email_key UNIQUE (email);
ALTER TABLE ONLY public.organization_invite_user
    ADD CONSTRAINT organization_invite_user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_name_key UNIQUE (name);
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_organization_id_slug_key UNIQUE (organization_id, slug);
ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.project_run_history
    ADD CONSTRAINT run_history_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_firebase_id_key UNIQUE (firebase_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_command_updated_at BEFORE UPDATE ON public.command FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_command_updated_at ON public.command IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.command
    ADD CONSTRAINT command_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.command(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.command
    ADD CONSTRAINT command_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.command_run_history
    ADD CONSTRAINT command_run_history_command_id_fkey FOREIGN KEY (command_id) REFERENCES public.command(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.organization_invite_user
    ADD CONSTRAINT organization_invite_user_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_owner_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_organization_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_run_history
    ADD CONSTRAINT project_run_history_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(id) ON UPDATE RESTRICT ON DELETE CASCADE;
