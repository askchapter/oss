import { ArchiveCli } from "./cli";

const cli: ArchiveCli = new ArchiveCli();
cli.execute().catch((error) => {
    console.error(error);
    process.exit(1);
});
