set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_chat_messages(chat_id uuid, message_content text, role role, temp double precision, max_length_tokens integer, top_p double precision)
 RETURNS SETOF chats
 LANGUAGE plpgsql
AS $function$
  begin
    insert into public.messages (role,message_content,chat_id)
      values (role,message_content,chat_id);
    insert into public.chats (chat_id,temp,top_p,max_length_tokens)
      values (chat_id,temp,top_p,max_length_tokens)
      ON CONFLICT (chat_id) 
    DO 
      UPDATE SET
    temp = EXCLUDED.temp,
    top_p = EXCLUDED.top_p,
    max_length_tokens = EXCLUDED.max_length_tokens;
    return query select * from public.chats
      where public.chats.chat_id = chat_id and public.messages.chat_id = chat_id;

  end;
$function$
;


