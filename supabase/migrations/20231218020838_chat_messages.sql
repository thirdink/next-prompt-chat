create type "public"."role" as enum ('assistant', 'user');

create table "public"."chats" (
    "chat_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default auth.uid(),
    "temp" real,
    "max_length_tokens" numeric,
    "top_p" real,
    "messages_id" uuid not null
);


alter table "public"."chats" enable row level security;

create table "public"."messages" (
    "messages_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "message_content" text,
    "role" role,
    "user_id" uuid not null default auth.uid()
);


alter table "public"."messages" enable row level security;

CREATE UNIQUE INDEX chats_pkey ON public.chats USING btree (chat_id);

CREATE UNIQUE INDEX messages_messages_id_key ON public.messages USING btree (messages_id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (messages_id);

alter table "public"."chats" add constraint "chats_pkey" PRIMARY KEY using index "chats_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."chats" add constraint "chats_max_length_tokens_check" CHECK (((max_length_tokens >= (0)::numeric) AND (max_length_tokens <= (4000)::numeric))) not valid;

alter table "public"."chats" validate constraint "chats_max_length_tokens_check";

alter table "public"."chats" add constraint "chats_messages_id_fkey" FOREIGN KEY (messages_id) REFERENCES messages(messages_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."chats" validate constraint "chats_messages_id_fkey";

alter table "public"."chats" add constraint "chats_temp_check" CHECK (((temp >= (0)::double precision) AND (temp <= (1.0)::double precision))) not valid;

alter table "public"."chats" validate constraint "chats_temp_check";

alter table "public"."chats" add constraint "chats_top_p_check" CHECK (((top_p >= (0)::double precision) AND (top_p <= (1.0)::double precision))) not valid;

alter table "public"."chats" validate constraint "chats_top_p_check";

alter table "public"."messages" add constraint "messages_messages_id_key" UNIQUE using index "messages_messages_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.hello()
 RETURNS text
 LANGUAGE sql
AS $function$
  select 'hello world';
  $function$
;

CREATE OR REPLACE FUNCTION public.insert_chat_messages(chat_id uuid, message_content text, role role, temp double precision, max_length_tokens integer, top_p double precision)
 RETURNS SETOF chats
 LANGUAGE plpgsql
AS $function$
declare
    m_id uuid;
  begin
    insert into messages (role,message_content)
      values (role,message_content)
    returning messages_id into m_id;
    insert into chats (chat_id,m_id,temp,top_p,max_length_tokens)
      values (chat_id,m_id,temp,top_p,max_length_tokens);
    return query select * from chats
      where chats.chat_id = chat_id;

  end;
$function$
;

grant delete on table "public"."chats" to "anon";

grant insert on table "public"."chats" to "anon";

grant references on table "public"."chats" to "anon";

grant select on table "public"."chats" to "anon";

grant trigger on table "public"."chats" to "anon";

grant truncate on table "public"."chats" to "anon";

grant update on table "public"."chats" to "anon";

grant delete on table "public"."chats" to "authenticated";

grant insert on table "public"."chats" to "authenticated";

grant references on table "public"."chats" to "authenticated";

grant select on table "public"."chats" to "authenticated";

grant trigger on table "public"."chats" to "authenticated";

grant truncate on table "public"."chats" to "authenticated";

grant update on table "public"."chats" to "authenticated";

grant delete on table "public"."chats" to "service_role";

grant insert on table "public"."chats" to "service_role";

grant references on table "public"."chats" to "service_role";

grant select on table "public"."chats" to "service_role";

grant trigger on table "public"."chats" to "service_role";

grant truncate on table "public"."chats" to "service_role";

grant update on table "public"."chats" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

create policy "Enable actions for users based on user_id"
on "public"."chats"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check (true);


create policy "Enable insert for users based on user_id"
on "public"."messages"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check (true);



