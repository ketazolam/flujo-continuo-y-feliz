UPDATE productos SET whatsapp_url = REPLACE(whatsapp_url, '573000000000', '5491167391965') WHERE whatsapp_url LIKE '%573000000000%';

-- Also update the contacto_config default
UPDATE contacto_config SET whatsapp = '+54 9 1167391965';