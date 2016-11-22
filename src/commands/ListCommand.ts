import {TemplateStore} from "../TemplateStore";
import {TemplateStoreConfiguration} from "../TemplateStoreConfiguration";
import {FileStore} from "../FileStore";
import {Logger} from "../Logger";

console.log("Listing...");

const config = new TemplateStoreConfiguration();
config.templateRootFolder = "root";
config.templateIndexPath = "root/index.json";
const fileStore = new FileStore();
const logger = new Logger();

const store = new TemplateStore(config, fileStore, logger);
store.initialize();