/** Handle messages that come in from the FathomFox webext. */
function handleExternalMessage(request, sender, sendResponse) {
    if (request.type === 'rulesetSucceededOnTabs') {
        // Run a given ruleset on a given set of tabs, and return an array
        // of bools saying whether they got the right answer on each.
        return Promise.all(request.tabIds.map(
            tabId => browser.tabs.sendMessage(
                tabId,
                {type: 'rulesetSucceeded',
                 traineeId: request.traineeId,
                 coeffs: request.coeffs})));
    } else if (request.type === 'traineeKeys') {
        // Return an array of IDs of rulesets we can train.
        sendResponse(Array.from(trainees.keys()));
    } else if (request.type === 'traineeCoeffs') {
        // Return the initial coeffs of some ruleset.
        sendResponse(trainees.get(request.traineeId).coeffs);
    }
}
browser.runtime.onMessageExternal.addListener(handleExternalMessage);
