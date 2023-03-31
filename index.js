import pkg from 'pg';
import yargs from 'yargs';
import { hideBin } from "yargs/helpers";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: "PostgreSQL://postgres:!nfra48x@localhost:5432/usuarios"
});

const argv = hideBin(process.argv);

yargs(hideBin(process.argv))
    .command(["hola", "$0"], "LA WEA", () => {
        console.log("select => 'rut'");
        console.log("insert => 'rut', 'nombres', 'curso', nivel");
        console.log("update => 'rut', 'nombres', 'curso', nivel");
        console.log("delete => 'rut'");
    })
    .command("select", "Try to Select", () => {
        const sqlQuery = "SELECT * FROM estudiante WHERE rut = $1"
        argv.length == 2 ? pgQuery(sqlQuery, [argv[1]]) : console.log("Debe ingresar un 'Rut'")
    })
    .command("insert", "Try to Insert", () => {
        const sqlQuery = "INSERT INTO estudiante (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4)"
        argv.length == 5 && !isNaN(argv[4]) ? pgQuery(sqlQuery, [argv[1], argv[2], argv[3], parseInt(argv[4])]) : console.log("Debe ingresar todos los datos'");
    })
    .command("update", "Try to Update", () => {
        const sqlQuery = "UPDATE estudiante SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1"
        argv.length == 5 && !isNaN(argv[4]) ? pgQuery(sqlQuery, [argv[1], argv[2], argv[3], parseInt(argv[4])]) : console.log("Debe ingresar todos los datos");
    })
    .command("delete", "Try to Update", () => {
        const sqlQuery = "DELETE FROM estudiante WHERE rut = $1"
        argv.length == 2 ? pgQuery(sqlQuery, [argv[1]]) : console.log("Debe ingresar un 'Rut'")
    })
.argv;

console.log("--------------------------------------------------------------")
const res = await pool.query("SELECT * FROM estudiante");
console.table(res.rows);
console.log("--------------------------------------------------------------")

async function pgQuery(sqlQuery, sqlValues) {
    try {
        const res = await pool.query(sqlQuery, sqlValues);
        console.log(res.rows)
        console.log("Tabla Modificada")
    } catch (err) {
        console.log(err);
    };
};
