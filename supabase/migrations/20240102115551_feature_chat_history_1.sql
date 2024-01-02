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


