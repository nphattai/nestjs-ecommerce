import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1704814850607 implements MigrationInterface {
    name = 'Init1704814850607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ms_user"."user" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "password" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "phone" character varying, "email" character varying NOT NULL, CONSTRAINT "UQ_14a61c4b4ae3c0ef59542e4cbc7" UNIQUE ("pid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "ms_user"."user"."pid" IS 'Id is provided to the client'; COMMENT ON COLUMN "ms_user"."user"."password" IS 'Password'; COMMENT ON COLUMN "ms_user"."user"."first_name" IS 'First Name'; COMMENT ON COLUMN "ms_user"."user"."last_name" IS 'Last Name'; COMMENT ON COLUMN "ms_user"."user"."phone" IS 'Phone'; COMMENT ON COLUMN "ms_user"."user"."email" IS 'Email'`);
        await queryRunner.query(`CREATE TABLE "ms_user"."user_address" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "user_id" integer NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" character varying NOT NULL, "country" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_b39ecc194f87d479bc5e1c90ac5" UNIQUE ("pid"), CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id")); COMMENT ON COLUMN "ms_user"."user_address"."pid" IS 'Id is provided to the client'; COMMENT ON COLUMN "ms_user"."user_address"."user_id" IS 'User ID'; COMMENT ON COLUMN "ms_user"."user_address"."address" IS 'Address'; COMMENT ON COLUMN "ms_user"."user_address"."city" IS 'City'; COMMENT ON COLUMN "ms_user"."user_address"."postal_code" IS 'Postal Code'; COMMENT ON COLUMN "ms_user"."user_address"."country" IS 'Country'; COMMENT ON COLUMN "ms_user"."user_address"."phone" IS 'Phone'`);
        await queryRunner.query(`CREATE TABLE "ms_user"."user_payment" ("pid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "user_id" integer NOT NULL, "provider" integer NOT NULL, "account_no" character varying NOT NULL, CONSTRAINT "UQ_83ebd001192768cd01db5b4cf64" UNIQUE ("pid"), CONSTRAINT "PK_57db108902981ff1f5fcc2f2336" PRIMARY KEY ("id")); COMMENT ON COLUMN "ms_user"."user_payment"."pid" IS 'Id is provided to the client'; COMMENT ON COLUMN "ms_user"."user_payment"."user_id" IS 'User ID'; COMMENT ON COLUMN "ms_user"."user_payment"."provider" IS 'Provider'; COMMENT ON COLUMN "ms_user"."user_payment"."account_no" IS 'Account No'`);
        await queryRunner.query(`ALTER TABLE "ms_user"."user_address" ADD CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53" FOREIGN KEY ("user_id") REFERENCES "ms_user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ms_user"."user_payment" ADD CONSTRAINT "FK_6efb9a2e661adeeb884020052ba" FOREIGN KEY ("user_id") REFERENCES "ms_user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ms_user"."user_payment" DROP CONSTRAINT "FK_6efb9a2e661adeeb884020052ba"`);
        await queryRunner.query(`ALTER TABLE "ms_user"."user_address" DROP CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53"`);
        await queryRunner.query(`DROP TABLE "ms_user"."user_payment"`);
        await queryRunner.query(`DROP TABLE "ms_user"."user_address"`);
        await queryRunner.query(`DROP TABLE "ms_user"."user"`);
    }

}
