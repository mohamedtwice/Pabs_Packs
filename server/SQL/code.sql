CREATE EXTENSION pgcrypto;

CREATE TABLE users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL
);

CREATE TABLE inventory (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item text NOT NULL,
  vendor_id text NOT NULL,
  number_on_hand integer NOT NULL,
  comments text NOT NULL,
  low_number integer NOT NULL ,
  type text NOT NULL
);


SELECT * FROM inventory;

DROP TABLE users;

DROP TABLE inventory;

INSERT INTO inventory (item, vendor_id, number_on_hand, comments, low_number, type) VALUES
    ('jkdsfjkd', 12, 110, 'Good stuff man', 1, 'merchandise'),
    ('fsdf', 1, 110, 'whoooa', 23, 'backpack');

CREATE TABLE partners (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  address VARCHAR(120) NOT NULL,
  phone_number varchar(120) NOT NULL,
  comments text NOT NULL,
  contact_name text NOT NULL
 );

 SELECT * FROM partners;

 CREATE TABLE backpack_goal (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal integer NOT NULL,
  year integer NOT NULL
 );

 SELECT * FROM backpack_goal;
