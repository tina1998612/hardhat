import { assert } from "chai";

import { useEnvironment } from "../helpers/environment";
import { useFixtureProject } from "../helpers/project";

function getContractsOrder(flattenedFiles: string) {
  const CONTRACT_REGEX = /\s*contract(\s+)(\w)/gm;
  const matches = flattenedFiles.match(CONTRACT_REGEX);

  return matches!.map((m: string) => m.replace("contract", "").trim());
}

describe("Flatten task", () => {
  useEnvironment();

  describe("When there no contracts", function() {
    useFixtureProject("default-config-project");
    it("should return empty string", async function() {
      const flattenedFiles = await this.env.run(
        "flatten:get-flattened-sources"
      );

      assert.equal(flattenedFiles.length, 0);
    });
  });

  describe("When has contracts", function() {
    useFixtureProject("contracts-project");

    it("should flattened files should sorted correctly", async function() {
      const flattenedFiles = await this.env.run("flatten:flatten");
      assert.deepEqual(getContractsOrder(flattenedFiles), ["C", "B", "A"]);
    });
  });
});
