(function (global) {
  const suites = [];
  let currentSuite = null;

  function describe(title, fn) {
    const suite = { title, tests: [] };
    suites.push(suite);
    currentSuite = suite;
    fn();
    currentSuite = null;
  }

  function it(title, fn) {
    if (!currentSuite) {
      throw new Error("it() phải được gọi bên trong describe()");
    }
    currentSuite.tests.push({ title, fn });
  }

  function expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) {
          throw new Error(
            `Kỳ vọng: ${JSON.stringify(expected)} (${typeof expected}), nhưng nhận được: ${JSON.stringify(actual)} (${typeof actual})`
          );
        }
      },
      toBeNull() {
        if (actual !== null) {
          throw new Error(
            `Kỳ vọng: null, nhưng nhận được: ${JSON.stringify(actual)} (${typeof actual})`
          );
        }
      },
      toEqual(expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(
            `Kỳ vọng: ${JSON.stringify(expected)}, nhưng nhận được: ${JSON.stringify(actual)}`
          );
        }
      }
    };
  }

  function runTests() {
    let total = 0;
    let passed = 0;
    let failed = 0;
    const suiteResults = [];

    for (const suite of suites) {
      const currentSuiteResult = { title: suite.title, tests: [] };
      for (const test of suite.tests) {
        total++;
        try {
          test.fn();
          passed++;
          currentSuiteResult.tests.push({
            title: test.title,
            status: "passed",
            error: null
          });
        } catch (err) {
          failed++;
          currentSuiteResult.tests.push({
            title: test.title,
            status: "failed",
            error: err.message
          });
        }
      }
      suiteResults.push(currentSuiteResult);
    }

    const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

    return {
      total,
      passed,
      failed,
      percentage,
      suites: suiteResults
    };
  }

  global.describe = describe;
  global.it = it;
  global.test = it;
  global.expect = expect;
  global.runTests = runTests;
})(typeof window !== "undefined" ? window : global);
