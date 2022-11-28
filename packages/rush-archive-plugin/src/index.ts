import type { IRushPlugin, RushSession, RushConfiguration, ILogger } from "@rushstack/rush-sdk";

export interface IRushExamplePluginOptions {}

export class RushExamplePlugin implements IRushPlugin {
    public readonly pluginName: string = "RushExamplePlugin";

    public constructor(options: IRushExamplePluginOptions) {
        // Add your initialization here
    }

    public apply(rushSession: RushSession, rushConfiguration: RushConfiguration): void {
        rushSession.hooks.rushSession.hooks.initialize.tap(this.pluginName, () => {
            const logger: ILogger = rushSession.getLogger(this.pluginName);
            logger.terminal.writeLine("Add your custom logic here");
        });
    }
}

export default { RushExamplePlugin };
