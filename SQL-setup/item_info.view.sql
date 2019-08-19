CREATE VIEW item_info AS 
SELECT 
i.item_id as id,
i.name as name,
i.description as description,
i.materials as materials,
i.price as price,
i.quantity as quantity,
array_agg(c.name) AS categories
FROM items as i LEFT JOIN
items_categories USING (item_id) LEFT JOIN
categories as c USING (category_id)
GROUP BY i.item_id;