create view item_category_summary as 
select
i.item_id as item_id,
array_agg(c.name order by category_id) as categories,
array_agg(c.category_id order by category_id) as category_ids
from items_categories as i join
categories as c using (category_id)
group by i.item_id;

create view item_image_summary as 
select
i.item_id as item_id,
array_agg(img.url order by img.image_id) as urls,
array_agg(img.image_id order by img.image_id) as image_ids
from items_images as i join
images as img using (image_id)
group by i.item_id;

CREATE VIEW item_info AS 
SELECT 
i.item_id as id,
i.name as name,
i.description as description,
i.materials as materials,
i.price as price,
i.quantity as quantity,
c.category_ids as category_ids,
c.categories as categories,
img.image_ids as image_ids,
img.urls as images
FROM items as i
left join
item_category_summary as c using (item_id)
left join
item_image_summary as img using (item_id)
GROUP BY i.item_id, c.category_ids, c.categories, img.image_ids, img.urls ;