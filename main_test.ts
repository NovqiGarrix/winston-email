import logger from "./utils/logger.ts";

function sleep(duration: number) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

Deno.test("Test Logger", async () => {

    logger.info("HELLO, WORLD!!!!");

    // Will send an email to the specified email address
    logger.error("ERROR: An Error occured!");

    // Waiting for the fetch request to complete
    // in order to pass the test
    await sleep(2500);

});
