import {} from "../TemplateStore";

describe("Template Store", () => {
    let subject: string;

    beforeEach(function () {
        subject = "Hello Mocha";
    });

    describe("#initialization", () => {
        it("should say Hello Mocha", () => {

            if (subject !== "Hello Mocha") {
                throw new Error("Not Mocha");
            }
        });

        it("should be true", () => {

            if (subject !== "Hello Mocha") {
                throw new Error("Not Mocha");
            }
        });

        it("should be not fail", () => {
            if (subject !== "Hello Mocha") {
                throw new Error("Not Mocha");
            }
        });
    });
});