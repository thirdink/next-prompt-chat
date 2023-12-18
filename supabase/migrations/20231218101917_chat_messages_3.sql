revoke delete on table "public"."notes" from "anon";

revoke insert on table "public"."notes" from "anon";

revoke references on table "public"."notes" from "anon";

revoke select on table "public"."notes" from "anon";

revoke trigger on table "public"."notes" from "anon";

revoke truncate on table "public"."notes" from "anon";

revoke update on table "public"."notes" from "anon";

revoke delete on table "public"."notes" from "authenticated";

revoke insert on table "public"."notes" from "authenticated";

revoke references on table "public"."notes" from "authenticated";

revoke select on table "public"."notes" from "authenticated";

revoke trigger on table "public"."notes" from "authenticated";

revoke truncate on table "public"."notes" from "authenticated";

revoke update on table "public"."notes" from "authenticated";

revoke delete on table "public"."notes" from "service_role";

revoke insert on table "public"."notes" from "service_role";

revoke references on table "public"."notes" from "service_role";

revoke select on table "public"."notes" from "service_role";

revoke trigger on table "public"."notes" from "service_role";

revoke truncate on table "public"."notes" from "service_role";

revoke update on table "public"."notes" from "service_role";

alter table "public"."chats" drop constraint "chats_messages_id_fkey";

alter table "public"."notes" drop constraint "notes_pkey";

drop index if exists "public"."notes_pkey";

drop table "public"."notes";

alter type "public"."role" rename to "role__old_version_to_be_dropped";

create type "public"."role" as enum ('assistant', 'user');

alter table "public"."messages" alter column role type "public"."role" using role::text::"public"."role";

drop type "public"."role__old_version_to_be_dropped";

alter table "public"."chats" drop column "messages_id";

alter table "public"."messages" add column "chat_id" uuid;

drop sequence if exists "public"."notes_id_seq";

alter table "public"."messages" add constraint "messages_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES chats(chat_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_chat_id_fkey";

set check_function_bodies = off;

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


