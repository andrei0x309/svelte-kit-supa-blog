CREATE OR REPLACE FUNCTION get_tags(alltags BOOL) 
RETURNS TABLE("count" bigint, "tag_id" int, "name" varchar) AS
$$
BEGIN
RETURN QUERY 
SELECT COUNT(fsk_cert_tags.tag_id), fsk_cert_tags.tag_id, fsk_cert_tag_type.name
FROM "public"."fsk_cert_tags"
JOIN fsk_cert_tag_type
ON fsk_cert_tags.tag_id = fsk_cert_tag_type.id
GROUP BY fsk_cert_tags.tag_id, fsk_cert_tag_type.name
ORDER BY COUNT(fsk_cert_tags.tag_id) DESC
LIMIT CASE WHEN NOT alltags THEN 12 END;
END;
$$
LANGUAGE 'plpgsql';