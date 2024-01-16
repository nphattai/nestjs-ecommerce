import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1705400985262 implements MigrationInterface {
  name = 'Init1705400985262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ms_product"."product-inventory" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "quantity" integer NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_471468a7ad2b76238ca1244ce4e" UNIQUE ("pid"), CONSTRAINT "PK_d0c7463a204afafc816b6633148" PRIMARY KEY ("id")); COMMENT ON COLUMN "ms_product"."product-inventory"."pid" IS 'Id is provided to the client'`
    );
    await queryRunner.query(
      `CREATE TABLE "ms_product"."product" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "sku" character varying, "price" integer NOT NULL, "category_id" integer NOT NULL, "inventory_id" integer NOT NULL, "discount_id" integer, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_8020ecd0cd79d4f3be1bb41d746" UNIQUE ("pid"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")); COMMENT ON COLUMN "ms_product"."product"."pid" IS 'Id is provided to the client'`
    );
    await queryRunner.query(
      `CREATE TABLE "ms_product"."product-category" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_929979fb35b99af8957b651506a" UNIQUE ("pid"), CONSTRAINT "PK_ac96ed58add04e431244798a69c" PRIMARY KEY ("id")); COMMENT ON COLUMN "ms_product"."product-category"."pid" IS 'Id is provided to the client'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ms_product"."product-category"`);
    await queryRunner.query(`DROP TABLE "ms_product"."product"`);
    await queryRunner.query(`DROP TABLE "ms_product"."product-inventory"`);
  }
}
