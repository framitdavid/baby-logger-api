import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialWithManyTables1633865872497 implements MigrationInterface {
    name = 'InitialWithManyTables1633865872497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`diaper_change\` (\`id\` int NOT NULL AUTO_INCREMENT, \`disaperType\` varchar(255) NOT NULL, \`amount\` varchar(255) NOT NULL, \`comment\` varchar(255) NOT NULL, \`dateTime\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refreshTokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`refreshToken\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`expireAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`breastfeeding\` (\`id\` int NOT NULL AUTO_INCREMENT, \`duration\` decimal NOT NULL, \`comment\` varchar(255) NOT NULL, \`leftOrRight\` varchar(255) NOT NULL, \`dateTime\` datetime NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`diaper_change\` ADD CONSTRAINT \`FK_a0b5547f42a419a7660bfc94b33\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refreshTokens\` ADD CONSTRAINT \`FK_265bec4e500714d5269580a0219\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`breastfeeding\` ADD CONSTRAINT \`FK_0a4202606ddb8ade10b994a5553\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`breastfeeding\` DROP FOREIGN KEY \`FK_0a4202606ddb8ade10b994a5553\``);
        await queryRunner.query(`ALTER TABLE \`refreshTokens\` DROP FOREIGN KEY \`FK_265bec4e500714d5269580a0219\``);
        await queryRunner.query(`ALTER TABLE \`diaper_change\` DROP FOREIGN KEY \`FK_a0b5547f42a419a7660bfc94b33\``);
        await queryRunner.query(`DROP TABLE \`breastfeeding\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`refreshTokens\``);
        await queryRunner.query(`DROP TABLE \`diaper_change\``);
    }

}
