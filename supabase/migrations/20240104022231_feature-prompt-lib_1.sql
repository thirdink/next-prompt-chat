create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null
);


alter table "public"."categories" enable row level security;

create table "public"."prompt" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid default auth.uid(),
    "input" text,
    "instructions" text,
    "message_content" text,
    "categories_id" uuid
);


alter table "public"."prompt" enable row level security;

create table "public"."tags" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "prompt_id" uuid not null
);


alter table "public"."tags" enable row level security;

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX prompt_pkey ON public.prompt USING btree (id);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."prompt" add constraint "prompt_pkey" PRIMARY KEY using index "prompt_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."prompt" add constraint "prompt_categories_id_fkey" FOREIGN KEY (categories_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."prompt" validate constraint "prompt_categories_id_fkey";

alter table "public"."tags" add constraint "tags_prompt_id_fkey" FOREIGN KEY (prompt_id) REFERENCES prompt(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."tags" validate constraint "tags_prompt_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_all_chat_messages_for_user(p_user_id uuid)
 RETURNS TABLE(chat_id uuid, chat_created_at timestamp with time zone, user_id uuid, temp real, max_length_tokens numeric, top_p real, title text, messages jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY 
  SELECT 
    c.chat_id, 
    c.created_at as chat_created_at, 
    c.user_id, 
    c.temp, 
    c.max_length_tokens, 
    c.top_p, 
    c.title,
    jsonb_agg(
      jsonb_build_object(
        'messages_id', m.messages_id,
        'message_created_at', m.created_at,
        'message_content', m.message_content,
        'role', m.role
      )
    ORDER BY m.created_at
    ) as messages
  FROM 
    public.chats c
  JOIN 
    public.messages m ON c.chat_id = m.chat_id
  WHERE 
    c.user_id = p_user_id
  GROUP BY 
    c.chat_id, 
    c.created_at, 
    c.user_id, 
    c.temp, 
    c.max_length_tokens, 
    c.top_p,
    c.title
  ORDER BY 
  c.created_at DESC;
END;
$function$
;

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."prompt" to "anon";

grant insert on table "public"."prompt" to "anon";

grant references on table "public"."prompt" to "anon";

grant select on table "public"."prompt" to "anon";

grant trigger on table "public"."prompt" to "anon";

grant truncate on table "public"."prompt" to "anon";

grant update on table "public"."prompt" to "anon";

grant delete on table "public"."prompt" to "authenticated";

grant insert on table "public"."prompt" to "authenticated";

grant references on table "public"."prompt" to "authenticated";

grant select on table "public"."prompt" to "authenticated";

grant trigger on table "public"."prompt" to "authenticated";

grant truncate on table "public"."prompt" to "authenticated";

grant update on table "public"."prompt" to "authenticated";

grant delete on table "public"."prompt" to "service_role";

grant insert on table "public"."prompt" to "service_role";

grant references on table "public"."prompt" to "service_role";

grant select on table "public"."prompt" to "service_role";

grant trigger on table "public"."prompt" to "service_role";

grant truncate on table "public"."prompt" to "service_role";

grant update on table "public"."prompt" to "service_role";

grant delete on table "public"."tags" to "anon";

grant insert on table "public"."tags" to "anon";

grant references on table "public"."tags" to "anon";

grant select on table "public"."tags" to "anon";

grant trigger on table "public"."tags" to "anon";

grant truncate on table "public"."tags" to "anon";

grant update on table "public"."tags" to "anon";

grant delete on table "public"."tags" to "authenticated";

grant insert on table "public"."tags" to "authenticated";

grant references on table "public"."tags" to "authenticated";

grant select on table "public"."tags" to "authenticated";

grant trigger on table "public"."tags" to "authenticated";

grant truncate on table "public"."tags" to "authenticated";

grant update on table "public"."tags" to "authenticated";

grant delete on table "public"."tags" to "service_role";

grant insert on table "public"."tags" to "service_role";

grant references on table "public"."tags" to "service_role";

grant select on table "public"."tags" to "service_role";

grant trigger on table "public"."tags" to "service_role";

grant truncate on table "public"."tags" to "service_role";

grant update on table "public"."tags" to "service_role";

create policy "Enable insert for users based on user_id"
on "public"."prompt"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check (true);



