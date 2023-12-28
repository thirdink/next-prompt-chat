drop function if exists "public"."get_user_chats"(p_user_id uuid);

drop function if exists "public"."insert_chat_message"(p_chat_id uuid, message_content text, instructions text, role role, temp double precision, max_length_tokens integer, top_p double precision, title text);

drop function if exists "public"."insert_chat_messages"(p_chat_id uuid, message_content text, instructions text, role role, temp double precision, max_length_tokens integer, top_p double precision);

drop function if exists "public"."get_all_chat_messages_for_user"(p_user_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_chat_messages(p_chat_id uuid, message_content text, instructions text, role role, temp double precision, max_length_tokens integer, top_p double precision, title text)
 RETURNS SETOF chats
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO public.chats (chat_id, temp, top_p, max_length_tokens,title)
    VALUES (p_chat_id, temp, top_p, max_length_tokens,title)
    ON CONFLICT (chat_id) 
  DO UPDATE SET
    temp = EXCLUDED.temp,
    top_p = EXCLUDED.top_p,
    max_length_tokens = EXCLUDED.max_length_tokens,
    title = EXCLUDED.title;

  INSERT INTO public.messages (role, message_content,instructions, chat_id)
    VALUES (role, message_content,instructions, p_chat_id);

  RETURN QUERY SELECT * FROM public.chats
    WHERE public.chats.chat_id = p_chat_id;
END;
$function$
;

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
    c.title;
END;
$function$
;


