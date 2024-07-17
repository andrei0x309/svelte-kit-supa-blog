-- DROP FUNCTION inc_blog_tag_count;

CREATE OR REPLACE FUNCTION inc_blog_tag_count(tags INT4[]) 
RETURNS BOOLEAN AS
$$
BEGIN
UPDATE fsk_blog_tag 
   SET "count" = "count" + 1
	WHERE fsk_blog_tag.id = ANY(tags);
RETURN true;
END;
$$
LANGUAGE 'plpgsql';

