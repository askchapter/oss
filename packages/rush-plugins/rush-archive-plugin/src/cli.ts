import { archive } from "./archive";
import { loadArchiveLog, saveArchiveLog } from "./archiveLog";
import { RushConfiguration } from "@rushstack/rush-sdk";
import {
    CommandLineFlagParameter,
    CommandLineParser,
    CommandLineStringParameter,
} from "@rushstack/ts-command-line";
import inquirer from "inquirer";

export class ArchiveCli extends CommandLineParser {
    private _packageName!: CommandLineStringParameter;
    private _regenerate!: CommandLineFlagParameter;

    public constructor() {
        super({
            toolFilename: "rush-archive",
            toolDescription: "Maintain a log of archived projects for future discovery.",
        });
    }

    protected onDefineParameters(): void {
        this._packageName = this.defineStringParameter({
            parameterLongName: "--package-name",
            description: "Package name of the project to archive",
            argumentName: "PACKAGE_NAME",
        });

        this._regenerate = this.defineFlagParameter({
            parameterLongName: "--regenerate",
            description: "Regenerate the archive log Markdown file",
        });
    }

    protected async onExecute(): Promise<void> {
        const packageName = this._packageName.value;
        if (packageName) {
            const result = await inquirer.prompt<{ comments: string }>([
                {
                    name: "comments",
                    type: "input",
                    message: "Leave any comments on why this package is being archived",
                },
            ]);
            const comments = result.comments.trim();
            archive({ packageName, comments });
            return;
        }

        const regnerate = this._regenerate.value;
        if (regnerate) {
            const rushConfiguration = RushConfiguration.loadFromDefaultLocation();
            const archiveLog = loadArchiveLog(rushConfiguration);
            saveArchiveLog(rushConfiguration, archiveLog);
            return;
        }

        console.log(this.renderHelpText());
    }
}
