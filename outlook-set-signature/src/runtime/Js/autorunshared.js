// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Contains code for event-based activation on Outlook on web, on Windows, and on Mac (new UI preview).

/**
 * Checks if signature exists.
 * If not, displays the information bar for user.
 * If exists, insert signature into new item (appointment or message).
 * @param {*} eventObj Office event object
 * @returns
 */
function checkSignature(eventObj) {
  let user_info_str = Office.context.roamingSettings.get("user_info");
  if (!user_info_str) {
    display_insight_infobar();
  } else {
    let user_info = JSON.parse(user_info_str);

    if (Office.context.mailbox.item.getComposeTypeAsync) {
      //Find out if the compose type is "newEmail", "reply", or "forward" so that we can apply the correct template.
      Office.context.mailbox.item.getComposeTypeAsync(
        {
          asyncContext: {
            user_info: user_info,
            eventObj: eventObj,
          },
        },
        function (asyncResult) {
          if (asyncResult.status === "succeeded") {
            insert_auto_signature(
              asyncResult.value.composeType,
              asyncResult.asyncContext.user_info,
              asyncResult.asyncContext.eventObj
            );
          }
        }
      );
    } else {
      // Appointment item. Just use newMail pattern
      insert_auto_signature("newMail", user_info, eventObj);
    }
  }
}

/**
 * Insert signature into appointment or message.
 * Uses setSignatureAsync method on appointments and messages.
 * @param {*} compose_type The compose type (reply, forward, newMail)
 * @param {*} user_info Information details about the user
 * @param {*} eventObj Office event object
 */
function insert_auto_signature(compose_type, user_info, eventObj) {
  let template_name = get_template_name(compose_type);
  let signature_info = get_signature_info(template_name, user_info);
  addTemplateSignature(signature_info, eventObj);
}

/**
 * Add the signature into the email body.
 * @param {*} signatureDetails object containing:
 *  "signature": The signature HTML of the template
 * @param {*} eventObj 
 */
function addTemplateSignature(signatureDetails, eventObj) {
  Office.context.mailbox.item.body.setSignatureAsync(
    signatureDetails.signature,
    {
      coercionType: "html",
      asyncContext: eventObj,
    },
    function (asyncResult) {
      asyncResult.asyncContext.completed();
    }
  );
}

/**
 * Creates information bar to display when new message or appointment is created
 */
function display_insight_infobar() {
  Office.context.mailbox.item.notificationMessages.addAsync("fd90eb33431b46f58a68720c36154b4a", {
    type: "insightMessage",
    message: "Please set your signature with the Office Add-ins sample.",
    icon: "Icon.16x16",
    actions: [
      {
        actionType: "showTaskPane",
        actionText: "Set signatures",
        commandId: get_command_id(),
        contextData: "{''}",
      },
    ],
  });
}

/**
 * Gets template name (A,B,C) mapped based on the compose type
 * @param {*} compose_type The compose type (reply, forward, newMail)
 * @returns Name of the template to use for the compose type
 */
function get_template_name(compose_type) {
  if (compose_type === "reply") return Office.context.roamingSettings.get("reply");
  if (compose_type === "forward") return Office.context.roamingSettings.get("forward");
  return Office.context.roamingSettings.get("newMail");
}

/**
 * Gets signature HTML in requested template format for given user
 * @param {*} template_name Which template format to use (A,B,C)
 * @param {*} user_info Information details about the user
 * @returns Object containing:
 *  "signature": The signature HTML of the template
 */
function get_signature_info(template_name, user_info) {
  if (template_name === "templateB") return get_template_B_info(user_info);
  if (template_name === "templateC") return get_template_C_info(user_info);
  return get_template_A_info(user_info);
}

/**
 * Gets correct command id to match to item type (appointment or message)
 * @returns The command id
 */
function get_command_id() {
  if (Office.context.mailbox.item.itemType == "appointment") {
    return "MRCS_TpBtn1";
  }
  return "MRCS_TpBtn0";
}

/* -------------------------------
   NEW SIGNATURE TEMPLATES (Edama Style)
---------------------------------*/

function get_template_A_info(user_info) {
  return {
    signature: get_template_A_str(user_info),
    logoBase64: null,
    logoFileName: null
  };
}

function get_template_B_info(user_info) {
  return {
    signature: get_template_B_str(user_info),
    logoBase64: null,
    logoFileName: null
  };
}

function get_template_C_info(user_info) {
  return {
    signature: get_template_C_str(user_info),
    logoBase64: null,
    logoFileName: null
  };
}

/* --- Functions copied from signature_templates.js --- */

function get_template_A_str(user_info) {
  let str = "";

  if (is_valid_data(user_info.greeting)) {
    str += user_info.greeting + "<br/>";
  }

  str += "<table cellpadding='0' cellspacing='0' " +
         "style='font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; width: 600px;'>";
  str += "<tr>";
  str += "<td style='vertical-align: middle; padding-right: 20px;'>";

  str += "<div style='font-size: 16px; font-weight: bold; color: #222;'>" + user_info.name + "</div>";

  if (is_valid_data(user_info.job)) {
    str += "<div style='font-size: 13px; color: #666;'>" +
           user_info.job + " | Edama, KSA." +
           "</div>";
  }

  str += "<br>";

  if (is_valid_data(user_info.email)) {
    str += "<div style='margin-bottom: 6px;'>" +
           "<img src='https://17ayman.github.io/office-addin/EmailLogo.png' " +
           "alt='Email' style='height: 12px; vertical-align: middle; margin-right: 6px;'/>" +
           "<a href='mailto:" + user_info.email + "' style='color: #0DA57C; text-decoration: none;'>" +
           user_info.email +
           "</a></div>";
  }

  str += "<div style='margin-bottom: 6px;'>" +
         "<img src='https://17ayman.github.io/office-addin/WebsiteLogo.png' " +
         "alt='Website' style='height: 16px; vertical-align: middle; margin-right: 6px;'/>" +
         "<a href='https://www.edamasolutions.com' style='color: #0DA57C; text-decoration: none;'>" +
         "www.edamasolutions.com" +
         "</a></div>";

  if (is_valid_data(user_info.phone)) {
    str += "<div>" +
           "<img src='https://17ayman.github.io/office-addin/PhoneLogo.png' " +
           "alt='Phone' style='height: 16px; vertical-align: middle; margin-right: 6px;'/>" +
           "<a href='tel:" + user_info.phone + "' style='color: #0DA57C; text-decoration: none;'>" +
           user_info.phone +
           "</a></div>";
  }

  str += "</td>";
  str += "<td style='width: 3px; background-color: #0DA57C;'>&nbsp;</td>";
  str += "<td style='vertical-align: middle; padding-left: 20px;'>" +
         "<img src='https://17ayman.github.io/office-addin/Edalo.png' alt='Edama Logo' style='height: 120px;'/>" +
         "</td>";
  str += "</tr></table>";

  return str;
}

function get_template_B_str(user_info) {
  let str = "<table cellpadding='0' cellspacing='0' " +
            "style='font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; width: 600px;'>";
  str += "<tr><td style='vertical-align: middle; padding-right: 20px;'>";

  str += "<div style='font-size: 16px; font-weight: bold; color: #222;'>" + user_info.name + "</div><br>";

  if (is_valid_data(user_info.email)) {
    str += "<div style='margin-bottom: 6px;'>" +
           "<img src='https://17ayman.github.io/office-addin/EmailLogo.png' alt='Email' style='height: 12px; margin-right: 6px;'/>" +
           "<a href='mailto:" + user_info.email + "' style='color: #0DA57C; text-decoration: none;'>" +
           user_info.email +
           "</a></div>";
  }

  str += "<div style='margin-bottom: 6px;'>" +
         "<img src='https://17ayman.github.io/office-addin/WebsiteLogo.png' alt='Website' style='height: 16px; margin-right: 6px;'/>" +
         "<a href='https://www.edamasolutions.com' style='color: #0DA57C; text-decoration: none;'>" +
         "www.edamasolutions.com" +
         "</a></div>";

  if (is_valid_data(user_info.phone)) {
    str += "<div>" +
           "<img src='https://17ayman.github.io/office-addin/PhoneLogo.png' alt='Phone' style='height: 16px; margin-right: 6px;'/>" +
           "<a href='tel:" + user_info.phone + "' style='color: #0DA57C; text-decoration: none;'>" +
           user_info.phone +
           "</a></div>";
  }

  str += "</td>";
  str += "<td style='width: 3px; background-color: #0DA57C;'>&nbsp;</td>";
  str += "<td style='vertical-align: middle; padding-left: 20px;'>" +
         "<img src='https://17ayman.github.io/office-addin/Edalo.png' alt='Edama Logo' style='height: 120px;'/>" +
         "</td></tr></table>";

  return str;
}

function get_template_C_str(user_info) {
  return "<div style='font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #222;'>" +
         user_info.name +
         "</div>";
}

/* Utility */
function is_valid_data(str) {
  return str !== null && str !== undefined && str !== "";
}

Office.actions.associate("checkSignature", checkSignature);
