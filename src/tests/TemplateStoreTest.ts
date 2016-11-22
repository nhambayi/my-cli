import { TemplateStore } from "../TemplateStore";
import { FileStore } from "../FileStore";
import { IFileStore, ILogger } from "../Interfaces";
import { Logger } from "../Logger";
import { INDEX_FILE_NAME } from "../Constants";
import * as TypeMoq from "typemoq";

describe("Template Store", () => {

    const config = {
        templateRootFolder: "root",
        templateIndexPath: "root/index.json"
    };

    let fileStore = new FileStore();
    const fileStoreMock = TypeMoq.Mock.ofInstance(fileStore);
    let store: TemplateStore;
    const loggerMock = TypeMoq.Mock.ofType(Logger);


    beforeEach(function () {

    });

    describe("#initialization", () => {

        beforeEach(function () {
            fileStoreMock.reset();
            store = new TemplateStore(config, fileStoreMock.object, loggerMock.object);
        });

        it("Should check if the template folder in config exists", () => {
            fileStoreMock.setup(x => x.fileExists(TypeMoq.It.isAnyString()))
                .returns(() => true);

            store.initialize().then(() => {

                fileStoreMock.verify(x => x.fileExists(TypeMoq.It.isValue(config.templateRootFolder)),
                    TypeMoq.Times.atLeastOnce());

                fileStoreMock.verify(x => x.fileExists(TypeMoq.It.isValue(`${config.templateRootFolder}/${INDEX_FILE_NAME}`)),
                    TypeMoq.Times.atLeastOnce());
            });
        });

        it("Should create template folder if it does not exist", () => {
            fileStoreMock.setup(x => x.fileExists(TypeMoq.It.isAnyString()))
                .returns(() => false);
            store.initialize().then(() => {

                fileStoreMock.verify(x =>
                    x.createFolder(TypeMoq.It.isValue(config.templateRootFolder), TypeMoq.It.isAny()),
                    TypeMoq.Times.atLeastOnce());
            });

        });

        it("Should create template index file if it does not exist", () => {
            fileStoreMock.setup(x => x.fileExists(TypeMoq.It.isAnyString()))
                .returns(() => false);
            store.initialize().then(() => {

                fileStoreMock.verify(x =>
                    x.saveFile(TypeMoq.It.isValue(config.templateIndexPath), TypeMoq.It.isAnyString(), TypeMoq.It.isAny()),
                    TypeMoq.Times.atLeastOnce());
            });

        });

        it("Should try and load template index file", () => {
            fileStoreMock.setup(x => x.fileExists(TypeMoq.It.isAnyString()))
                .returns(() => true);
            store.initialize().then(() => {

                fileStoreMock.verify(x =>
                    x.loadFile(TypeMoq.It.isValue(config.templateIndexPath), TypeMoq.It.isAny()),
                    TypeMoq.Times.atLeastOnce());
            });

        });

        it("Should try and load template index file eben if it did not exist", () => {
            fileStoreMock.setup(x => x.fileExists(TypeMoq.It.isAnyString()))
                .returns(() => false);
            store.initialize().then(() => {

                fileStoreMock.verify(x =>
                    x.loadFile(TypeMoq.It.isValue(config.templateIndexPath), TypeMoq.It.isAny()),
                    TypeMoq.Times.atLeastOnce());
            });

        });

    });
});