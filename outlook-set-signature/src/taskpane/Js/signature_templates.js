function get_template_A_str(user_info) {
  let str = "";

  // optional greeting
  if (is_valid_data(user_info.greeting)) {
    str += user_info.greeting + "<br/>";
  }

  // start Edama-style table
  str += "<table cellpadding='0' cellspacing='0' " +
         "style='font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; width: 600px;'>";
  str +=   "<tr>";
  str +=     "<td style='vertical-align: middle; padding-right: 20px;'>";

  // Name
  str +=       "<div style='font-size: 16px; font-weight: bold; color: #222;'>" +
                 user_info.name +
               "</div>";

  // Job / Title (optional)
  if (is_valid_data(user_info.job)) {
    str +=   "<div style='font-size: 13px; color: #666;'>" +
                 user_info.job + " | Edama, KSA." +
               "</div>";
  }

  str +=       "<br>";

  // Email (optional)
  if (is_valid_data(user_info.email)) {
    str +=   "<div style='margin-bottom: 6px;'>" +
               "<img src='https://17ayman.github.io/office-addin/EmailLogo.png' " +
                    "alt='Email' style='height: 12px; vertical-align: middle; margin-right: 6px;'/>" +
               "<a href='mailto:" + user_info.email + "' " +
                  "style='color: #0DA57C; text-decoration: none;'>" +
                 user_info.email +
               "</a>" +
             "</div>";
  }

  // Website (always)
  str +=       "<div style='margin-bottom: 6px;'>" +
               "<img src='https://17ayman.github.io/office-addin/WebsiteLogo.png' " +
                    "alt='Website' style='height: 16px; vertical-align: middle; margin-right: 6px;'/>" +
               "<a href='https://www.edamasolutions.com' " +
                  "style='color: #0DA57C; text-decoration: none;'>" +
                 "www.edamasolutions.com" +
               "</a>" +
             "</div>";

  // Phone (optional)
  if (is_valid_data(user_info.phone)) {
    str +=   "<div>" +
               "<img src='https://17ayman.github.io/office-addin/PhoneLogo.png' " +
                    "alt='Phone' style='height: 16px; vertical-align: middle; margin-right: 6px;'/>" +
               "<a href='tel:" + user_info.phone + "' " +
                  "style='color: #0DA57C; text-decoration: none;'>" +
                 user_info.phone +
               "</a>" +
             "</div>";
  }

  str +=     "</td>";
  str +=     "<td style='width: 3px; background-color: #0DA57C;'>&nbsp;</td>";
  str +=     "<td style='vertical-align: middle; padding-left: 20px;'>" +
               "<img src='https://17ayman.github.io/office-addin/EdamaEmailLogo2.png' " +
                    "alt='Edama Logo' style='height: 120px;'/>" +
             "</td>";
  str +=   "</tr>";
  str += "</table>";

  return str;
}

function get_template_B_str(user_info) {
  // same as A but without the greeting and job line
  let str = "";

  str += "<table cellpadding='0' cellspacing='0' " +
         "style='font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; width: 600px;'>";
  str +=   "<tr>";
  str +=     "<td style='vertical-align: middle; padding-right: 20px;'>";

  str +=       "<div style='font-size: 16px; font-weight: bold; color: #222;'>" +
                 user_info.name +
               "</div>";

  str +=       "<br>";

  if (is_valid_data(user_info.email)) {
    str +=   "<div style='margin-bottom: 6px;'>" +
               "<img src='https://17ayman.github.io/office-addin/EmailLogo.png' " +
                    "alt='Email' style='height: 12px; vertical-align: middle; margin-right: 6px;'/>" +
               "<a href='mailto:" + user_info.email + "' " +
                  "style='color: #0DA57C; text-decoration: none;'>" +
                 user_info.email +
               "</a>" +
             "</div>";
  }

  str +=       "<div style='margin-bottom: 6px;'>" +
               "<img src='https://17ayman.github.io/office-addin/WebsiteLogo.png' " +
                    "alt='Website' style='height: 16px; vertical-align: middle; margin-right: 6px;'/>" +
               "<a href='https://www.edamasolutions.com' " +
                  "style='color: #0DA57C; text-decoration: none;'>" +
                 "www.edamasolutions.com" +
               "</a>" +
             "</div>";

  if (is_valid_data(user_info.phone)) {
    str +=   "<div>" +
               "<img src='https://17ayman.github.io/office-addin/PhoneLogo.png' " +
                    "alt='Phone' style='height: 16px; vertical-align: middle; margin-right: 6px;'/>" +
               "<a href='tel:" + user_info.phone + "' " +
                  "style='color: #0DA57C; text-decoration: none;'>" +
                 user_info.phone +
               "</a>" +
             "</div>";
  }

  str +=     "</td>";
  str +=     "<td style='width: 3px; background-color: #0DA57C;'>&nbsp;</td>";
  str +=     "<td style='vertical-align: middle; padding-left: 20px;'>" +
               "<img src='https://17ayman.github.io/office-addin/EdamaEmailLogo2.png' " +
                    "alt='Edama Logo' style='height: 120px;'/>" +
             "</td>";
  str +=   "</tr>";
  str += "</table>";

  return str;
}

function get_template_C_str(user_info) {
  // just the name in bold
  return "<div style='font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #222;'>" +
           user_info.name +
         "</div>";
}
