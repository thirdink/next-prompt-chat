alter type "public"."role"
rename to "role__old_version_to_be_dropped";
create type "public"."role" as enum ('assistant', 'user', 'function', 'system');
alter table "public"."messages"
alter column role type "public"."role" using role::text::"public"."role";
drop type "public"."role__old_version_to_be_dropped" cascade;