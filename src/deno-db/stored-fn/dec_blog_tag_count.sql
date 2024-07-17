-- DROP FUNCTION dec_blog_tag_count;

CREATE OR REPLACE FUNCTION dec_blog_tag_count(tags INT4[]) 
RETURNS BOOLEAN AS
$$
BEGIN
UPDATE fsk_blog_tag 
   SET "count" = "count" - 1
	WHERE fsk_blog_tag.id = ANY(tags)
  AND "count" > 0;
RETURN true;
END;
$$
LANGUAGE 'plpgsql';















