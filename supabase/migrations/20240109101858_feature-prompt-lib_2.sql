alter table "public"."categories" add column "user_id" uuid not null default auth.uid();

alter table "public"."prompt" drop column "message_content";

alter table "public"."prompt" add column "title" text;

alter table "public"."prompt" alter column "user_id" set not null;

create policy "Enable delete for users based on user_id"
on "public"."categories"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."categories"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for users based on user_id"
on "public"."categories"
as permissive
for update
to public
using ((auth.uid() = user_id))
with check (true);


create policy "Enable read access for all users"
on "public"."categories"
as permissive
for select
to public
using (true);



