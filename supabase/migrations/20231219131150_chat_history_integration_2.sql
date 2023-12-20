set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_chats(p_user_id uuid)
 RETURNS TABLE(chat_id uuid, chat_created_at timestamp with time zone, user_id uuid, temp real, max_length_tokens numeric, top_p real, messages_id uuid, message_created_at timestamp with time zone, message_content text, role role)
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
    m.messages_id, 
    m.created_at as message_created_at, 
    m.message_content, 
    m.role
  FROM 
    public.chats c
  JOIN 
    public.messages m ON c.chat_id = m.chat_id
  WHERE 
    c.user_id = p_user_id;
END;
$function$
;


