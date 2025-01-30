CREATE TABLE public.users (
	id int4 DEFAULT nextval('user_sequence'::regclass) NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	"token" varchar NULL,
	updated_at timestamp NULL,
	last_login timestamp NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	login_status varchar NULL,
	status_code varchar NULL,
	created_by varchar NOT NULL,
	url_image varchar NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);