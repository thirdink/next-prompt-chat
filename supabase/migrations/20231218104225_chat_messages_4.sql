drop function if exists "public"."insert_chat_messages"(chat_id uuid, message_content text, role role, temp double precision, max_length_tokens integer, top_p double precision);

alter type "public"."role" rename to "role__old_version_to_be_dropped";

create type "public"."role" as enum ('assistant', 'user', 'function', 'system');

alter table "public"."messages" alter column role type "public"."role" using role::text::"public"."role";

drop type "public"."role__old_version_to_be_dropped";


