CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "username" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "first_name" varchar,
  "last_name" varchar,
  "phone" varchar,
  "email" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_address" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "address" varchar,
  "city" varchar,
  "postal_code" varchar,
  "country" varchar,
  "phone" varchar,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "payment_provider" (
  "id" int PRIMARY KEY,
  "active" boolean,
  "name" varchar,
  "payment_type" int,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "payment_type" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "user_payment" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "provider" int,
  "account_no" varchar,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "product" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "desc" varchar,
  "SKU" varchar,
  "price" decimal,
  "category_id" int,
  "inventory_id" int,
  "discount_id" int,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "product_category" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "desc" varchar,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "product_inventory" (
  "id" int PRIMARY KEY,
  "quantity" int,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "discount" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "desc" varchar,
  "discount_percent" decimal,
  "active" boolean,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "shopping_session" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "total" decimal,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "cart_item" (
  "id" int PRIMARY KEY,
  "session_id" int,
  "product_id" int,
  "quantity" int,
  "deleted_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "order_detail" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "total" decimal,
  "payment_id" int,
  "deleted_at" timestamp,
  "canceled_at" timestamp,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "order_item" (
  "id" int PRIMARY KEY,
  "order_id" int,
  "product_id" int,
  "quantity" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "payment_detail" (
  "id" int PRIMARY KEY,
  "order_id" int,
  "amount" decimal,
  "user_payment_id" int,
  "status" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "user_address" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "payment_provider" ADD FOREIGN KEY ("payment_type") REFERENCES "payment_type" ("id");

ALTER TABLE "user_payment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_payment" ADD FOREIGN KEY ("provider") REFERENCES "payment_provider" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "product_category" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("inventory_id") REFERENCES "product_inventory" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("discount_id") REFERENCES "discount" ("id");

ALTER TABLE "shopping_session" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("session_id") REFERENCES "shopping_session" ("id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "order_detail" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order_detail" ADD FOREIGN KEY ("payment_id") REFERENCES "payment_detail" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order_detail" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "payment_detail" ADD FOREIGN KEY ("user_payment_id") REFERENCES "user_payment" ("id");
