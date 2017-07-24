CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  item varchar(80),
  vendor_id int,
  number_on_hand int,
  low_number int,
  type varchar(80),
  comments text
);

INSERT INTO inventory (item,z	 vendor_id, onhand, lownumber, type, notes)
VALUES ('Item 1', 2, 30, 20, 'Merch', 'comments for 1'),
('Item 2', 1, 30, 20, 'Merch', 'comments for 2'),
('Item 3', 1, 50, 10, 'Pack', 'comments for 3'),
('Item 4', 3, 100, 30, 'Pack', 'comments for 4'),
('Item 5', 2, 100, 30, 'Pack', 'comments for 5'),
('Item 6', 4, 100, 30, 'Pack', 'comments for 6')

CREATE TABLE backpack_goal (
  id SERIAL PRIMARY KEY,
  annual_goal varchar(80),
  year varchar(80)
  );
  
INSERT INTO backpack_goal (annual_goal, year)
VALUES ('500', '2015'),
('1500', '2016'),
('2000', '2017')

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  event_date date,
  event_time time,
  event_type varchar(80),
  partner_id int,
  packs_promised int,
  packs_made int,
  comments text
);
