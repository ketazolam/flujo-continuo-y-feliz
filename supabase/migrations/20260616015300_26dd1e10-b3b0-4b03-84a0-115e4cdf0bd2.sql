
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.increment_programa_view(uuid, text) FROM authenticated, public;
-- keep anon execute so anonymous visitors can record views
GRANT EXECUTE ON FUNCTION public.increment_programa_view(uuid, text) TO anon;
