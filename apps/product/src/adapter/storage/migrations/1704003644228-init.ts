import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1704003644228 implements MigrationInterface {
    name = 'Init1704003644228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_7311085e7abaaedf39f5019c35b" UNIQUE ("pid"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")); COMMENT ON COLUMN "products"."pid" IS 'Id is provided to the client'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
