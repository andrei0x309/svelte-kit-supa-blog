-- DROP FUNCTION rem_blog_tag_posts

CREATE OR REPLACE FUNCTION rem_blog_tag_posts(tag INT4) 
RETURNS BOOLEAN AS
$$
BEGIN
UPDATE fsk_blog_posts 
   SET tag_ids = array_remove(tag_ids, tag)
	WHERE tag = ANY(tag_ids);
RETURN true;
END;
$$
LANGUAGE 'plpgsql';
