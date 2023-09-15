import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTables1694751937247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tabela 'cargo'
        await queryRunner.createTable(new Table({
            name: "cargo",
            columns: [
                {
                    name: "id_cargo",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "nome",
                    type: "varchar",
                },
            ],
        }));

        // Tabela 'usuario'
        await queryRunner.createTable(new Table({
            name: "usuario",
            columns: [
                {
                    name: "id_usuario",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "senha",
                    type: "varchar",
                },
                {
                    name: "nome",
                    type: "varchar",
                },
                {
                    name: "cargo_id",
                    type: "int",
                },
            ],
        }));

        // Tabela 'projeto'
        await queryRunner.createTable(new Table({
            name: "projeto",
            columns: [
                {
                    name: "id_projeto",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "nome_projeto",
                    type: "varchar",
                },
                {
                    name: "material_total",
                    type: "int",
                },
                {
                    name: "hora_homem_total",
                    type: "int",
                },
                {
                    name: "usuario_id",
                    type: "int",
                },
            ],
        }));

        // Tabela 'item'
        await queryRunner.createTable(new Table({
            name: "item",
            columns: [
                {
                    name: "id_item",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "material",
                    type: "int",
                },
                {
                    name: "hora_homem",
                    type: "int",
                },
                {
                    name: "projeto_id",
                    type: "int",
                },
                {
                    name: "itemPai_id",
                    type: "int",
                    isNullable: true,
                },
            ],
        }));

        // Tabela 'tarefas'
        await queryRunner.createTable(new Table({
            name: "tarefas",
            columns: [
                {
                    name: "id_tarefas",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "nome_tarefa",
                    type: "varchar",
                },
                {
                    name: "peso_tarefa",
                    type: "int",
                },
                {
                    name: "item_id",
                    type: "int",
                },
            ],
        }));

        // Tabela 'avanco_tarefas'
        await queryRunner.createTable(new Table({
            name: "avanco_tarefas",
            columns: [
                {
                    name: "id_avanco",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "data",
                    type: "date",
                },
                {
                    name: "avanco",
                    type: "int",
                },
                {
                    name: "item_id",
                    type: "int",
                },
            ],
        }));

        // Adicionar chaves estrangeiras
        await queryRunner.createForeignKey("usuario", new TableForeignKey({
            columnNames: ["cargo_id"],
            referencedColumnNames: ["id_cargo"],
            referencedTableName: "cargo",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projeto", new TableForeignKey({
            columnNames: ["usuario_id"],
            referencedColumnNames: ["id_usuario"],
            referencedTableName: "usuario",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("item", new TableForeignKey({
            columnNames: ["projeto_id"],
            referencedColumnNames: ["id_projeto"],
            referencedTableName: "projeto",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("item", new TableForeignKey({
            columnNames: ["itemPai_id"],
            referencedColumnNames: ["id_item"],
            referencedTableName: "item",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("tarefas", new TableForeignKey({
            columnNames: ["item_id"],
            referencedColumnNames: ["id_item"],
            referencedTableName: "item",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("avanco_tarefas", new TableForeignKey({
            columnNames: ["item_id"],
            referencedColumnNames: ["id_item"],
            referencedTableName: "item",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverta a ordem de exclusão das tabelas
        await queryRunner.dropForeignKey("avanco_tarefas", "item_id");
        await queryRunner.dropForeignKey("tarefas", "item_id");
        await queryRunner.dropForeignKey("item", "itemPai_id");
        await queryRunner.dropForeignKey("item", "projeto_id");
        await queryRunner.dropForeignKey("projeto", "usuario_id");
        await queryRunner.dropForeignKey("usuario", "cargo_id");

        await queryRunner.dropTable("avanco_tarefas");
        await queryRunner.dropTable("tarefas");
        await queryRunner.dropTable("item");
        await queryRunner.dropTable("projeto");
        await queryRunner.dropTable("usuario");
        await queryRunner.dropTable("cargo");
    }
}
