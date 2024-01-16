import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelation1705401837728 implements MigrationInterface {
  name = 'AddRelation1705401837728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ms_product"."discount" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "discount_percent" integer NOT NULL, "active" boolean NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_32705f2e804faba320c99ecb319" UNIQUE ("pid"), CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id")); COMMENT ON COLUMN "ms_product"."discount"."pid" IS 'Id is provided to the client'`
    );
    await queryRunner.query(
      `ALTER TABLE "ms_product"."product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "ms_product"."product-category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ms_product"."product" ADD CONSTRAINT "FK_84e9362e0a5bf063e561d9452ba" FOREIGN KEY ("inventory_id") REFERENCES "ms_product"."product-inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ms_product"."product" ADD CONSTRAINT "FK_8cfd00cd6b9904ee7c5a45ffb3f" FOREIGN KEY ("discount_id") REFERENCES "ms_product"."discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ms_product"."product" DROP CONSTRAINT "FK_8cfd00cd6b9904ee7c5a45ffb3f"`);
    await queryRunner.query(`ALTER TABLE "ms_product"."product" DROP CONSTRAINT "FK_84e9362e0a5bf063e561d9452ba"`);
    await queryRunner.query(`ALTER TABLE "ms_product"."product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
    await queryRunner.query(`DROP TABLE "ms_product"."discount"`);
  }
}
