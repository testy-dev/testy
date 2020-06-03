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
    slug text NOT NULL,
    graph jsonb
);
CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;
CREATE TABLE public.run (
    id bigint NOT NULL,
    run_by_user integer NOT NULL,
    project_id integer NOT NULL,
    graph jsonb,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    finished_at timestamp with time zone
);
CREATE SEQUENCE public.run_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.run_history_id_seq OWNED BY public.run.id;
CREATE TABLE public.run_path (
    id bigint NOT NULL,
    edges jsonb NOT NULL,
    credits integer DEFAULT 0 NOT NULL,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    finished_at timestamp with time zone,
    run_id bigint NOT NULL,
    blocks_count integer DEFAULT 0 NOT NULL,
    blocks_success integer DEFAULT 0 NOT NULL,
    blocks_failed integer DEFAULT 0 NOT NULL,
    blocks_blocked integer DEFAULT 0 NOT NULL
);
CREATE SEQUENCE public.run_path_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.run_path_id_seq OWNED BY public.run_path.id;
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
ALTER TABLE ONLY public.run ALTER COLUMN id SET DEFAULT nextval('public.run_history_id_seq'::regclass);
ALTER TABLE ONLY public.run_path ALTER COLUMN id SET DEFAULT nextval('public.run_path_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
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
    ADD CONSTRAINT project_organization_id_name_key UNIQUE (organization_id, name);
ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_organization_id_slug_key UNIQUE (organization_id, slug);
ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.run
    ADD CONSTRAINT run_history_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.run_path
    ADD CONSTRAINT run_path_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_firebase_id_key UNIQUE (firebase_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organization_invite_user
    ADD CONSTRAINT organization_invite_user_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_owner_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_organization_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.run
    ADD CONSTRAINT project_run_history_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.run_path
    ADD CONSTRAINT run_path_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.run(id) ON UPDATE RESTRICT ON DELETE CASCADE;
