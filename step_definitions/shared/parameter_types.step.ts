import { defineParameterType } from "@badeball/cypress-cucumber-preprocessor"
import { statusCodeSuccessTranslate, statusCodeFailedTranslate } from "../../support/parameter_map"

defineParameterType({
    name: "statusCodeSuccessTranslate",
    regexp: /ok|created|no_content/,
    transformer: (s) => statusCodeSuccessTranslate[s]
})

defineParameterType({
    name: "statusCodeFailedTranslate",
    regexp: /bad_request|unauthorized|forbidden|not_found|conflict/,
    transformer: (s) => statusCodeFailedTranslate[s]
})
