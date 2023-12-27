drop function if exists "public"."insert_chat_message"(chat_id uuid, message_content text, instructions text, role role, temp double precision, max_length_tokens integer, top_p double precision, title text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_chat_message(p_chat_id uuid, message_content text, instructions text, role role, temp double precision, max_length_tokens integer, top_p double precision)
 RETURNS SETOF chats
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO public.chats (chat_id, temp, top_p, max_length_tokens)
    VALUES (p_chat_id, temp, top_p, max_length_tokens)
    ON CONFLICT (chat_id) 
  DO UPDATE SET
    temp = EXCLUDED.temp,
    top_p = EXCLUDED.top_p,
    max_length_tokens = EXCLUDED.max_length_tokens;

  INSERT INTO public.messages (role, message_content,instructions, chat_id)
    VALUES (role, message_content,instructions, p_chat_id);

  RETURN QUERY SELECT * FROM public.chats
    WHERE public.chats.chat_id = p_chat_id;
END;
$function$
;


