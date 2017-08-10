CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  item varchar(80),
  vendor_name text,
  number_on_hand int,
  low_number int,
  type varchar(80),
  comments text
);

INSERT INTO inventory (item, vendor_name, number_on_hand, low_number, type, comments)
VALUES ('Item 1', 2, 30, 20, 'Merch', 'comments for 1'),
('Item 2', 1, 30, 20, 'Merch', 'comments for 2'),
('Item 3', 1, 50, 10, 'Pack', 'comments for 3'),
('Item 4', 3, 100, 30, 'Pack', 'comments for 4'),
('Item 5', 2, 100, 30, 'Pack', 'comments for 5'),
('Item 6', 4, 100, 30, 'Pack', 'comments for 6');

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
  event_time varchar(80),
  event_type text,
  partner_name integer,
  packs_promised integer,
  packs_made integer,
  comments text
);
--
INSERT INTO events (event_date, event_time, event_type, partner_name, packs_promised, packs_made, type, comments)
VALUES ('Item 1', 2, 30, 20, 'Merch', 'comments for 1')

CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  partner_name text,
  partner_address varchar(120),
  partner_phone varchar(80),
  partner_contact text
);

INSERT INTO partners (partner_name, partner_address, partner_phone, partner_contact)
VALUES ('Gillete', '123 Main St. Minneapolis, MN 55125', '612-123-1234', 'Joe Schmoe'),
('Childrens Hospital', '123 Main St. Minneapolis, MN 55125', '612-123-1234', 'Joe Schmoe')

CREATE TABLE vendor (
  id SERIAL PRIMARY KEY,
  vendor_name varchar(80),
  vendor_phone varchar(80),
  vendor_email varchar(80),
  vendor_address varchar(80)
  );

INSERT INTO vendor (vendor_name, vendor_phone, vendor_email, vendor_address)
VALUES ('Vendor 1', '612-123-1234', 'vendor2@vendor.com', '123 Main St. Minneapolis, MN 55125'),
('Vendor 2', '612-123-1234', 'vendor2@vendor.com', '123 Main St. Minneapolis, MN 55125');
